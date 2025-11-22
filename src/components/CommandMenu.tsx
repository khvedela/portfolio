import { useState, useEffect, useRef } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  Moon, 
  Sun, 
  Terminal, 
  Search,
  Github,
  Linkedin,
  Mail,
  Code
} from "lucide-react";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDark: boolean;
  toggleTheme: () => void;
  toggleMatrix?: () => void;
}

const CommandMenu = ({ open, setOpen, isDark, toggleTheme, toggleMatrix }: CommandMenuProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Force focus on open
  useEffect(() => {
    if (open) {
      // Small timeout to ensure animation mount
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-[100000] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            className="relative w-full max-w-lg bg-background border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center border-b-4 border-foreground px-4 py-3 bg-foreground text-background">
              <Terminal size={20} className="mr-3" />
              <span className="font-mono font-bold text-sm uppercase tracking-wider">DK_COMMAND_PALETTE</span>
              <div className="ml-auto flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black" />
                 <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
              </div>
            </div>

            <Command 
              className="w-full bg-background font-mono"
              loop
            >
              <div className="flex items-center border-b-2 border-foreground/20 px-4">
                <Search className="mr-3 h-5 w-5 shrink-0 opacity-50" />
                <Command.Input 
                  ref={inputRef}
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                <Command.Group heading="NAVIGATION" className="px-2 py-1.5 text-xs font-bold text-muted-foreground mb-2">
                  <Command.Item 
                    value="home"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => navigate("/"))}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                    <span className="ml-auto text-xs opacity-50">/</span>
                  </Command.Item>
                  <Command.Item 
                    value="blog"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => navigate("/blog"))}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Blog</span>
                    <span className="ml-auto text-xs opacity-50">/blog</span>
                  </Command.Item>
                  <Command.Item 
                    value="courses"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => navigate("/courses"))}
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Courses</span>
                    <span className="ml-auto text-xs opacity-50">/courses</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="SYSTEM" className="px-2 py-1.5 text-xs font-bold text-muted-foreground mb-2">
                   <Command.Item 
                    value="theme"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(toggleTheme)}
                  >
                    {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    <span>Toggle Theme</span>
                    <span className="ml-auto text-xs opacity-50">Cmd+T</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="SOCIAL" className="px-2 py-1.5 text-xs font-bold text-muted-foreground mb-2">
                  <Command.Item 
                    value="github"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => window.open("https://github.com/DavidKhvedelidze", "_blank"))}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </Command.Item>
                  <Command.Item 
                    value="linkedin"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/khvedelidzedavid/", "_blank"))}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    <span>LinkedIn</span>
                  </Command.Item>
                  <Command.Item 
                    value="email"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => window.open("mailto:davidkhvedelidze@gmail.com", "_blank"))}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Contact Email</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="EASTER EGGS" className="px-2 py-1.5 text-xs font-bold text-muted-foreground mb-2">
                  <Command.Item 
                    value="matrix"
                    className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-accent hover:text-foreground aria-selected:bg-accent aria-selected:text-foreground transition-colors"
                    onSelect={() => runCommand(() => toggleMatrix?.())}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    <span>Matrix Mode</span>
                  </Command.Item>
                </Command.Group>

              </Command.List>
              
              <div className="border-t-2 border-foreground/20 px-4 py-2 text-[10px] text-muted-foreground flex justify-between">
                <span>Navigate with ↑↓</span>
                <span>Enter to select</span>
                <span>Esc to close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;

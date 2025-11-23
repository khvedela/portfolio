import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, Volume2, VolumeX, Command, Monitor } from "lucide-react";
import DraggableWindow from "./DraggableWindow";
import { TerminalContent } from "./TerminalContent";

interface BrutalistTerminalProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onOpenCommandMenu?: () => void;
  onNavigateToDesktop?: () => void;
}

const BrutalistTerminal = ({ isOpen, onToggle, onOpenCommandMenu, onNavigateToDesktop }: BrutalistTerminalProps) => {
  const [isBooting, setIsBooting] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsBooting(true);
      // Simulate boot sequence if needed, or just keep it simple
      const timer = setTimeout(() => setIsBooting(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <motion.div
          className="no-print fixed bottom-6 left-6 lg:left-auto lg:right-6 z-[100] flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
           <motion.button
            className="font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20 cursor-pointer hover:bg-background/90 hover:border-foreground/40 active:scale-95 transition-all"
            onClick={() => onToggle(true)}
          >
            <TerminalIcon size={14} />
            <span className="hidden lg:inline">Terminal</span>
          </motion.button>
          
          {onOpenCommandMenu && (
            <motion.button
              className="font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20 cursor-pointer hover:bg-background/90 hover:border-foreground/40 active:scale-95 transition-all"
              onClick={onOpenCommandMenu}
            >
              <Command size={14} />
              <span className="hidden lg:inline">⌘ K</span>
            </motion.button>
          )}

          {onNavigateToDesktop && (
            <motion.button
              className="font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20 cursor-pointer hover:bg-background/90 hover:border-foreground/40 active:scale-95 transition-all"
              onClick={onNavigateToDesktop}
            >
              <Monitor size={14} />
              <span className="hidden lg:inline">⌘ D</span>
              <span className="lg:hidden">Desktop</span>
            </motion.button>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <DraggableWindow 
              title="SYSTEM TERMINAL" 
              onClose={() => onToggle(false)}
              width={800}
              height={600}
            >
              <TerminalContent onClose={() => onToggle(false)} />
            </DraggableWindow>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrutalistTerminal;

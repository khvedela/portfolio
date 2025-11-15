import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

const BrutalistTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "SYSTEM TERMINAL v1.0 - Type 'help' for available commands",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard } = useBrutalistToast();

  // Toggle terminal with backtick key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "`" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, { action: () => void; description: string }> =
    {
      help: {
        description: "Show all available commands",
        action: () => {
          const helpText = [
            "",
            "AVAILABLE COMMANDS:",
            "─────────────────────────────────────",
            "help          - Show this help message",
            "about         - Display about information",
            "contact       - Copy email to clipboard",
            "linkedin      - Open LinkedIn profile",
            "skills        - List technical skills",
            "experience    - Show work experience",
            "clear         - Clear terminal history",
            "close         - Close terminal window",
            "theme         - Toggle dark/light mode",
            "─────────────────────────────────────",
            "",
          ];
          setHistory((prev) => [
            ...prev,
            ...helpText.map((line) => ({
              type: "output" as const,
              content: line,
            })),
          ]);
        },
      },
      about: {
        description: "Display about information",
        action: () => {
          setHistory((prev) => [
            ...prev,
            { type: "output", content: "" },
            {
              type: "success",
              content: "David Khvedelidze - Full-Stack Developer",
            },
            {
              type: "output",
              content:
                "Building robust, scalable applications with modern technologies.",
            },
            {
              type: "output",
              content:
                "Specializing in React, TypeScript, Node.js, and cloud architecture.",
            },
            { type: "output", content: "" },
          ]);
        },
      },
      contact: {
        description: "Copy email to clipboard",
        action: () => {
          copyToClipboard("your.email@example.com", "Email");
          setHistory((prev) => [
            ...prev,
            {
              type: "success",
              content: "✓ Email copied to clipboard: your.email@example.com",
            },
          ]);
        },
      },
      linkedin: {
        description: "Open LinkedIn profile",
        action: () => {
          window.open("https://linkedin.com/in/yourprofile", "_blank");
          setHistory((prev) => [
            ...prev,
            {
              type: "success",
              content: "✓ Opening LinkedIn profile in new tab...",
            },
          ]);
        },
      },
      skills: {
        description: "List technical skills",
        action: () => {
          const skills = [
            "",
            "TECHNICAL SKILLS:",
            "─────────────────────────────────────",
            "Frontend:  React, TypeScript, Next.js, Tailwind CSS",
            "Backend:   Node.js, Express, PostgreSQL, MongoDB",
            "Cloud:     AWS, Docker, Kubernetes",
            "Tools:     Git, CI/CD, Figma, VS Code",
            "─────────────────────────────────────",
            "",
          ];
          setHistory((prev) => [
            ...prev,
            ...skills.map((line) => ({
              type: "output" as const,
              content: line,
            })),
          ]);
        },
      },
      experience: {
        description: "Show work experience",
        action: () => {
          const exp = [
            "",
            "WORK EXPERIENCE:",
            "─────────────────────────────────────",
            "Senior Full-Stack Developer @ Company (2023-Present)",
            "Full-Stack Developer @ Company (2021-2023)",
            "─────────────────────────────────────",
            "Type 'about' for more details",
            "",
          ];
          setHistory((prev) => [
            ...prev,
            ...exp.map((line) => ({ type: "output" as const, content: line })),
          ]);
        },
      },
      clear: {
        description: "Clear terminal history",
        action: () => {
          setHistory([
            {
              type: "output",
              content: "Terminal cleared. Type 'help' for commands.",
            },
          ]);
        },
      },
      close: {
        description: "Close terminal window",
        action: () => {
          setIsOpen(false);
        },
      },
      theme: {
        description: "Toggle dark/light mode",
        action: () => {
          document.documentElement.classList.toggle("dark");
          const isDark = document.documentElement.classList.contains("dark");
          setHistory((prev) => [
            ...prev,
            {
              type: "success",
              content: `✓ Theme switched to ${isDark ? "dark" : "light"} mode`,
            },
          ]);
        },
      },
    };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to history
    setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (!trimmedCmd) return;

    if (commands[trimmedCmd]) {
      commands[trimmedCmd].action();
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: '${trimmedCmd}'. Type 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Navigate command history with up/down arrows
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (
          newIndex === commandHistory.length - 1 &&
          historyIndex === newIndex
        ) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <>
      {/* Terminal toggle hint - shown when closed */}
      {!isOpen && (
        <motion.div
          className="no-print fixed bottom-6 right-6 z-[100] font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <TerminalIcon size={14} />
          <span>
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-foreground/10 border border-foreground/30">
              `
            </kbd>{" "}
            to open terminal
          </span>
        </motion.div>
      )}

      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="no-print fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-3xl bg-background border-4 border-foreground shadow-brutalist-lg"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between bg-foreground text-background px-4 py-3 border-b-4 border-foreground">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={18} />
                  <span className="font-mono font-bold uppercase text-sm">
                    System Terminal
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-background hover:text-foreground transition-colors p-1 border-2 border-transparent hover:border-background"
                  aria-label="Close terminal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Terminal body */}
              <div className="bg-background p-4 font-mono text-sm">
                {/* Command history */}
                <div
                  ref={historyRef}
                  className="h-96 overflow-y-auto mb-4 space-y-1"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {history.map((line, index) => (
                    <div
                      key={index}
                      className={`
                        ${line.type === "input" ? "text-primary font-bold" : ""}
                        ${line.type === "error" ? "text-red-500" : ""}
                        ${line.type === "success" ? "text-green-500" : ""}
                        ${line.type === "output" ? "text-foreground" : ""}
                      `}
                    >
                      {line.content}
                    </div>
                  ))}
                </div>

                {/* Input line */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2"
                >
                  <span className="text-primary font-bold">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-foreground font-mono caret-primary"
                    placeholder="Type 'help' for commands..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                </form>
              </div>

              {/* Terminal footer */}
              <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/20 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Press ESC or click outside to close</span>
                <span>↑↓ to navigate history</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrutalistTerminal;

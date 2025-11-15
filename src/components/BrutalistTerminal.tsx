import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, Volume2, VolumeX } from "lucide-react";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";
import TerminalSnake from "./TerminalSnake";
import TerminalTypingGame from "./TerminalTypingGame";
import DraggableWindow from "./DraggableWindow";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

type GameWindow = {
  id: string;
  type: "snake" | "typing";
  x: number;
  y: number;
};

const BrutalistTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [gameWindows, setGameWindows] = useState<GameWindow[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard } = useBrutalistToast();

  // Sound effects
  const playSound = (type: "key" | "enter" | "error" | "success") => {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext ||
      // @ts-expect-error - webkitAudioContext for Safari compatibility
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different sounds
    switch (type) {
      case "key":
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.05;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.03);
        break;
      case "enter":
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.08);
        break;
      case "error":
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.15;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
      case "success":
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
    }
  };

  // Toggle terminal with backtick key and run boot sequence
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "t" && !isOpen && !isBooting) {
        e.preventDefault();
        setIsBooting(true);
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen && gameWindows.length === 0) {
        // Only close terminal if no game windows are open
        setIsOpen(false);
        setIsBooting(false);
        setBootProgress(0);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, isBooting, gameWindows.length]);

  // Boot sequence animation
  useEffect(() => {
    if (isBooting && isOpen) {
      const bootMessages = [
        "INITIALIZING SYSTEM...",
        "LOADING KERNEL MODULES...",
        "MOUNTING FILE SYSTEMS...",
        "STARTING NETWORK SERVICES...",
        "LOADING USER ENVIRONMENT...",
        "SYSTEM READY.",
      ];

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setBootProgress(progress);

        if (progress <= 100) {
          const msgIndex = Math.floor((progress / 100) * bootMessages.length);
          if (bootMessages[msgIndex]) {
            setHistory((prev) => [
              ...prev,
              {
                type: "output",
                content: `> ${bootMessages[msgIndex]}`,
              },
            ]);
          }
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setHistory((prev) => [
              ...prev,
              { type: "output", content: "" },
              {
                type: "success",
                content:
                  "SYSTEM TERMINAL v1.0 - Type 'help' for available commands",
              },
              { type: "output", content: "" },
            ]);
          }, 500);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isBooting, isOpen]);

  // Focus input when terminal opens and boot completes
  useEffect(() => {
    if (isOpen && !isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isBooting]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<
    string,
    { action: () => void; description: string; hidden?: boolean }
  > = {
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
          "",
          "ALIASES (Unix-style):",
          "─────────────────────────────────────",
          "ls            - List sections/skills",
          "whoami        - Display user info",
          "pwd           - Show current section",
          "cat           - Display content",
          "─────────────────────────────────────",
          "Try exploring... there might be easter eggs 🥚",
          "Hint: Try 'snake' or 'typing' for mini-games!",
          "",
        ];
        playSound("success");
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
        playSound("success");
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: `✓ Theme switched to ${isDark ? "dark" : "light"} mode`,
          },
        ]);
      },
    },

    // ALIASES (Unix-style commands)
    ls: {
      description: "List sections/skills",
      action: () => {
        const sections = [
          "",
          "AVAILABLE SECTIONS:",
          "─────────────────────────────────────",
          "📁 about/         - About me",
          "📁 experience/    - Work history",
          "📁 skills/        - Technical skills",
          "📁 education/     - Education background",
          "📁 languages/     - Spoken languages",
          "─────────────────────────────────────",
          "",
        ];
        playSound("success");
        setHistory((prev) => [
          ...prev,
          ...sections.map((line) => ({
            type: "output" as const,
            content: line,
          })),
        ]);
      },
    },
    whoami: {
      description: "Display user info",
      action: () => {
        playSound("success");
        setHistory((prev) => [
          ...prev,
          { type: "success", content: "guest@portfolio:~$ Guest User" },
          { type: "output", content: "Viewing: David Khvedelidze's Portfolio" },
          {
            type: "output",
            content: "Full-Stack Developer | Angular & TypeScript Specialist",
          },
        ]);
      },
    },
    pwd: {
      description: "Show current section",
      action: () => {
        playSound("success");
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "/home/david/portfolio/terminal" },
        ]);
      },
    },
    cat: {
      description: "Display file contents (try: cat skills.txt)",
      action: () => {
        playSound("success");
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            content: "Usage: cat <filename>",
          },
          {
            type: "output",
            content: "Available files: skills.txt, about.md, contact.txt",
          },
        ]);
      },
    },

    // EASTER EGGS (Hidden commands)
    sudo: {
      description: "Superuser access",
      hidden: true,
      action: () => {
        playSound("error");
        setHistory((prev) => [
          ...prev,
          {
            type: "error",
            content: "Nice try! 😏 You don't have sudo privileges here.",
          },
          {
            type: "output",
            content:
              "guest is not in the sudoers file. This incident will be reported.",
          },
        ]);
      },
    },
    hack: {
      description: "Initiate hack sequence",
      hidden: true,
      action: () => {
        const hackSequence = [
          "",
          "INITIATING HACK SEQUENCE...",
          "Connecting to mainframe... ✓",
          "Bypassing firewall... ✓",
          "Decrypting password... ✓",
          "Access granted... ✓",
          "",
          "Just kidding! This is a portfolio, not Mr. Robot 😎",
          "",
        ];
        playSound("success");
        setHistory((prev) => [
          ...prev,
          ...hackSequence.map((line) => ({
            type: line.includes("✓")
              ? ("success" as const)
              : ("output" as const),
            content: line,
          })),
        ]);
      },
    },
    matrix: {
      description: "Enter the matrix",
      hidden: true,
      action: () => {
        playSound("success");
        setHistory((prev) => [
          ...prev,
          { type: "success", content: "Wake up, Neo... 🕶️" },
          { type: "output", content: "The Matrix has you..." },
          { type: "output", content: "Follow the white rabbit. 🐰" },
        ]);
      },
    },
    konami: {
      description: "Konami code activated",
      hidden: true,
      action: () => {
        playSound("success");
        setHistory((prev) => [
          ...prev,
          { type: "success", content: "🎮 KONAMI CODE ACTIVATED!" },
          { type: "output", content: "You've unlocked: 30 extra lives!" },
          {
            type: "output",
            content: "Just kidding... but nice job finding this! 🎉",
          },
        ]);
      },
    },
    fortune: {
      description: "Get a random fortune",
      hidden: true,
      action: () => {
        const fortunes = [
          "A bug in the code is worth two in the documentation.",
          "The best code is no code at all.",
          "Talk is cheap. Show me the code. - Linus Torvalds",
          "First, solve the problem. Then, write the code.",
          "Code never lies, comments sometimes do.",
          "Simplicity is the soul of efficiency.",
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        playSound("success");
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "success", content: `🔮 ${fortune}` },
          { type: "output", content: "" },
        ]);
      },
    },
    snake: {
      description: "Play Snake game",
      hidden: true,
      action: () => {
        const newWindow: GameWindow = {
          id: `snake-${Date.now()}`,
          type: "snake",
          x: 150 + gameWindows.length * 30,
          y: 150 + gameWindows.length * 30,
        };
        setGameWindows([...gameWindows, newWindow]);
        playSound("success");
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: "Launching Snake game in new window...",
          },
        ]);
      },
    },
    typing: {
      description: "Typing speed test",
      hidden: true,
      action: () => {
        const newWindow: GameWindow = {
          id: `typing-${Date.now()}`,
          type: "typing",
          x: 150 + gameWindows.length * 30,
          y: 150 + gameWindows.length * 30,
        };
        setGameWindows([...gameWindows, newWindow]);
        playSound("success");
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: "Launching Typing Test in new window...",
          },
        ]);
      },
    },
  };

  // Autocomplete functionality
  useEffect(() => {
    if (input) {
      const matchingCommands = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matchingCommands.length === 1) {
        setSuggestion(matchingCommands[0]);
      } else {
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add to history
    setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (!trimmedCmd) return;

    playSound("enter");

    // Handle cat command with arguments
    if (commandName === "cat" && args.length > 0) {
      const filename = args[0].toLowerCase();
      const fileContents: Record<string, string[]> = {
        "skills.txt": [
          "=== Technical Skills ===",
          "",
          "Languages: TypeScript, JavaScript, Python, Go",
          "Frontend: React, Vue, Next.js, Tailwind CSS",
          "Backend: Node.js, Express, PostgreSQL, Redis",
          "DevOps: Docker, Kubernetes, AWS, CI/CD",
          "Tools: Git, VSCode, Figma, Linear",
        ],
        "about.md": [
          "# About Me",
          "",
          "Full-stack developer with a passion for creating",
          "beautiful, performant, and accessible web applications.",
          "",
          "I believe in writing clean code, building great UX,",
          "and shipping features that users actually need.",
        ],
        "contact.txt": [
          "=== Contact Information ===",
          "",
          "Email: your-email@example.com",
          "GitHub: github.com/yourusername",
          "LinkedIn: linkedin.com/in/yourusername",
          "Portfolio: yourwebsite.com",
        ],
      };

      if (fileContents[filename]) {
        playSound("success");
        setHistory((prev) => [
          ...prev,
          ...fileContents[filename].map((line) => ({
            type: "output" as const,
            content: line,
          })),
        ]);
      } else {
        playSound("error");
        setHistory((prev) => [
          ...prev,
          {
            type: "error",
            content: `cat: ${filename}: No such file or directory`,
          },
          {
            type: "output",
            content: "Available files: skills.txt, about.md, contact.txt",
          },
        ]);
      }
      return;
    }

    if (commands[commandName]) {
      commands[commandName].action();
    } else {
      playSound("error");
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: '${commandName}'. Type 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
      setSuggestion("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    playSound("key");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab for autocomplete
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion("");
      playSound("success");
      return;
    }

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
          className="no-print fixed bottom-6 left-6 lg:left-auto lg:right-6 z-[100] font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20 w-fit cursor-pointer hover:bg-background/90 hover:border-foreground/40 active:scale-95 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={() => {
            setIsBooting(true);
            setIsOpen(true);
          }}
          whileTap={{ scale: 0.95 }}
        >
          <TerminalIcon size={14} />
          <span className="hidden lg:inline">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-foreground/10 border border-foreground/30">
              T
            </kbd>{" "}
            to open terminal
          </span>
          <span className="lg:hidden">Tap to open terminal</span>
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
                    System Terminal {isBooting && `- Booting ${bootProgress}%`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="hover:bg-background hover:text-foreground transition-colors p-1 border-2 border-transparent hover:border-background"
                    aria-label="Toggle sound"
                    title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                  >
                    {soundEnabled ? (
                      <Volume2 size={18} />
                    ) : (
                      <VolumeX size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsBooting(false);
                      setBootProgress(0);
                    }}
                    className="hover:bg-background hover:text-foreground transition-colors p-1 border-2 border-transparent hover:border-background"
                    aria-label="Close terminal"
                  >
                    <X size={18} />
                  </button>
                </div>
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
                  className="flex items-center gap-2 relative"
                >
                  <span className="text-primary font-bold">&gt;</span>
                  <div className="flex-1 relative">
                    {/* Autocomplete suggestion (ghost text) */}
                    {suggestion &&
                      input &&
                      suggestion.startsWith(input.toLowerCase()) && (
                        <div className="absolute left-0 top-0 pointer-events-none text-muted-foreground/40 font-mono">
                          <span className="opacity-0">{input}</span>
                          {suggestion.slice(input.length)}
                        </div>
                      )}
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent outline-none text-foreground font-mono caret-primary relative z-10"
                      placeholder="Type 'help' for commands..."
                      autoComplete="off"
                      spellCheck={false}
                      disabled={isBooting}
                    />
                  </div>
                </form>
              </div>

              {/* Terminal footer */}
              <div className="bg-foreground/5 px-4 py-2 border-t-2 border-foreground/20 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>
                  Press ESC or click outside to close | Tab to autocomplete
                </span>
                <span>
                  ↑↓ history | {soundEnabled ? "🔊" : "🔇"} sounds{" "}
                  {soundEnabled ? "on" : "off"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable Game Windows */}
      {gameWindows.map((window) => (
        <DraggableWindow
          key={window.id}
          title={window.type === "snake" ? "🐍 SNAKE GAME" : "⌨️  TYPING TEST"}
          initialX={window.x}
          initialY={window.y}
          width={window.type === "snake" ? 450 : 600}
          height={window.type === "snake" ? 600 : 500}
          onClose={() => {
            setGameWindows(gameWindows.filter((w) => w.id !== window.id));
            setHistory((prev) => [
              ...prev,
              {
                type: "output",
                content: `${
                  window.type === "snake" ? "Snake game" : "Typing test"
                } closed.`,
              },
            ]);
          }}
        >
          {window.type === "snake" ? (
            <TerminalSnake
              onGameOver={(score) => {
                setGameWindows(gameWindows.filter((w) => w.id !== window.id));
                setHistory((prev) => [
                  ...prev,
                  { type: "output", content: "" },
                  {
                    type: "success",
                    content: `🐍 Game Over! Final Score: ${score}`,
                  },
                  { type: "output", content: "" },
                ]);
              }}
              onQuit={() => {
                setGameWindows(gameWindows.filter((w) => w.id !== window.id));
                setHistory((prev) => [
                  ...prev,
                  { type: "output", content: "Snake game exited." },
                ]);
              }}
            />
          ) : (
            <TerminalTypingGame
              onComplete={(wpm, accuracy) => {
                setGameWindows(gameWindows.filter((w) => w.id !== window.id));
                setHistory((prev) => [
                  ...prev,
                  { type: "output", content: "" },
                  {
                    type: "success",
                    content: `⌨️  Typing Test Complete!`,
                  },
                  {
                    type: "output",
                    content: `Speed: ${wpm} WPM | Accuracy: ${accuracy}%`,
                  },
                  { type: "output", content: "" },
                ]);
              }}
              onQuit={() => {
                setGameWindows(gameWindows.filter((w) => w.id !== window.id));
                setHistory((prev) => [
                  ...prev,
                  { type: "output", content: "Typing test exited." },
                ]);
              }}
            />
          )}
        </DraggableWindow>
      ))}
    </>
  );
};

export default BrutalistTerminal;

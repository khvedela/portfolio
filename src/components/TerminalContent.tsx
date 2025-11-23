import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Volume2, VolumeX } from "lucide-react";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";
import TerminalSnake from "./TerminalSnake";
import TerminalTypingGame from "./TerminalTypingGame";
import TerminalKeyboard from "./TerminalKeyboard";
import { blogPosts } from "@/blog/posts";
import { playSound } from "@/lib/audio";

interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "system";
  content: React.ReactNode | string;
}

interface TerminalContentProps {
  initialHistory?: TerminalLine[];
  onClose?: () => void;
  isEmbedded?: boolean;
}

export const TerminalContent = ({ initialHistory = [], onClose, isEmbedded = false }: TerminalContentProps) => {
  const [input, setInput] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeGame, setActiveGame] = useState<"snake" | "typing" | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard } = useBrutalistToast();

  useEffect(() => {
    // Initial greeting
    if (history.length === 0) {
      setHistory([
        { type: "system", content: "INITIALIZING SYSTEM..." },
        { type: "system", content: "CONNECTION ESTABLISHED." },
        { type: "success", content: "WELCOME, OPERATOR." },
        { type: "output", content: "Type 'help' for available commands." },
      ]);
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const commands: Record<string, { action: () => void; description: string; hidden?: boolean }> = {
    help: {
      description: "Show commands",
      action: () => {
        setHistory(prev => [...prev, 
          { type: "success", content: "AVAILABLE DIRECTIVES:" },
          { type: "output", content: "  neofetch    // System Summary" },
          { type: "output", content: "  about       // Operator Profile" },
          { type: "output", content: "  skills      // Tech Arsenal" },
          { type: "output", content: "  contact     // Uplinks" },
          { type: "output", content: "  snake       // Leisure Protocol 1" },
          { type: "output", content: "  typing      // Leisure Protocol 2" },
          { type: "output", content: "  clear       // Flush Buffer" },
          { type: "output", content: "  exit        // Terminate Session" }
        ]);
      }
    },
    clear: {
      description: "Clear terminal",
      action: () => setHistory([])
    },
    exit: {
      description: "Close terminal",
      action: () => onClose?.()
    },
    snake: {
      description: "Play Snake",
      action: () => setActiveGame("snake")
    },
    typing: {
      description: "Typing Test",
      action: () => setActiveGame("typing")
    },
    about: {
      description: "About me",
      action: () => setHistory(prev => [...prev, 
        { type: "success", content: "IDENTITY: David Khvedelidze" }, 
        { type: "output", content: "ROLE: Senior Frontend Engineer / Angular Specialist" },
        { type: "output", content: "ORIGIN: Tbilisi, Georgia" },
        { type: "output", content: "CURRENT_LOC: Paris, France" },
        { type: "output", content: "MISSION: Building high-performance enterprise interfaces that don't suck." }
      ])
    },
    skills: {
      description: "Show skills",
      action: () => setHistory(prev => [...prev, 
        { type: "success", content: "PRIMARY WEAPONS:" },
        { type: "output", content: "  [*] Angular (Expert)" },
        { type: "output", content: "  [*] TypeScript (Expert)" },
        { type: "output", content: "  [*] RxJS & NgRx" },
        { type: "output", content: "  [*] Tailwind CSS" },
        { type: "output", content: "  [-] React (Proficient)" },
        { type: "output", content: "  [-] Node.js" }
      ])
    },
    contact: {
      description: "Contact info",
      action: () => setHistory(prev => [...prev,
        { type: "success", content: "COMMUNICATION CHANNELS:" },
        { type: "output", content: "  EMAIL: davidkhvedelidze@gmail.com" },
        { type: "output", content: "  LINKEDIN: /in/khvedelidzedavid" },
        { type: "output", content: "  GITHUB: @khvedelidzedavid" }
      ])
    },
    neofetch: {
      description: "System info",
      action: () => setHistory(prev => [...prev, 
        { type: "output", content: 
          <pre className="text-xs leading-tight text-primary font-bold">
{`
       /\\        OS: BrutalistOS v2.0
      /  \\       KERNEL: React 18.x
     / /\\ \\      UPTIME: 4 Years
    / /  \\ \\     SHELL: ZSH (Zen Style Hacker)
   / /    \\ \\    CPU: Angular Specialist
  / /      \\ \\   GPU: Tailwind CSS
 / /________\\ \\  MEMORY: Infinite Learner
/____________\\ \\ 
\\_____________\\/ 
`}
          </pre>
        }
      ])
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(" ");
    const commandName = parts[0].toLowerCase();

    setHistory(prev => [...prev, { type: "input", content: `> ${cmd}` }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (!trimmed) return;
    if (soundEnabled) playSound("enter");

    if (commands[commandName]) {
      commands[commandName].action();
    } else {
      setHistory(prev => [...prev, { type: "error", content: `Command not found: ${commandName}` }]);
      if (soundEnabled) playSound("error");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  if (activeGame === "snake") {
    return <TerminalSnake isMobile={isMobile} onGameOver={() => setActiveGame(null)} onQuit={() => setActiveGame(null)} />;
  }

  if (activeGame === "typing") {
    return <TerminalTypingGame isMobile={isMobile} onComplete={() => setActiveGame(null)} onQuit={() => setActiveGame(null)} />;
  }

  return (
    <div className={`flex flex-col h-full bg-background text-foreground font-mono text-sm ${isEmbedded ? '' : 'p-4'}`}>
      {!isEmbedded && (
        <div className="flex justify-between items-center mb-2 border-b border-foreground/20 pb-2">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} />
            <span className="font-bold">TERMINAL_ACCESS</span>
          </div>
          <button onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      )}
      
      <div ref={historyRef} className="flex-1 overflow-auto space-y-1 mb-2 min-h-0 font-mono">
        {history.map((line, i) => (
          <div key={i} className={`
            ${line.type === 'input' ? 'text-foreground font-bold' : ''}
            ${line.type === 'error' ? 'text-destructive' : ''}
            ${line.type === 'success' ? 'text-success' : ''}
            ${line.type === 'system' ? 'text-muted-foreground text-xs' : ''}
            ${line.type === 'output' ? 'text-foreground/80' : ''}
          `}>
            {line.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 shrink-0">
        <span className="text-primary font-bold animate-pulse">_</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (soundEnabled) playSound('type');
          }}
          className="flex-1 bg-transparent outline-none caret-transparent text-foreground"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

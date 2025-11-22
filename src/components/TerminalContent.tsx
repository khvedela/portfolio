import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Volume2, VolumeX } from "lucide-react";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";
import TerminalSnake from "./TerminalSnake";
import TerminalTypingGame from "./TerminalTypingGame";
import TerminalKeyboard from "./TerminalKeyboard";
import { blogPosts } from "@/blog/posts";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

interface TerminalContentProps {
  initialHistory?: TerminalLine[];
  onClose?: () => void;
  isEmbedded?: boolean;
}

export const TerminalContent = ({ initialHistory = [], onClose, isEmbedded = false }: TerminalContentProps) => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeGame, setActiveGame] = useState<"snake" | "typing" | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard } = useBrutalistToast();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const playSound = (type: "key" | "enter" | "error" | "success") => {
    if (!soundEnabled) return;
    // ... (sound logic reused)
    const audioContext = new (window.AudioContext ||
      // @ts-expect-error - webkitAudioContext for Safari compatibility
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case "key": oscillator.frequency.value = 800; gainNode.gain.value = 0.05; oscillator.start(); oscillator.stop(audioContext.currentTime + 0.03); break;
      case "enter": oscillator.frequency.value = 600; gainNode.gain.value = 0.1; oscillator.start(); oscillator.stop(audioContext.currentTime + 0.08); break;
      case "error": oscillator.frequency.value = 200; gainNode.gain.value = 0.15; oscillator.start(); oscillator.stop(audioContext.currentTime + 0.15); break;
      case "success": oscillator.frequency.value = 1000; gainNode.gain.value = 0.1; oscillator.start(); oscillator.stop(audioContext.currentTime + 0.1); break;
    }
  };

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
          { type: "success", content: "AVAILABLE COMMANDS:" },
          { type: "output", content: "help, about, contact, skills, blog, clear, exit, snake, typing" }
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
      action: () => setHistory(prev => [...prev, { type: "success", content: "David Khvedelidze" }, { type: "output", content: "Full-Stack Developer | Angular Specialist" }])
    },
    skills: {
      description: "Show skills",
      action: () => setHistory(prev => [...prev, { type: "output", content: "React, Angular, Node.js, TypeScript, AWS" }])
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
    playSound("enter");

    if (commands[commandName]) {
      commands[commandName].action();
    } else {
      setHistory(prev => [...prev, { type: "error", content: `Command not found: ${commandName}` }]);
      playSound("error");
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
            <span className="font-bold">TERMINAL</span>
          </div>
          <button onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      )}
      
      <div ref={historyRef} className="flex-1 overflow-auto space-y-1 mb-2 min-h-0">
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-primary font-bold' : line.type === 'error' ? 'text-red-500' : line.type === 'success' ? 'text-green-500' : 'text-foreground'}`}>
            {line.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 shrink-0">
        <span className="text-primary font-bold">&gt;</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none caret-primary"
          autoFocus
        />
      </form>
    </div>
  );
};

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Wifi, Battery, Volume2, Clock as ClockIcon } from "lucide-react";

interface TaskbarProps {
  openWindows: { id: string; title: string; icon: any; minimized: boolean }[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  startOpen: boolean;
}

export const Taskbar = ({ openWindows, activeWindow, onWindowClick, onStartClick, startOpen }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center px-3 z-[10000] select-none shadow-md text-sm">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`flex items-center gap-2 px-3 h-full font-bold tracking-wide transition-colors ${startOpen ? "bg-white/20 text-white" : "hover:bg-white/10 text-gray-200"}`}
      >
        <Terminal size={14} />
        <span>Applications</span>
      </button>

      {/* Window List */}
      <div className="flex-1 flex items-center gap-1 ml-4 overflow-x-auto">
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`flex items-center gap-2 px-3 h-6 rounded-sm max-w-[200px] text-xs transition-all ${
              activeWindow === win.id && !win.minimized
                ? "bg-white/20 text-white shadow-sm"
                : "hover:bg-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <win.icon size={12} />
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Center Clock (Absolute) */}
      <div className="absolute left-1/2 -translate-x-1/2 font-bold text-gray-200 hidden md:block">
        {time.toLocaleTimeString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 pl-4 ml-2">
        <div className="flex gap-3 text-gray-400">
          <Wifi size={14} />
          <Volume2 size={14} />
          <Battery size={14} />
        </div>
      </div>
    </div>
  );
};

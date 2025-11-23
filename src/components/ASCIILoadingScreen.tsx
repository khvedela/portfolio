import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/lib/audio";
import { useTextScramble } from "@/hooks/useTextScramble";

interface ASCIILoadingScreenProps {
  onComplete?: () => void;
}

type ColorTheme = "green" | "amber" | "cyan" | "white";

const THEMES: Record<ColorTheme, string> = {
  green: "text-green-500 selection:bg-green-900 selection:text-white",
  amber: "text-amber-500 selection:bg-amber-900 selection:text-white",
  cyan: "text-cyan-500 selection:bg-cyan-900 selection:text-white",
  white: "text-slate-200 selection:bg-slate-800 selection:text-white",
};

const THEME_BORDERS: Record<ColorTheme, string> = {
  green: "border-green-500",
  amber: "border-amber-500",
  cyan: "border-cyan-500",
  white: "border-slate-200",
};

const ASCIILoadingScreen = ({ onComplete }: ASCIILoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [isBiosOpen, setIsBiosOpen] = useState(false);
  const [theme, setTheme] = useState<ColorTheme>("green");
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [bootSequence, setBootSequence] = useState<string[]>([
    "INITIALIZING DK_KERNEL V4.0...",
    "CHECKING SYSTEM INTEGRITY... [OK]",
  ]);

  // Check session storage on mount
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setShouldRender(false);
      onComplete?.();
    }
  }, []);

  // System Diagnostics
  useEffect(() => {
    if (!shouldRender) return;

    const initSystem = async () => {
      const nav = window.navigator as any;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const newLogs = [
        `DETECTED_VIEWPORT: ${width}x${height}`,
        `USER_AGENT: ${nav.platform || 'UNKNOWN'}`,
        `CORES: ${nav.hardwareConcurrency || 'UNKNOWN'}`,
      ];

      if (nav.connection) {
        newLogs.push(`CONNECTION: ${nav.connection.effectiveType?.toUpperCase() || 'UNKNOWN'}`);
      }

      if (nav.getBattery) {
        try {
          const battery = await nav.getBattery();
          newLogs.push(`BATTERY_LEVEL: ${(battery.level * 100).toFixed(0)}%`);
          newLogs.push(`POWER_SOURCE: ${battery.charging ? 'AC_ADAPTER' : 'INTERNAL_CELL'}`);
        } catch (e) {
          // Battery API not supported or denied
        }
      }

      setBootSequence(prev => [
        ...prev, 
        ...newLogs,
        "LOADING ANGULAR_EXPERTISE... [OK]",
        "MOUNTING REACT_ADAPTERS...",
        "FETCHING PARIS_COORDINATES...",
        " > LAT: 48.8566 N",
        " > LONG: 2.3522 E",
        "COMPILING FRONTEND_SKILLS...",
        "OPTIMIZING UX_PATTERNS...",
        "BUILDING RESUME_DATA_STRUCTURES...",
        "DECRYPTING CASE_STUDIES...",
        "RENDERING PORTFOLIO_INTERFACE...",
        "ACCESS GRANTED."
      ]);
    };
    
    initSystem();
    // Try to play boot sound immediately (might be blocked)
    playSound('boot');

    // Global click listener to unlock audio context if autoplay was blocked
    const unlockAudio = () => {
      playSound('click'); // Resume context
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    
    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  // Progress & Logs Timer
  useEffect(() => {
    if (isBiosOpen) return;

    // Progress bar fills up...
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random jumps for realism
        const jump = Math.random() > 0.8 ? 15 : 2;
        if (Math.random() > 0.5) playSound('type');
        return Math.min(prev + jump, 100);
      });
    }, 150);

    // Logs scroll...
    const logInterval = setInterval(() => {
      setVisibleLogCount(prev => {
        // If we have more logs to show...
        if (prev < bootSequence.length) {
          playSound('type');
          return prev + 1;
        }
        
        // All logs shown? NOW we are done.
        clearInterval(logInterval);
        // Only show button if progress is ALSO done (it should be by now, but safe check)
        setTimeout(() => {
          setShowEnterButton(true);
          playSound('success');
        }, 500);
        
        return prev;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [bootSequence.length, isBiosOpen]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleLogCount]);

  // BIOS Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "F2") {
        setIsBiosOpen(true);
        playSound('click');
      }
      if (e.key === "Escape" && isBiosOpen) {
        setIsBiosOpen(false);
        playSound('click');
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBiosOpen]);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    playSound('click');
    sessionStorage.setItem("hasVisited", "true");
    // Wait for animation then complete
    setTimeout(() => {
      onComplete?.();
    }, 800);
  };

  // CRT Scanline Style
  const scanlineStyle = {
    backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
    backgroundSize: "100% 2px, 3px 100%"
  };

  const currentColor = THEMES[theme];
  const currentBorder = THEME_BORDERS[theme];
  
  const buttonText = useTextScramble("[ ACCESS PORTFOLIO ]", showEnterButton);

  if (!shouldRender) return null;

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] bg-black ${currentColor} font-mono flex flex-col items-center justify-center overflow-hidden ${isExiting ? 'crt-turn-off' : ''}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* CRT Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none z-50 scanlines" style={scanlineStyle} />
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Main Container */}
      <motion.div 
        className="relative z-10 w-full max-w-3xl px-6 flex flex-col h-full max-h-[85vh]"
      >
        
        {isBiosOpen ? (
          /* BIOS SETUP SCREEN */
          <div className="w-full h-full border-4 border-double border-current p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-8 bg-current text-black inline-block px-2 self-start">
              BIOS SETUP UTILITY
            </h2>
            
            <div className="space-y-6 flex-grow">
              <p>Use [TAB] to select option, [ENTER] to confirm</p>
              
              <div className="space-y-2">
                <h3 className="uppercase border-b border-current w-1/2 mb-4">Display Configuration</h3>
                {(['green', 'amber', 'cyan', 'white'] as ColorTheme[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => { setTheme(c); playSound('click'); }}
                    className={`block w-full text-left px-4 py-2 hover:bg-white/10 ${theme === c ? 'bg-white/20 font-bold' : 'opacity-60'}`}
                  >
                    {`> SET COLOR_PROFILE: ${c.toUpperCase()}`} {theme === c && '[ACTIVE]'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-current flex justify-between text-sm">
              <span>v4.0.0-stable</span>
              <button 
                onClick={() => setIsBiosOpen(false)} 
                className="blink hover:bg-white/20 px-2"
              >
                [ESC] EXIT BIOS
              </button>
            </div>
          </div>
        ) : (
          /* BOOT SEQUENCE SCREEN */
          <>
            {/* Header / ASCII Art */}
            <div className="mb-6 shrink-0 chromatic-aberration">
              <pre className="text-[0.4rem] sm:text-[0.6rem] leading-[1.0] opacity-90 font-bold select-none">
{`
 ██████╗  █████╗ ██╗   ██╗██╗██████╗ 
 ██╔══██╗██╔══██╗██║   ██║██║██╔══██╗
 ██║  ██║███████║██║   ██║██║██║  ██║
 ██║  ██║██╔══██║╚██╗ ██╔╝██║██║  ██║
 ██████╔╝██║  ██║ ╚████╔╝ ██║██████╔╝
 ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═════╝ 
`}
              </pre>
              <div className={`border-b-2 ${currentBorder} pb-2 mt-4 flex justify-between items-end`}>
                <h1 className="text-lg sm:text-xl tracking-tighter font-bold">DK_PORTFOLIO_OS</h1>
                <span className="animate-pulse text-xs sm:text-sm">v.4.0.0-stable</span>
              </div>
            </div>

            {/* Boot Logs Area */}
            <div 
              ref={logContainerRef}
              className={`flex-grow overflow-y-auto overflow-x-hidden font-mono text-sm sm:text-base space-y-1 mb-6 border-l-2 ${currentBorder} pl-4 scrollbar-none`}
            >
              {bootSequence.slice(0, visibleLogCount).map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className="break-words"
                >
                  <span className="mr-2 opacity-50 text-xs">[{new Date().toLocaleTimeString()}]</span>
                  <span className={(log || '').includes('ERROR') ? 'text-red-500' : ''}>{log}</span>
                </motion.div>
              ))}
              <div className="w-3 h-5 bg-current animate-pulse inline-block align-middle" />
            </div>

            {/* Progress Bar & Status */}
            <div className="shrink-0 space-y-2">
              <div className="flex justify-between text-xs uppercase tracking-widest opacity-70">
                <span>Memory: {Math.min(progress * 12, 1024).toFixed(0)}MB</span>
                <span>Load: {Math.min(progress, 100).toFixed(0)}%</span>
              </div>
              
              <div className={`h-6 bg-white/5 border-2 ${currentBorder} relative overflow-hidden`}>
                <motion.div 
                  className="h-full bg-current relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  {/* Striped pattern on bar */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.5)_25%,rgba(0,0,0,0.5)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.5)_75%,rgba(0,0,0,0.5)_100%)] bg-[length:10px_10px] opacity-50" />
                </motion.div>
              </div>
            </div>

            {/* Enter Prompt - Centered in flow */}
            <div className="h-20 flex items-center justify-center mt-8 shrink-0">
              <AnimatePresence>
                {showEnterButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [0.8, 1.1, 0.9, 1.05, 1],
                      x: [0, -5, 5, -2, 2, 0],
                      y: [0, 5, -5, 2, -2, 0],
                      filter: ["blur(10px)", "blur(0px)"]
                    }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                  >
                    <button
                      onClick={handleEnter}
                      onMouseEnter={() => playSound('hover')}
                      className={`group relative px-8 py-4 bg-black/80 border-2 ${currentBorder} hover:bg-white/5 hover:tracking-[0.25em] hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all duration-300 focus:outline-none chromatic-aberration-strong backdrop-blur-sm`}
                    >
                      <span className="font-bold text-lg tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 w-[280px] inline-block text-center">
                        {buttonText}
                      </span>
                      
                      {/* Glitchy corners */}
                      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${currentBorder} -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform`} />
                      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${currentBorder} translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform`} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Controls */}
            <div className="mt-auto pt-4 flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-wider opacity-80 font-bold">
              <div className="hidden sm:flex gap-4">
                <span className="animate-pulse">● ONLINE</span>
                <span>SECURE_CONNECTION</span>
              </div>
              
              {/* Universal BIOS toggle */}
              <button 
                onClick={() => { setIsBiosOpen(true); playSound('click'); }}
                className="hover:bg-white/10 px-2 py-1 transition-colors cursor-pointer"
              >
                [ SETUP ] <span className="hidden sm:inline opacity-50 ml-2">PRESS DEL</span>
              </button>
            </div>
          </>
        )}

      </motion.div>
      
      {/* Footer System Info */}
      <div className="absolute bottom-2 sm:bottom-4 w-full text-center text-[10px] opacity-50 uppercase tracking-[0.5em] pointer-events-none">
        DK_OS // TERMINAL_ACCESS // {theme.toUpperCase()}
      </div>
    </motion.div>
  );
};

export default ASCIILoadingScreen;

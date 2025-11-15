import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ASCIILoadingScreenProps {
  onComplete?: () => void;
}

const ASCIILoadingScreen = ({ onComplete }: ASCIILoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowEnterButton(true);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    onComplete?.();
  };

  const asciiArt = `
 ██████╗  █████╗ ██╗   ██╗██╗██████╗ 
 ██╔══██╗██╔══██╗██║   ██║██║██╔══██╗
 ██║  ██║███████║██║   ██║██║██║  ██║
 ██║  ██║██╔══██║╚██╗ ██╔╝██║██║  ██║
 ██████╔╝██║  ██║ ╚████╔╝ ██║██████╔╝
 ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═════╝ 
                                      
 ██╗  ██╗██╗  ██╗██╗   ██╗███████╗██████╗ ███████╗██╗     ██╗██████╗ ███████╗███████╗
 ██║ ██╔╝██║  ██║██║   ██║██╔════╝██╔══██╗██╔════╝██║     ██║██╔══██╗╚══███╔╝██╔════╝
 █████╔╝ ███████║██║   ██║█████╗  ██║  ██║█████╗  ██║     ██║██║  ██║  ███╔╝ █████╗  
 ██╔═██╗ ██╔══██║╚██╗ ██╔╝██╔══╝  ██║  ██║██╔══╝  ██║     ██║██║  ██║ ███╔╝  ██╔══╝  
 ██║  ██╗██║  ██║ ╚████╔╝ ███████╗██████╔╝███████╗███████╗██║██████╔╝███████╗███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═════╝ ╚══════╝╚══════╝╚═╝╚═════╝ ╚══════╝╚══════╝`;

  const lines = asciiArt.split("\n").filter((line) => line.trim());

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-large opacity-[0.03]" />

      {/* Corner brackets - smaller and closer on mobile */}
      <motion.div
        className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 border-l-3 border-t-3 sm:border-l-4 sm:border-t-4 border-primary"
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-16 sm:h-16 border-r-3 border-t-3 sm:border-r-4 sm:border-t-4 border-primary"
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 border-l-3 border-b-3 sm:border-l-4 sm:border-b-4 border-accent"
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-16 sm:h-16 border-r-3 border-b-3 sm:border-r-4 sm:border-b-4 border-accent"
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-2xl">
        {/* ASCII Art - better mobile scaling */}
        <div className="font-mono text-primary leading-tight mb-6 sm:mb-8 w-full flex justify-center">
          <div className="inline-block">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.03,
                }}
                className="whitespace-pre text-[0.4rem] xs:text-[0.5rem] sm:text-xs md:text-sm lg:text-base"
                style={{
                  textShadow: "0 0 10px hsl(var(--primary) / 0.5)",
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Loading bar - full width on mobile */}
        <motion.div
          className="w-full max-w-md px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2 font-mono text-[0.65rem] sm:text-xs text-foreground uppercase tracking-wider">
            <span>LOADING PORTFOLIO</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2.5 sm:h-3 bg-foreground/10 border-2 sm:border-3 border-foreground relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Scanning line effect */}
              <motion.div
                className="absolute right-0 top-0 w-1 h-full bg-background"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Terminal-style loading messages */}
          <motion.div
            className="mt-3 sm:mt-4 font-mono text-[0.65rem] sm:text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {progress < 30 && <span>&gt; Initializing system...</span>}
            {progress >= 30 && progress < 60 && (
              <span>&gt; Loading components...</span>
            )}
            {progress >= 60 && progress < 90 && (
              <span>&gt; Compiling experience...</span>
            )}
            {progress >= 90 && progress < 100 && (
              <span>&gt; Almost ready...</span>
            )}
            {progress === 100 && !showEnterButton && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary"
              >
                &gt; System ready. Preparing interface...
              </motion.span>
            )}
          </motion.div>

          {/* Enter button - touch-friendly */}
          {showEnterButton && (
            <motion.div
              className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                onClick={handleEnter}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-foreground text-background border-3 sm:border-4 border-foreground font-mono font-bold uppercase text-xs sm:text-sm relative overflow-hidden group touch-manipulation active:scale-95"
                whileHover={{
                  boxShadow: "8px 8px 0 hsl(var(--primary))",
                  x: -4,
                  y: -4,
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Animated border accent */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />

                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <span className="whitespace-nowrap">ENTER PORTFOLIO</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              {/* Blinking cursor prompt */}
              <motion.div
                className="font-mono text-[0.65rem] sm:text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="hidden sm:inline">Press to continue</span>
                <span className="sm:hidden">Tap to continue</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  _
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ASCIILoadingScreen;

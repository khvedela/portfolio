import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((currentScrollY / scrollHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-background/20 backdrop-blur-sm">
      {/* Animated background track */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/20 to-transparent animate-pulse"></div>
      
      {/* Main progress bar */}
      <motion.div 
        className="h-full relative overflow-hidden"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {/* Multi-layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-accent"></div>
        
        {/* Animated overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ 
            x: ["-100%", "100%"],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Glowing edge */}
        <div className="absolute right-0 top-0 w-2 h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] blur-[1px]"></div>
      </motion.div>
      
      {/* Sparkle effects */}
      {scrollProgress > 0 && (
        <motion.div
          className="absolute top-0 h-full w-1"
          style={{ left: `${scrollProgress}%` }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="h-full bg-white/60 shadow-[0_0_6px_white] rounded-full"></div>
        </motion.div>
      )}
    </div>
  );
};

export default ScrollProgress;
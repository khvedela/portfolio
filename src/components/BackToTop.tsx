import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollToPlugin);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrolled / scrollHeight) * 100, 100);
      
      setIsVisible(scrolled > 300);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: "power3.out"
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[999] group w-8 h-8 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-sm group-hover:bg-primary/20 transition-all duration-300"></div>
      
      {/* Progress ring */}
      <svg 
        className="absolute inset-0 w-8 h-8 transform -rotate-90" 
        viewBox="0 0 32 32"
      >
        <motion.circle
          cx="16"
          cy="16"
          r="14"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 14}`}
          strokeDashoffset={`${2 * Math.PI * 14 * (1 - scrollProgress / 100)}`}
          opacity={0.6}
          className="group-hover:opacity-100 transition-opacity duration-300"
        />
      </svg>
      
      {/* Icon container - no background */}
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center">
        <ArrowUp 
          size={16} 
          className="text-primary group-hover:text-primary transition-all duration-300" 
          strokeWidth={2}
        />
      </div>
    </motion.button>
  );
};

export default BackToTop;
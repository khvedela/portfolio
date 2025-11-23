import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/lib/audio";

const SystemTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true);
    playSound('click'); // Sound effect on navigation
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => setIsTransitioning(false)}
        >
          {/* CRT Shut-off effect: White horizontal line expanding/contracting */}
          <motion.div
            className="w-full h-full bg-black"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={[
              { scaleY: 0.005, opacity: 1, duration: 0.1 }, // Flash thin line
              { scaleY: 1, opacity: 1, duration: 0.2, ease: "circIn" }, // Expand to full black
              { scaleY: 1, opacity: 1, duration: 0.1 }, // Hold
              { scaleY: 0, opacity: 0, duration: 0.3, ease: "circOut" } // Collapse
            ]}
          />
          
          {/* "LOADING SECTOR" Text Overlay */}
          <motion.div 
             className="absolute inset-0 flex items-center justify-center text-primary font-mono font-bold text-xl tracking-[0.5em]"
             initial={{ opacity: 0 }}
             animate={{ 
                opacity: [0, 1, 1, 0],
                transition: { duration: 0.4, times: [0, 0.4, 0.6, 1] }
             }}
          >
            ACCESSING_SECTOR...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemTransition;
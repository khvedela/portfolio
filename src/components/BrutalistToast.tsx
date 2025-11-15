import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface BrutalistToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const BrutalistToast = ({
  message,
  isVisible,
  onClose,
}: BrutalistToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[100] no-print"
          style={{ transform: "translateX(-50%)" }}
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <motion.div
            className="bg-foreground text-background border-4 border-foreground relative overflow-hidden"
            initial={{ boxShadow: "0px 0px 0 hsl(var(--primary))" }}
            animate={{
              boxShadow: [
                "-8px 8px 0 hsl(var(--primary))",
                "-12px 12px 0 hsl(var(--primary))",
                "-8px 8px 0 hsl(var(--primary))",
              ],
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
          >
            {/* Geometric corner accents */}
            <motion.div
              className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
            />

            <div className="px-6 py-4 font-mono">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  className="w-8 h-8 bg-primary flex items-center justify-center relative"
                >
                  {/* Checkmark with draw animation */}
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Check size={20} className="text-foreground" />
                  </motion.div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </motion.div>

                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <div className="text-xs uppercase tracking-wider text-primary mb-1 font-bold">
                      COPIED TO CLIPBOARD
                    </div>
                    <motion.div
                      className="text-sm font-bold"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                    >
                      {message}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Progress bar with mechanical movement */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-background/20">
              <motion.div
                className="h-full bg-primary relative"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              >
                {/* Scanning line effect */}
                <motion.div
                  className="absolute right-0 top-0 w-1 h-full bg-accent"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrutalistToast;

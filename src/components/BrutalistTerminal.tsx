import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, Volume2, VolumeX, Command } from "lucide-react";
import DraggableWindow from "./DraggableWindow";
import { TerminalContent } from "./TerminalContent";

interface BrutalistTerminalProps {
  onOpenCommandMenu?: () => void;
}

const BrutalistTerminal = ({ onOpenCommandMenu }: BrutalistTerminalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  
  // ... (keep boot logic if desired, or simplify)
  
  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <motion.div
          className="no-print fixed bottom-6 left-6 lg:left-auto lg:right-6 z-[100] flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
           <motion.button
            className="font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20 cursor-pointer hover:bg-background/90 hover:border-foreground/40 active:scale-95 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <TerminalIcon size={14} />
            <span className="hidden lg:inline">Open Terminal</span>
          </motion.button>
          
          {onOpenCommandMenu && (
            <motion.button
              className="font-mono text-xs text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 border-2 border-foreground/20 cursor-pointer hover:bg-background/90 hover:border-foreground/40 active:scale-95 transition-all"
              onClick={onOpenCommandMenu}
            >
              <Command size={14} />
              <span className="hidden lg:inline">⌘ K</span>
            </motion.button>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <DraggableWindow 
              title="SYSTEM TERMINAL" 
              onClose={() => setIsOpen(false)}
              width={800}
              height={600}
            >
              <TerminalContent onClose={() => setIsOpen(false)} />
            </DraggableWindow>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrutalistTerminal;

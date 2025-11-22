import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Maximize2, 
  Minimize2, 
  Move, 
  Grab, 
  Ban, 
  HelpCircle, 
  Crosshair, 
  ZoomIn, 
  ZoomOut,
  Copy,
  MousePointer2
} from "lucide-react";

type CursorType = 
  | "default" 
  | "pointer" 
  | "text" 
  | "wait" 
  | "progress"
  | "help"
  | "not-allowed"
  | "crosshair"
  | "grab"
  | "grabbing"
  | "zoom-in"
  | "zoom-out"
  | "resize-y" // n, s, ns, row
  | "resize-x" // e, w, ew, col
  | "resize-d1" // ne, sw, nesw
  | "resize-d2" // nw, se, nwse
  | "move" // all-scroll, move
  | "copy"
  | "none";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Ghost cursor state for trailing effect
  const ghostRef = useRef({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    // Smooth ghost follower loop
    const loop = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      
      const dx = targetX - ghostRef.current.x;
      const dy = targetY - ghostRef.current.y;
      
      ghostRef.current.x += dx * 0.25; // Faster follow
      ghostRef.current.y += dy * 0.25;
      
      setGhostPosition({ ...ghostRef.current });
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Since * { cursor: none !important } is set, we can't rely on computed style.
      // We must infer the intent from tags, attributes, and classes.
      
      const tagName = target.tagName;
      const classList = target.classList;
      const role = target.getAttribute('role');
      
      // Helper to check classes efficiently
      const hasClass = (pattern: string) => {
        return Array.from(classList).some(cls => cls.includes(pattern));
      };

      // 1. Check specific overrides via class names (Tailwind cursor classes)
      if (hasClass('cursor-none')) { setCursorType("none"); return; }
      if (hasClass('cursor-wait')) { setCursorType("wait"); return; }
      if (hasClass('cursor-progress')) { setCursorType("progress"); return; }
      if (hasClass('cursor-help')) { setCursorType("help"); return; }
      if (hasClass('cursor-not-allowed')) { setCursorType("not-allowed"); return; }
      if (hasClass('cursor-crosshair')) { setCursorType("crosshair"); return; }
      if (hasClass('cursor-zoom-in')) { setCursorType("zoom-in"); return; }
      if (hasClass('cursor-zoom-out')) { setCursorType("zoom-out"); return; }
      if (hasClass('cursor-move')) { setCursorType("move"); return; }
      if (hasClass('cursor-grab')) { setCursorType("grab"); return; }
      if (hasClass('cursor-grabbing')) { setCursorType("grabbing"); return; }
      if (hasClass('cursor-col-resize') || hasClass('cursor-e-resize') || hasClass('cursor-w-resize')) { setCursorType("resize-x"); return; }
      if (hasClass('cursor-row-resize') || hasClass('cursor-n-resize') || hasClass('cursor-s-resize')) { setCursorType("resize-y"); return; }

      // 2. Check Native Elements & Attributes
      
      // Disabled elements
      if (target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true') {
        setCursorType("not-allowed");
        return;
      }

      // Text Inputs
      if (
        tagName === 'INPUT' || 
        tagName === 'TEXTAREA' || 
        target.isContentEditable ||
        hasClass('select-text')
      ) {
        // Check specific input types that aren't text
        const inputType = target.getAttribute('type');
        if (tagName === 'INPUT' && (inputType === 'button' || inputType === 'submit' || inputType === 'checkbox' || inputType === 'radio' || inputType === 'range')) {
           setCursorType("pointer");
        } else {
           setCursorType("text");
        }
        return;
      }

      // Clickable Elements (Pointer)
      if (
        tagName === 'BUTTON' ||
        tagName === 'A' ||
        tagName === 'LABEL' ||
        tagName === 'SELECT' ||
        tagName === 'SUMMARY' ||
        role === 'button' ||
        role === 'link' ||
        role === 'checkbox' ||
        role === 'menuitem' ||
        role === 'tab' ||
        hasClass('cursor-pointer') ||
        target.onclick != null || // JS handlers
        target.closest('a') || 
        target.closest('button')
      ) {
        setCursorType("pointer");
        return;
      }
      
      // Grab/Grabbing via specific logic (often draggables)
      if (target.getAttribute('draggable') === 'true') {
         setCursorType("grab");
         return;
      }

      // Default
      setCursorType("default");
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isWait = cursorType === "wait" || cursorType === "progress";

  return (
    <>
      {/* GHOST CURSOR (The trail) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] opacity-30 mix-blend-difference"
        animate={{
          x: ghostPosition.x - 16,
          y: ghostPosition.y - 16,
        }}
        transition={{ duration: 0 }}
      >
         <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
         </div>
      </motion.div>

      {/* MAIN HARDWARE CURSOR */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.8 : 1,
          rotate: isWait ? 360 : 0,
        }}
        transition={{
          x: { duration: 0 }, // Instant
          y: { duration: 0 }, // Instant
          scale: { duration: 0.1 },
          rotate: isWait ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 }
        }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          
          {/* CENTER DOT (Hidden for certain cursors) */}
          {cursorType !== "none" && (
            <div className={`absolute bg-white transition-all duration-200 
              ${cursorType === "text" ? "w-[2px] h-4 rounded-none" : "w-1 h-1 rounded-full"}
              ${(cursorType === "crosshair" || cursorType === "none") ? "opacity-0" : "opacity-100"}
            `} />
          )}

          {/* DEFAULT: Crosshair */}
          <motion.div 
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: cursorType === "default" ? 1 : 0, scale: cursorType === "default" ? 1 : 0.5 }}
          >
            <div className="absolute top-1/2 left-1 w-2 h-[1px] bg-white" />
            <div className="absolute top-1/2 right-1 w-2 h-[1px] bg-white" />
            <div className="absolute top-1 left-1/2 w-[1px] h-2 bg-white" />
            <div className="absolute bottom-1 left-1/2 w-[1px] h-2 bg-white" />
          </motion.div>

          {/* POINTER: Bracket Lock-on */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ 
              opacity: cursorType === "pointer" ? 1 : 0,
              scale: cursorType === "pointer" ? 1 : 1.2,
              rotate: cursorType === "pointer" ? 90 : 0
            }}
            transition={{ duration: 0.2 }}
          >
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
          </motion.div>

          {/* TEXT: I-Beam Brackets */}
          <motion.div
             className="absolute inset-0 flex items-center justify-center"
             initial={false}
             animate={{ opacity: cursorType === "text" ? 1 : 0 }}
          >
             <div className="absolute top-1 w-3 h-[1px] bg-white" />
             <div className="absolute bottom-1 w-3 h-[1px] bg-white" />
          </motion.div>
          
          {/* WAIT / PROGRESS: Spinner Ring */}
          <motion.div
             className="absolute inset-0 border-2 border-white/30 rounded-full border-t-white"
             initial={false}
             animate={{ opacity: isWait ? 1 : 0 }}
          />

          {/* NOT ALLOWED: Ban Icon */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "not-allowed" ? 1 : 0 }}>
            <Ban size={16} />
          </motion.div>

          {/* HELP: Question Mark */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "help" ? 1 : 0 }}>
            <HelpCircle size={16} />
          </motion.div>

          {/* CROSSHAIR: Large Reticle */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "crosshair" ? 1 : 0 }}>
            <Crosshair size={24} strokeWidth={1} />
          </motion.div>

          {/* GRAB: Open Hand */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "grab" ? 1 : 0 }}>
            <Grab size={16} />
          </motion.div>

          {/* GRABBING: Closed Hand (Using Grab with tint or scale for now) */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "grabbing" ? 1 : 0, scale: 0.9 }}>
            <Grab size={16} className="fill-white" /> 
          </motion.div>

          {/* ZOOM IN */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "zoom-in" ? 1 : 0 }}>
            <ZoomIn size={16} />
          </motion.div>

          {/* ZOOM OUT */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "zoom-out" ? 1 : 0 }}>
            <ZoomOut size={16} />
          </motion.div>

          {/* COPY */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "copy" ? 1 : 0 }}>
            <Copy size={14} />
          </motion.div>
          
          {/* MOVE */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "move" ? 1 : 0 }}>
            <Move size={16} />
          </motion.div>

          {/* RESIZE ARROWS */}
          {/* Vertical (Y) */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "resize-y" ? 1 : 0 }}>
             <div className="h-4 w-[1px] bg-white relative">
               <div className="absolute -top-1 -left-1 border-b-4 border-x-4 border-x-transparent border-b-white" />
               <div className="absolute -bottom-1 -left-1 border-t-4 border-x-4 border-x-transparent border-t-white" />
             </div>
          </motion.div>

          {/* Horizontal (X) */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "resize-x" ? 1 : 0 }}>
             <div className="w-4 h-[1px] bg-white relative">
               <div className="absolute -left-1 -top-1 border-r-4 border-y-4 border-y-transparent border-r-white" />
               <div className="absolute -right-1 -top-1 border-l-4 border-y-4 border-y-transparent border-l-white" />
             </div>
          </motion.div>

          {/* Diagonal 1 (NE-SW) */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "resize-d1" ? 1 : 0, rotate: 45 }}>
             <div className="h-4 w-[1px] bg-white relative">
               <div className="absolute -top-1 -left-1 border-b-4 border-x-4 border-x-transparent border-b-white" />
               <div className="absolute -bottom-1 -left-1 border-t-4 border-x-4 border-x-transparent border-t-white" />
             </div>
          </motion.div>
          
          {/* Diagonal 2 (NW-SE) */}
          <motion.div className="absolute inset-0 flex items-center justify-center text-white"
             initial={false} animate={{ opacity: cursorType === "resize-d2" ? 1 : 0, rotate: -45 }}>
             <div className="h-4 w-[1px] bg-white relative">
               <div className="absolute -top-1 -left-1 border-b-4 border-x-4 border-x-transparent border-b-white" />
               <div className="absolute -bottom-1 -left-1 border-t-4 border-x-4 border-x-transparent border-t-white" />
             </div>
          </motion.div>

          {/* CLICK RIPPLE */}
          <AnimatePresence>
            {isClicking && (
              <motion.div
                className="absolute inset-0 border border-white rounded-full"
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      {/* COORDINATES LABEL - Improved Visibility */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] text-[9px] font-mono font-bold text-white whitespace-nowrap"
        animate={{
          x: mousePosition.x + 24,
          y: mousePosition.y + 24,
        }}
        transition={{ duration: 0 }}
      >
        <div className="backdrop-blur-md bg-black/70 border border-white/20 px-3 py-1.5 rounded-br-xl rounded-tr-md rounded-bl-md shadow-xl flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="opacity-50">POS</span>
            <span>{mousePosition.x.toString().padStart(4, '0')}:{mousePosition.y.toString().padStart(4, '0')}</span>
          </div>
          <div className="h-[1px] w-full bg-white/20" />
          <div className="flex items-center gap-2">
             <span className="opacity-50">STATE</span>
             <span className="text-accent uppercase tracking-wider">{cursorType.replace('-', ' ')}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Use motion values for better performance
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for smooth following
  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor - brutalist crosshair */}
      <motion.div
        className="custom-cursor no-print"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Crosshair design */}
        <motion.div
          className="relative w-6 h-6"
          animate={{
            scale: isClicking ? 0.8 : isPointer ? 1.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Terminal-style cursor - ASCII aesthetic with stroke outline */}
          <div
            className="absolute top-1/2 left-1/2 font-mono font-black leading-none select-none text-primary"
            style={{
              transform: "translate(-50%, -50%)",
              fontSize: isPointer ? "22px" : "20px",
              WebkitTextStroke: "2px hsl(var(--background))",
              paintOrder: "stroke fill",
            }}
          >
            {isClicking ? "◆" : isPointer ? "+" : "×"}
          </div>
          {/* Corner brackets when hovering */}
          {isPointer && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.div
                className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;

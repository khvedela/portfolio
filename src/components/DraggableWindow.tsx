import { useState, useRef, useEffect, ReactNode } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";

interface DraggableWindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  zIndex?: number;
  isMinimized?: boolean;
  onFocus?: () => void;
  variant?: "brutalist" | "linux";
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const DraggableWindow = ({
  title,
  onClose,
  children,
  initialX = 100,
  initialY = 100,
  width = 400,
  height = 500,
  zIndex = 10000,
  isMinimized = false,
  onFocus,
  variant = "brutalist",
}: DraggableWindowProps) => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState({
    x: initialX,
    y: initialY,
  });
  const [prevSize, setPrevSize] = useState({ width, height });
  const dragRef = useRef<{ startX: number; startY: number }>({
    startX: 0,
    startY: 0,
  });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      dragRef.current = { startX: e.clientX, startY: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY };
  };

  const toggleMaximize = () => {
    if (isMobile) return; // No maximize on mobile (always fullscreen)
    if (isMaximized) {
      setPosition(prevPosition);
      setIsMaximized(false);
    } else {
      setPrevPosition(position);
      setPrevSize({ width, height });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  // Auto-maximize on mobile
  useEffect(() => {
    if (isMobile && !isMaximized) {
      setPrevPosition(position);
      setPrevSize({ width, height });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    } else if (!isMobile && isMaximized && prevPosition.x !== 0) {
      // Restore position when switching back to desktop
      setPosition(prevPosition);
      setIsMaximized(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const isLinux = variant === "linux";

  return (
    <div
      ref={windowRef}
      onMouseDownCapture={onFocus}
      className={`fixed z-[10000] flex flex-col overflow-hidden ${
        isLinux 
          ? "bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl text-white" 
          : "bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      }`}
      style={{
        left: isMaximized || isMobile ? 0 : position.x,
        top: isMaximized || isMobile ? 0 : position.y,
        width: isMaximized || isMobile ? "100vw" : width,
        height: isMaximized || isMobile ? "100vh" : height,
        transition: isMaximized ? "all 0.2s ease" : "none",
        zIndex: zIndex,
        display: isMinimized ? "none" : "flex",
      }}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between select-none shrink-0 ${
          isLinux 
            ? "bg-[#3d3d3d] border-b border-white/10 px-4 py-2 rounded-t-lg" 
            : "bg-primary text-primary-foreground px-3 py-2 border-b-4 border-foreground"
        } ${isMobile ? "cursor-default" : "cursor-move"}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {/* Linux: Icon could go here */}
          <span className={`font-bold text-sm tracking-wider ${isLinux ? "font-sans text-gray-200" : "uppercase"}`}>
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={toggleMaximize}
              className={`transition-colors p-1 ${
                isLinux ? "hover:bg-white/10 rounded-full" : "hover:bg-foreground/20"
              }`}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
          <button
            onClick={onClose}
            className={`transition-colors p-1 ${
              isLinux ? "hover:bg-red-500/80 hover:text-white rounded-full" : "hover:bg-destructive"
            }`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`overflow-auto flex-1 p-4 ${isLinux ? "bg-[#1e1e1e] text-gray-200" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;

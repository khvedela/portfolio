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
}

const DraggableWindow = ({
  title,
  onClose,
  children,
  initialX = 100,
  initialY = 100,
  width = 400,
  height = 500,
}: DraggableWindowProps) => {
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
    if (isMaximized) return;
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY };
  };

  const toggleMaximize = () => {
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

  return (
    <div
      ref={windowRef}
      className="fixed bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-[10000]"
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100vw" : width,
        height: isMaximized ? "100vh" : height,
        transition: isMaximized ? "all 0.2s ease" : "none",
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-primary text-primary-foreground px-3 py-2 flex items-center justify-between border-b-4 border-foreground cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="font-bold text-sm uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMaximize}
            className="hover:bg-foreground/20 p-1 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="hover:bg-destructive p-1 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-auto h-[calc(100%-44px)] p-4">{children}</div>
    </div>
  );
};

export default DraggableWindow;

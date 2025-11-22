import { useState, useEffect, useRef } from "react";
import { Taskbar } from "@/components/desktop/Taskbar";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { StartMenu } from "@/components/desktop/StartMenu";
import { LoginScreen } from "@/components/desktop/LoginScreen";
import { SystemMonitor } from "@/components/desktop/SystemMonitor";
import DraggableWindow from "@/components/DraggableWindow";
import { TerminalContent } from "@/components/TerminalContent";
import FileExplorer from "@/components/FileExplorer";
import { Folder, Terminal, FileText, Trash2, HardDrive, User, FileCode, Code2 } from "lucide-react";
import { initialFileSystem, FileNode } from "@/lib/fileSystem";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";

interface WindowState {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

const Desktop = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  
  // Selection Box State
  const [selectionBox, setSelectionBox] = useState<{startX: number, startY: number, endX: number, endY: number} | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const { toast } = useBrutalistToast();
  const [osMode, setOsMode] = useState<"corporate" | "hacker" | "rogue">("corporate");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Desktop Icons Logic - Moved up to be accessible
  const getDesktopItems = () => {
    const desktopFolder = initialFileSystem["desktop"];
    const trashFolder = { id: "trash", name: "Trash", type: "folder", icon: "trash" } as any;
    const terminalApp = { id: "terminal-app", name: "Terminal", type: "app", icon: "terminal" } as any;
    const computerApp = { id: "computer", name: "Home", type: "app", icon: "computer" } as any;
    const srcApp = { id: "src-code", name: "Source Code", type: "folder", icon: "src" } as any;

    // Standard items + actual files
    const items = [
        computerApp,
        terminalApp,
        srcApp,
        trashFolder,
        ...(desktopFolder.children || []).map(id => initialFileSystem[id])
    ];
    return items;
  };

  const items = getDesktopItems();

  const getIconComponent = (item: any) => {
    if (item.icon === "trash") return Trash2;
    if (item.icon === "terminal") return Terminal;
    if (item.icon === "computer") return User; // Changed to User to match Window Icon or HardDrive? 
    // Let's stick to HardDrive for consistency with previous intent
    if (item.icon === "computer") return HardDrive;
    if (item.icon === "src") return Code2;
    if (item.type === "folder") return Folder;
    if (item.name.endsWith("txt")) return FileText;
    return FileCode;
  };

  useEffect(() => {
    // Determine OS Mode
    const modes: ("corporate" | "hacker" | "rogue")[] = ["corporate", "hacker", "rogue"];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    setOsMode(randomMode);

    // Fake Update Manager
    const updates = [
      "v2.2.1 — Improved patience by 8%",
      "v2.3.0 — Removed procrastination (rollback likely)",
      "v2.4.0 — Optimizing caffeine intake...",
      "v2.5.0 — Defragmenting social skills...",
      "v2.6.0 — Downloading more RAM..."
    ];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 45s
        const update = updates[Math.floor(Math.random() * updates.length)];
        toast({
          title: "System Update",
          description: update,
          duration: 4000,
        });
      }
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const getWallpaperGradient = () => {
    switch (osMode) {
      case "hacker": return "from-green-900 via-black to-black";
      case "rogue": return "from-red-900 via-black to-gray-900";
      default: return "from-[#0f2027] via-[#203a43] to-[#2c5364]";
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const openWindow = (id: string, title: string, icon: any, content: React.ReactNode) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        const newZ = nextZIndex + 1;
        setNextZIndex(newZ);
        setActiveWindow(id);
        return prev.map((w) => 
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ } : w
        );
      }
      const newZ = nextZIndex + 1;
      setNextZIndex(newZ);
      setActiveWindow(id);
      return [
        ...prev,
        {
          id,
          title,
          icon,
          content,
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile, 
          x: isMobile ? 0 : 100 + (prev.length * 30) % 300,
          y: isMobile ? 0 : 80 + (prev.length * 30) % 300,
          width: isMobile ? window.innerWidth : 800,
          height: isMobile ? window.innerHeight : 600,
          zIndex: newZ,
        },
      ];
    });
  };

  const handleOpenFile = (file: FileNode) => {
    if (file.type === "file") {
      openWindow(
        `file-${file.id}`, 
        file.name, 
        FileText, 
        <div className="p-4 font-mono whitespace-pre-wrap text-sm text-gray-300 bg-[#1e1e1e] h-full overflow-auto selection:bg-blue-500 selection:text-white">
          {file.content || "Binary content not displayed."}
        </div>
      );
    } else if (file.type === "folder") {
       openWindow(
         `folder-${file.id}`,
         file.name,
         Folder,
         <FileExplorer initialPath={file.id} onOpenFile={handleOpenFile} />
       );
    }
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) => prev.map((w) => {
      if (w.id === id) {
        const newMinimized = !w.isMinimized;
        if (!newMinimized) {
          setActiveWindow(id);
          return { ...w, isMinimized: false, zIndex: nextZIndex + 1 };
        }
        return { ...w, isMinimized: true };
      }
      return w;
    }));
    if (!windows.find(w => w.id === id)?.isMinimized) setNextZIndex(z => z + 1);
  };

  const focusWindow = (id: string) => {
    setNextZIndex(z => z + 1);
    setWindows((prev) => prev.map((w) => 
      w.id === id ? { ...w, zIndex: nextZIndex + 1 } : w
    ));
    setActiveWindow(id);
  };

  const handleIconDoubleClick = (item: any) => {
    if (item.id === "terminal-app") {
        openWindow("terminal", "Terminal", Terminal, <TerminalContent isEmbedded />);
    } else if (item.id === "computer") {
        openWindow("computer", "Home", User, <FileExplorer initialPath="guest" onOpenFile={handleOpenFile} />);
    } else if (item.id === "src-code") {
        openWindow("src-viewer", "Source Code", Code2, <FileExplorer initialPath="src" onOpenFile={handleOpenFile} />);
    } else if (item.id === "trash") {
        openWindow("trash", "Trash", Trash2, <FileExplorer initialPath="trash" onOpenFile={handleOpenFile} />);
    } else {
        handleOpenFile(item);
    }
  };


  // Selection Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return; 
    if (e.target !== desktopRef.current) return; // Strict check is fine if children preventDefault
    setStartOpen(false);
    setSelectedIcons(new Set()); 
    
    const rect = desktopRef.current.getBoundingClientRect();
    setSelectionBox({
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Update mouse pos for LIDAR
    setMousePos({ x: e.clientX, y: e.clientY });

    if (!selectionBox) return;
    const rect = desktopRef.current!.getBoundingClientRect();
    setSelectionBox(prev => ({
        ...prev!,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top
    }));
  };

  const handleMouseUp = () => {
    if (selectionBox) {
        const boxLeft = Math.min(selectionBox.startX, selectionBox.endX);
        const boxRight = Math.max(selectionBox.startX, selectionBox.endX);
        const boxTop = Math.min(selectionBox.startY, selectionBox.endY);
        const boxBottom = Math.max(selectionBox.startY, selectionBox.endY);

        const newSelection = new Set<string>();
        items.forEach((item, index) => {
            let x, y;
            if (isMobile) {
                x = 20 + (index % 3) * 100; 
                y = 60 + Math.floor(index / 3) * 100;
            } else {
                x = 20 + Math.floor(index / 6) * 100; 
                y = 60 + (index % 6) * 100;
            }
            
            const iconCX = x + 48; 
            const iconCY = y + 40;

            if (iconCX >= boxLeft && iconCX <= boxRight && iconCY >= boxTop && iconCY <= boxBottom) {
                newSelection.add(item.id);
            }
        });
        
        if (newSelection.size > 0) setSelectedIcons(newSelection);
        setSelectionBox(null);
    }
  };

  return (
    <div 
      ref={desktopRef}
      className="fixed inset-0 bg-[#0f0f0f] overflow-hidden font-sans selection:bg-blue-500 selection:text-white select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={(e) => {
        if (e.target === desktopRef.current) setStartOpen(false);
      }}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
    >
      {/* Wallpaper Layer 1: Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getWallpaperGradient()} transition-colors duration-1000 pointer-events-none`} />
      
      {/* Wallpaper Layer 2: Image (Corporate/Default) */}
      {osMode === "corporate" && (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-50 pointer-events-none mix-blend-overlay" />
      )}

      {/* Wallpaper Layer 3: LIDAR Circuit (Rogue/Hacker) */}
      {(osMode === "hacker" || osMode === "rogue") && (
        <div 
          className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/circuit-board-seamless-pattern_1017-14372.jpg')] opacity-30 pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black, transparent)",
            WebkitMaskImage: "radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black, transparent)",
          }}
        />
      )}
      
      {/* System Monitor */}
      {!isMobile && <SystemMonitor />}

      {/* Desktop Icons - Responsive Layout */}
      {items.map((item, index) => {
        let x, y;
        if (isMobile) {
            // Mobile Grid: 3 columns, tighter spacing
            x = 10 + (index % 3) * 90; 
            y = 60 + Math.floor(index / 3) * 100;
        } else {
            // Desktop Grid: Column major
            x = 20 + Math.floor(index / 6) * 100; 
            y = 60 + (index % 6) * 100;
        }

        return (
          <DesktopIcon
            key={item.id}
            id={item.id}
            label={item.name}
            icon={getIconComponent(item)}
            x={x} 
            y={y}
            onDoubleClick={() => handleIconDoubleClick(item)}
            isSelected={selectedIcons.has(item.id)}
            onSelect={(id) => setSelectedIcons(new Set([id]))} 
          />
        );
      })}

      {/* Selection Box */}
      {selectionBox && (
        <div 
            className="absolute border border-blue-400 bg-blue-500/20 pointer-events-none z-50"
            style={{
                left: Math.min(selectionBox.startX, selectionBox.endX),
                top: Math.min(selectionBox.startY, selectionBox.endY),
                width: Math.abs(selectionBox.endX - selectionBox.startX),
                height: Math.abs(selectionBox.endY - selectionBox.startY)
            }}
        />
      )}

      {/* Windows */}
      {windows.map((win) => (
        <DraggableWindow
          key={win.id}
          title={win.title}
          variant="linux"
          onClose={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          zIndex={win.zIndex}
          isMinimized={win.isMinimized}
          initialX={win.x}
          initialY={win.y}
          width={win.width}
          height={win.height}
        >
          {win.content}
        </DraggableWindow>
      ))}

      {/* UI Overlay */}
      <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} />
      <Taskbar 
        openWindows={windows.filter(w => w.isOpen)} 
        activeWindow={activeWindow} 
        onWindowClick={toggleMinimize}
        onStartClick={() => setStartOpen(!startOpen)}
        startOpen={startOpen}
      />
    </div>
  );
};

export default Desktop;

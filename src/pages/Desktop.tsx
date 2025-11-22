import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Taskbar } from "@/components/desktop/Taskbar";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { StartMenu } from "@/components/desktop/StartMenu";
import { LoginScreen } from "@/components/desktop/LoginScreen";
import { SystemMonitor } from "@/components/desktop/SystemMonitor";
import DraggableWindow from "@/components/DraggableWindow";
import { TerminalContent } from "@/components/TerminalContent";
import FileExplorer from "@/components/FileExplorer";
import { BrowserApp } from "@/components/desktop/BrowserApp";
import { Folder, Terminal, FileText, Trash2, HardDrive, User, FileCode, Code2, Globe, Settings } from "lucide-react";
import { initialFileSystem, FileNode } from "@/lib/fileSystem";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

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

// Move static helpers outside to avoid recreation
const getIconComponent = (item: any) => {
  if (item.icon === "trash") return Trash2;
  if (item.icon === "terminal") return Terminal;
  if (item.icon === "computer") return HardDrive;
  if (item.icon === "src") return Code2;
  if (item.type === "folder") return Folder;
  if (item.name.endsWith("txt")) return FileText;
  return FileCode;
};

// Calculate items once (or useMemo inside if it depended on props, but here it's static)
const getDesktopItems = () => {
  const desktopFolder = initialFileSystem["desktop"];
  const trashFolder = { id: "trash", name: "Trash", type: "folder", icon: "trash" };
  const terminalApp = { id: "terminal-app", name: "Terminal", type: "app", icon: "terminal" };
  const computerApp = { id: "computer", name: "Home", type: "app", icon: "computer" };
  const srcApp = { id: "src-code", name: "Source Code", type: "folder", icon: "src" };

  return [
      computerApp,
      terminalApp,
      srcApp,
      trashFolder,
      ...(desktopFolder.children || []).map(id => initialFileSystem[id])
  ];
};

const ITEMS = getDesktopItems();

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
  const { toast } = useToast();
  const [osMode, setOsMode] = useState<"corporate" | "hacker" | "rogue">("corporate");

  // Memoize items to ensure stability (though moving it out is even better)
  const items = useMemo(() => ITEMS, []);

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
  }, [toast]);

  const getWallpaperGradient = useCallback(() => {
    switch (osMode) {
      case "hacker": return "from-green-900 via-black to-black";
      case "rogue": return "from-red-900 via-black to-gray-900";
      default: return "from-[#0f2027] via-[#203a43] to-[#2c5364]";
    }
  }, [osMode]);

  const openWindow = useCallback((id: string, title: string, icon: any, content: React.ReactNode) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        const newZ = nextZIndex + 1; // Use callback ref if needed, but here we access state? No, nextZIndex is state.
        // Ideally track zIndex in ref or state. Here we rely on state update.
        // To avoid closure stale state issues, best to use functional update for everything.
        // But nextZIndex is external to this functional update.
        // Let's fix zIndex incrementing properly.
        return prev.map((w) => 
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: 9999 } : w // Placeholder Z, effectively handled by focusWindow
        );
      }
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
          zIndex: 100, // Initial Z
        },
      ];
    });
    // Trigger focus immediately after
    setTimeout(() => {
        setNextZIndex(z => {
            setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: z + 1 } : w));
            setActiveWindow(id);
            return z + 1;
        });
    }, 0);
  }, [isMobile]); // Removed nextZIndex from dependency to avoid recreation, handled via setter

  const handleOpenFile = useCallback((file: FileNode) => {
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
  }, [openWindow]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindow(prev => prev === id ? null : prev);
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => {
      if (w.id === id) {
        return { ...w, isMinimized: !w.isMinimized };
      }
      return w;
    }));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setNextZIndex(z => {
        const newZ = z + 1;
        setWindows((prev) => prev.map((w) => 
          w.id === id ? { ...w, zIndex: newZ } : w
        ));
        return newZ;
    });
    setActiveWindow(id);
  }, []);

  const handleLaunch = useCallback((appId: string) => {
      switch (appId) {
          case "terminal":
              openWindow("terminal", "Terminal", Terminal, <TerminalContent isEmbedded />);
              break;
          case "computer":
              openWindow("computer", "Home", User, <FileExplorer initialPath="guest" onOpenFile={handleOpenFile} />);
              break;
          case "browser":
              openWindow("browser", "Web Browser", Globe, <BrowserApp />);
              break;
          case "editor":
              openWindow("editor", "Text Editor", FileText, (
                  <textarea className="w-full h-full bg-[#1e1e1e] text-gray-200 p-4 font-mono resize-none outline-none" placeholder="Type here..." />
              ));
              break;
          case "settings":
              openWindow("settings", "Settings", Settings, (
                  <div className="p-8 text-gray-300">
                      <h2 className="text-2xl font-bold mb-4">Settings</h2>
                      <p>OS Version: DK_OS v4.0.0</p>
                      <p>Kernel: Neural Net v9.1</p>
                      <div className="mt-4 p-4 bg-white/5 rounded">
                          <label className="flex items-center gap-2">
                              <input type="checkbox" checked disabled />
                              <span>Enable God Mode</span>
                          </label>
                      </div>
                  </div>
              ));
              break;
      }
    }, [openWindow, handleOpenFile]);

  const handleIconDoubleClick = useCallback((item: any) => {
    if (item.id === "terminal-app") handleLaunch("terminal");
    else if (item.id === "computer") handleLaunch("computer");
    else if (item.id === "src-code") openWindow("src-viewer", "Source Code", Code2, <FileExplorer initialPath="src" onOpenFile={handleOpenFile} />);
    else if (item.id === "trash") openWindow("trash", "Trash", Trash2, <FileExplorer initialPath="trash" onOpenFile={handleOpenFile} />);
    else handleOpenFile(item);
  }, [handleLaunch, openWindow, handleOpenFile]);

  // Selection Logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMobile) return; 
    if (e.target !== desktopRef.current) return; 
    setStartOpen(false);
    setSelectedIcons(new Set()); 
    
    const rect = desktopRef.current.getBoundingClientRect();
    setSelectionBox({
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top
    });
  }, [isMobile]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // PERFORMANCE FIX: Update CSS var directly, do NOT trigger React state update
    if (desktopRef.current) {
        desktopRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        desktopRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
    }

    if (!selectionBox) return;
    const rect = desktopRef.current!.getBoundingClientRect();
    setSelectionBox(prev => {
        if (!prev) return null;
        return {
            ...prev,
            endX: e.clientX - rect.left,
            endY: e.clientY - rect.top
        };
    });
  }, [selectionBox]);

  const handleMouseUp = useCallback(() => {
    if (selectionBox) {
        const boxLeft = Math.min(selectionBox.startX, selectionBox.endX);
        const boxRight = Math.max(selectionBox.startX, selectionBox.endX);
        const boxTop = Math.min(selectionBox.startY, selectionBox.endY);
        const boxBottom = Math.max(selectionBox.startY, selectionBox.endY);

        const newSelection = new Set<string>();
        items.forEach((item, index) => {
            let x, y;
            if (isMobile) {
                x = 10 + (index % 3) * 90; 
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
  }, [selectionBox, items, isMobile]);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

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
      // Initial vars to avoid undefined transition
      style={{
        "--mouse-x": `50%`,
        "--mouse-y": `50%`,
      } as React.CSSProperties}
    >
      {/* Wallpaper Layer 1: Base */}
      <div className={`absolute inset-0 bg-black transition-colors duration-1000 pointer-events-none`} />
      
      {/* Wallpaper Layer 2: Corporate Image */}
      {osMode === "corporate" && (
        <>
             <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] pointer-events-none" />
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-50 pointer-events-none mix-blend-overlay" />
        </>
      )}

      {/* Wallpaper Layer 3: Hacker/Rogue Grid + Glow */}
      {(osMode === "hacker" || osMode === "rogue") && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(${osMode === 'rogue' ? '#500' : '#050'} 1px, transparent 1px), linear-gradient(90deg, ${osMode === 'rogue' ? '#500' : '#050'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            {/* Mouse Glow */}
            <div 
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${osMode === 'rogue' ? 'rgba(255,0,0,0.15)' : 'rgba(0,255,0,0.15)'}, transparent 40%)`
                }}
            />
        </div>
      )}
      
      {/* System Monitor */}
      {!isMobile && <SystemMonitor />}

      {/* Desktop Icons - Responsive Layout */}
      {items.map((item, index) => {
        let x, y;
        if (isMobile) {
            x = 10 + (index % 3) * 90; 
            y = 60 + Math.floor(index / 3) * 100;
        } else {
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
            isMobile={isMobile}
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
      <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} onLaunch={handleLaunch} />
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
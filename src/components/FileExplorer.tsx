import { useState, useEffect } from "react";
import { Folder, FileText, ArrowLeft, ArrowUp, HardDrive, Image, Music, Video } from "lucide-react";
import { initialFileSystem, FileNode } from "@/lib/fileSystem";

interface FileExplorerProps {
  initialPath?: string;
  onOpenFile: (file: FileNode) => void;
}

const FileExplorer = ({ initialPath = "guest", onOpenFile }: FileExplorerProps) => {
  const [currentPath, setCurrentPath] = useState<string[]>(["root", "home", "guest"]);
  const [history, setHistory] = useState<string[][]>([["root", "home", "guest"]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [fs, setFs] = useState(initialFileSystem);

  const currentDirId = currentPath[currentPath.length - 1];
  const currentDir = fs[currentDirId];

  const navigate = (folderId: string) => {
    const newPath = [...currentPath, folderId];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(newPath);
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      const newPath = currentPath.slice(0, -1);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newPath);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentPath(newPath);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const handleItemClick = (item: FileNode) => {
    if (item.type === "folder") {
      navigate(item.id);
    } else {
      onOpenFile(item);
    }
  };

  const getIcon = (item: FileNode) => {
    if (item.type === "folder") return Folder;
    if (item.name.endsWith(".png") || item.name.endsWith(".jpg")) return Image;
    return FileText;
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-200 font-sans">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-[#2d2d2d]">
        <button onClick={goBack} disabled={historyIndex === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30">
          <ArrowLeft size={16} />
        </button>
        <button onClick={navigateUp} disabled={currentPath.length <= 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30">
          <ArrowUp size={16} />
        </button>
        
        {/* Breadcrumbs */}
        <div className="flex-1 flex items-center gap-1 bg-[#1a1a1a] px-3 py-1 rounded text-sm overflow-x-auto">
           {currentPath.map((id, i) => (
             <span key={i} className="flex items-center">
               <span className="hover:underline cursor-pointer" onClick={() => {
                 // Navigate to this part of path
                 const newPath = currentPath.slice(0, i + 1);
                 setCurrentPath(newPath);
               }}>
                 {fs[id]?.name || id}
               </span>
               {i < currentPath.length - 1 && <span className="mx-1 text-gray-500">/</span>}
             </span>
           ))}
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 overflow-auto p-4 grid grid-cols-4 md:grid-cols-5 gap-4 content-start">
        {currentDir?.children?.map(childId => {
          const item = fs[childId];
          if (!item) return null;
          const Icon = getIcon(item);
          
          return (
            <div 
              key={childId}
              onDoubleClick={() => handleItemClick(item)}
              className="flex flex-col items-center gap-2 p-2 hover:bg-blue-500/20 rounded border border-transparent hover:border-blue-500/50 cursor-pointer group"
            >
              <Icon size={48} className={`text-gray-400 group-hover:text-blue-400 fill-current ${item.type === 'folder' ? 'text-blue-300' : ''}`} />
              <span className="text-xs text-center break-words w-full line-clamp-2 select-none">
                {item.name}
              </span>
            </div>
          );
        })}
        
        {(!currentDir?.children || currentDir.children.length === 0) && (
          <div className="col-span-full text-center text-gray-500 mt-10 italic">
            This folder is empty.
          </div>
        )}
      </div>
      
      {/* Status Bar */}
      <div className="bg-[#2d2d2d] border-t border-white/10 px-4 py-1 text-xs text-gray-500 flex justify-between">
        <span>{currentDir?.children?.length || 0} items</span>
        <span>Free space: 42TB</span>
      </div>
    </div>
  );
};

export default FileExplorer;

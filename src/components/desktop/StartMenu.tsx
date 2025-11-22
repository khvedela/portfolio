import { motion, AnimatePresence } from "framer-motion";
import { Folder, Terminal, FileText, Trash2, HardDrive, User, FileCode, Code2, Globe, Settings, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunch: (appId: string) => void;
}

export const StartMenu = ({ isOpen, onClose, onLaunch }: StartMenuProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const menuItems = [
    { id: "terminal", label: "Terminal", icon: Terminal, category: "System" },
    { id: "computer", label: "File Manager", icon: Folder, category: "System" },
    { id: "browser", label: "Web Browser", icon: Globe, category: "Internet" },
    { id: "editor", label: "Text Editor", icon: FileText, category: "Accessories" },
    { id: "settings", label: "Settings", icon: Settings, category: "System" },
  ];

  const filteredItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-10 left-2 w-80 bg-[#1e1e1e]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-[10001] flex flex-col overflow-hidden font-sans text-gray-200"
        >
          {/* Search */}
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Type to search..." 
                className="w-full bg-black/30 border border-white/10 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {/* App Grid */}
          <div className="p-2 max-h-[400px] overflow-y-auto">
            <div className="text-xs font-bold text-gray-500 px-2 py-1 mb-1 uppercase tracking-wider">Applications</div>
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onLaunch(item.id); onClose(); }}
                className="w-full flex items-center gap-3 p-2 hover:bg-blue-600 hover:text-white rounded-md transition-colors text-sm group text-left"
              >
                <item.icon size={18} className="text-gray-400 group-hover:text-white" />
                <span>{item.label}</span>
              </button>
            ))}
            {filteredItems.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">No applications found.</div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto bg-black/20 p-3 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span>Guest User</span>
            </div>
            <button
              onClick={() => { onClose(); navigate("/"); }}
              className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
              title="Log Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

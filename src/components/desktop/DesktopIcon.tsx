import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Square, Minus, Folder, Terminal, FileText, Globe, Trash2, Image, Settings, HardDrive } from "lucide-react";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: any;
  x: number;
  y: number;
  onDoubleClick: () => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isMobile?: boolean;
}

export const DesktopIcon = ({ id, label, icon: Icon, x, y, onDoubleClick, isSelected, onSelect, isMobile }: DesktopIconProps) => {
  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      initial={{ x, y }}
      className={`absolute flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group border border-transparent rounded ${isSelected ? "bg-blue-500/30 border-blue-400/50" : "hover:bg-white/5 hover:border-white/10"}`}
      onClick={(e) => { 
        e.stopPropagation(); 
        if (isMobile) {
          onDoubleClick();
        } else {
          onSelect(id);
        }
      }}
      onDoubleClick={(e) => {
        if (!isMobile) {
          e.stopPropagation();
          onDoubleClick();
        }
      }}
      onDragStart={() => onSelect(id)}
    >
      <div className="relative">
        <Icon size={48} className={`transition-colors ${isSelected ? "text-blue-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" : "text-gray-200 drop-shadow-md"}`} strokeWidth={1.5} />
      </div>
      <span className={`text-xs font-sans text-center break-words w-full px-1 rounded ${isSelected ? "bg-blue-600 text-white" : "text-gray-100 drop-shadow-md bg-black/20"}`}>
        {label}
      </span>
    </motion.div>
  );
};
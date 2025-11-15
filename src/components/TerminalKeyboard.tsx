import { motion } from "framer-motion";
import { Delete, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-react";

interface TerminalKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
  onTab: () => void;
}

const TerminalKeyboard = ({
  onKeyPress,
  onBackspace,
  onEnter,
  onArrowUp,
  onArrowDown,
  onTab,
}: TerminalKeyboardProps) => {
  const commonKeys = [
    ["help", "clear", "about"],
    ["skills", "snake", "typing"],
    ["ls", "cat", "pwd"],
  ];

  const charKeys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const KeyButton = ({
    children,
    onClick,
    className = "",
    wide = false,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    wide?: boolean;
  }) => (
    <motion.button
      type="button"
      onClick={onClick}
      className={`bg-foreground/10 border-2 border-foreground/30 text-foreground font-mono font-bold text-xs uppercase tracking-wide active:bg-primary active:text-primary-foreground transition-colors ${
        wide ? "flex-1" : "min-w-[28px]"
      } h-10 flex items-center justify-center ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="bg-background border-t-4 border-foreground p-2 space-y-2">
      {/* Command shortcuts row */}
      <div className="grid grid-cols-3 gap-1">
        {commonKeys.map((row, rowIndex) =>
          row.map((cmd, index) => (
            <KeyButton
              key={`${rowIndex}-${index}`}
              onClick={() => onKeyPress(cmd)}
              className="text-[10px] text-primary"
            >
              {cmd}
            </KeyButton>
          ))
        )}
      </div>

      {/* Character keys */}
      {charKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((char) => (
            <KeyButton key={char} onClick={() => onKeyPress(char)}>
              {char}
            </KeyButton>
          ))}
        </div>
      ))}

      {/* Bottom row with special keys */}
      <div className="flex gap-1">
        <KeyButton onClick={onTab} className="text-accent">
          Tab
        </KeyButton>
        <KeyButton onClick={onArrowUp}>
          <ArrowUp size={14} />
        </KeyButton>
        <KeyButton onClick={onArrowDown}>
          <ArrowDown size={14} />
        </KeyButton>
        <KeyButton onClick={() => onKeyPress(" ")} wide>
          Space
        </KeyButton>
        <KeyButton
          onClick={() => onKeyPress(".")}
          className="text-muted-foreground"
        >
          .
        </KeyButton>
        <KeyButton
          onClick={() => onKeyPress("-")}
          className="text-muted-foreground"
        >
          -
        </KeyButton>
        <KeyButton onClick={onBackspace}>
          <Delete size={14} />
        </KeyButton>
        <KeyButton onClick={onEnter} className="bg-accent/20 border-accent">
          <CornerDownLeft size={14} />
        </KeyButton>
      </div>
    </div>
  );
};

export default TerminalKeyboard;

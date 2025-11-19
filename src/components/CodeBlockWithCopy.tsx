import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockWithCopyProps {
  code: string;
  language: string;
  children: React.ReactNode;
}

const CodeBlockWithCopy = ({
  code,
  language,
  children,
}: CodeBlockWithCopyProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {/* Language badge and copy button */}
      <div className="absolute top-0 right-0 flex items-center gap-2 z-10">
        <span className="bg-foreground text-background px-3 py-1 text-xs font-mono font-bold">
          {language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          className="bg-foreground text-background px-3 py-1 hover:bg-primary transition-colors flex items-center gap-2 font-mono text-xs font-bold"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>
      {children}
    </div>
  );
};

export default CodeBlockWithCopy;

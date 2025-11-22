import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/blog/posts";

interface LiveCodeBackgroundProps {
  isMatrix?: boolean;
}

const LiveCodeBackground = ({ isMatrix = false }: LiveCodeBackgroundProps) => {
  const [snippets, setSnippets] = useState<string[]>([]);

  useEffect(() => {
    if (isMatrix) {
      // Generate Matrix Rain Streams
      const matrixChars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.<|>";
      const streams = Array(15).fill(0).map(() => {
        return Array(50).fill(0).map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]).join("\n");
      });
      setSnippets(streams);
    } else {
      // Extract code blocks from blog posts
      const allCode = blogPosts.flatMap(post => {
        const content = post.content;
        const codeBlocks = content.match(/```[\s\S]*?```/g);
        if (codeBlocks) {
          return codeBlocks.map(block => 
            block.replace(/```\w*\n?|```/g, '') // Remove markdown fences
                 .split('\n')
                 .filter(line => line.trim().length > 0) // Remove empty lines
                 .join('\n')
          );
        }
        return [];
      });

      // If no code found (unlikely), add some fake code
      if (allCode.length === 0) {
        setSnippets([
          "function init() { console.log('System ready'); }",
          "const x = 10; const y = 20; return x + y;",
          "import { Component } from '@angular/core';",
          "@Component({ selector: 'app-root', template: '<div></div>' })"
        ]);
      } else {
        // Shuffle and pick a few
        setSnippets(allCode.sort(() => 0.5 - Math.random()).slice(0, 15));
      }
    }
  }, [isMatrix]);

  // Create columns of code
  const columns = useMemo(() => {
    if (snippets.length === 0) return [];
    
    // Create 3 columns (or more for Matrix)
    const colCount = isMatrix ? 5 : 3;
    const cols = Array(colCount).fill([]).map(() => [] as string[]);
    
    snippets.forEach((snippet, i) => {
      cols[i % colCount].push(snippet);
    });
    return cols;
  }, [snippets, isMatrix]);

  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-background transition-colors duration-500 ${isMatrix ? 'matrix-mode-bg' : ''}`}>
      <div className={`absolute inset-0 flex justify-between gap-8 p-8 font-mono text-xs leading-relaxed whitespace-pre transition-all duration-500
        ${isMatrix ? 'opacity-20 text-[#0F0] font-bold tracking-widest' : 'opacity-[0.03] dark:opacity-[0.05] text-foreground'}
      `}>
        
        {columns.map((colSnippets, i) => (
          <div key={i} className="flex-1 overflow-hidden relative">
            {/* Scrolling Container */}
            <motion.div
              animate={{ y: isMatrix ? [-1000, 0] : [0, -2000] }}
              transition={{ 
                repeat: Infinity, 
                duration: isMatrix ? 5 + (i * 2) : 40 + (i * 10), // Matrix is much faster
                ease: "linear" 
              }}
              className="absolute top-0 left-0 w-full"
            >
              {/* Repeat snippets to create loop */}
              {[...colSnippets, ...colSnippets, ...colSnippets].map((code, j) => (
                <div key={j} className={`mb-12 break-words ${isMatrix ? 'opacity-80' : 'opacity-70'}`}>
                  {code}
                </div>
              ))}
            </motion.div>
          </div>
        ))}

      </div>
      
      {/* Vignette overlay to fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
    </div>
  );
};

export default LiveCodeBackground;

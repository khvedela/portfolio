import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  animateOn?: "view" | "hover";
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const DecryptedText = ({ 
  text, 
  speed = 50, 
  maxIterations = 10, 
  className = "",
  animateOn = "view" 
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const iterations = useRef(0);

  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    iterations.current = 0;

    const interval = setInterval(() => {
      setDisplayText((currentText) => 
        text
          .split("")
          .map((char, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iterations.current += 1 / 3; // Adjust this to control "lock-in" speed vs scramble speed
    }, speed);
  };

  // Trigger on view
  useEffect(() => {
    if (animateOn === "view") {
      scramble();
    }
  }, [text]);

  return (
    <span 
      className={className} 
      onMouseEnter={animateOn === "hover" ? scramble : undefined}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;

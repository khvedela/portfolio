import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const useTextScramble = (targetText: string, start: boolean = true, speed: number = 30) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    if (!start) {
      setDisplayText("");
      return;
    }

    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 2; // Slower resolve for more glitch time
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, start, speed]);

  return displayText;
};

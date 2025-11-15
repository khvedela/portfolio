import { useState, useEffect, useRef } from "react";

interface TypingGameProps {
  onComplete: (wpm: number, accuracy: number) => void;
  onQuit: () => void;
}

const TerminalTypingGame = ({ onComplete, onQuit }: TypingGameProps) => {
  const phrases = [
    "the quick brown fox jumps over the lazy dog",
    "typescript is awesome for building scalable applications",
    "angular provides powerful tools for modern web development",
    "clean code is better than clever code",
    "debugging is twice as hard as writing code",
    "premature optimization is the root of all evil",
  ];

  const [phrase, setPhrase] = useState("");
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Select random phrase
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(randomPhrase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onQuit();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onQuit]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!started && value.length > 0) {
      setStarted(true);
      setStartTime(Date.now());
    }

    setInput(value);

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== phrase[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Calculate accuracy
    if (value.length > 0) {
      const acc = ((value.length - errorCount) / value.length) * 100;
      setAccuracy(Math.round(acc));
    }

    // Check if completed
    if (value === phrase) {
      setFinished(true);
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = phrase.split(" ").length;
      const calculatedWpm = Math.round(wordsTyped / timeElapsed);
      setWpm(calculatedWpm);

      setTimeout(() => {
        onComplete(calculatedWpm, accuracy);
      }, 1000);
    }
  };

  const getCharClass = (index: number) => {
    if (index >= input.length) return "text-muted-foreground";
    if (input[index] === phrase[index]) return "text-green-500";
    return "text-red-500 bg-red-500/20";
  };

  return (
    <div className="my-4 font-mono">
      <div className="mb-4">
        <div className="text-primary text-sm mb-2">⌨️ TYPING SPEED TEST</div>
        <div className="text-xs text-muted-foreground mb-4">
          Type the text below as fast and accurately as you can!
        </div>
      </div>

      {/* Display text to type */}
      <div className="border-3 border-foreground p-4 mb-4 bg-background/50">
        <div className="text-lg leading-relaxed tracking-wide">
          {phrase.split("").map((char, index) => (
            <span key={index} className={getCharClass(index)}>
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Input field */}
      <div className="border-2 border-foreground/50 p-3 mb-4 bg-background">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={finished}
          className="w-full bg-transparent outline-none text-foreground text-lg"
          placeholder="Start typing here..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
        <div className="border-2 border-foreground/20 p-2">
          <div className="text-muted-foreground text-xs">Progress</div>
          <div className="text-primary font-bold">
            {Math.round((input.length / phrase.length) * 100)}%
          </div>
        </div>
        <div className="border-2 border-foreground/20 p-2">
          <div className="text-muted-foreground text-xs">Accuracy</div>
          <div
            className={`font-bold ${
              accuracy >= 90
                ? "text-green-500"
                : accuracy >= 70
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {accuracy}%
          </div>
        </div>
        <div className="border-2 border-foreground/20 p-2">
          <div className="text-muted-foreground text-xs">Errors</div>
          <div className="text-red-500 font-bold">{errors}</div>
        </div>
      </div>

      {/* Results */}
      {finished && (
        <div className="border-3 border-green-500 p-4 bg-green-500/10 text-center">
          <div className="text-green-500 text-lg font-bold mb-2">
            ✓ COMPLETE!
          </div>
          <div className="text-foreground mb-1">Speed: {wpm} WPM</div>
          <div className="text-foreground mb-3">Accuracy: {accuracy}%</div>
          <div className="text-xs text-muted-foreground">
            Returning to terminal...
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground text-center">
        Press ESC to quit
      </div>
    </div>
  );
};

export default TerminalTypingGame;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lightbulb, Code2, Eye, EyeOff } from "lucide-react";
import { Exercise } from "@/courses/courses";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-markup";

// Custom Prism theme to match design system
const customPrismStyle = `
  code[class*="language-"],
  pre[class*="language-"] {
    color: #D4D4D4;
    text-shadow: none;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6A9955 !important;
  }
  .token.punctuation {
    color: #D4D4D4 !important;
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #4EC9B0 !important;
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #CE9178 !important;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #D4D4D4 !important;
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #C586C0 !important;
  }
  .token.function,
  .token.class-name {
    color: #DCDCAA !important;
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: #D16969 !important;
  }
`;

interface ExerciseCodeChallengeProps {
  exercise: Exercise;
  onComplete: () => void;
  isCompleted: boolean;
}

const ExerciseCodeChallenge = ({
  exercise,
  onComplete,
  isCompleted,
}: ExerciseCodeChallengeProps) => {
  const [userCode, setUserCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(isCompleted);

  useEffect(() => {
    // Inject custom Prism styles
    const styleEl = document.createElement("style");
    styleEl.innerHTML = customPrismStyle;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete();
  };

  const handleReset = () => {
    setUserCode("");
    setShowHint(false);
    setShowSolution(false);
    setSubmitted(false);
  };

  return (
    <motion.div
      className="border-4 border-foreground p-6 bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-8 h-8 bg-accent text-foreground flex items-center justify-center font-mono font-bold flex-shrink-0">
          <Code2 size={20} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg mb-2">{exercise.question}</p>
          <div className="flex gap-3 mt-3">
            {exercise.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm font-mono text-primary hover:underline flex items-center gap-1"
              >
                <Lightbulb size={14} />
                {showHint ? "Hide hint" : "Show hint"}
              </button>
            )}
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm font-mono text-muted-foreground hover:text-foreground hover:underline flex items-center gap-1"
            >
              {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
              {showSolution ? "Hide solution" : "Show solution"}
            </button>
          </div>
        </div>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && exercise.hint && (
          <motion.div
            className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className="text-sm">
              <strong className="text-yellow-700 dark:text-yellow-400">
                💡 Hint:
              </strong>{" "}
              {exercise.hint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Editor */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-mono font-bold">YOUR CODE:</label>
          {userCode && (
            <span className="text-xs font-mono text-muted-foreground">
              {userCode.split("\n").length} lines
            </span>
          )}
        </div>
        <div className="border-3 border-foreground bg-[#1e1e1e] overflow-hidden">
          <Editor
            value={userCode}
            onValueChange={setUserCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.markup, "markup")
            }
            padding={16}
            placeholder="<!-- Write your HTML code here... -->"
            style={{
              fontFamily:
                '"Fira Code", "JetBrains Mono", "Courier New", monospace',
              fontSize: 14,
              minHeight: "256px",
              backgroundColor: "#1e1e1e",
              color: "#D4D4D4",
              caretColor: "#fff",
            }}
            textareaClassName="focus:outline-none"
          />
        </div>
      </div>

      {/* Solution */}
      <AnimatePresence>
        {showSolution && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-mono font-bold text-primary">
                SOLUTION:
              </label>
              <button
                onClick={() => {
                  setUserCode(exercise.correctAnswer as string);
                }}
                className="text-xs font-mono text-primary hover:underline"
              >
                Copy to editor
              </button>
            </div>
            <div className="p-4 border-3 border-primary bg-[#1e1e1e] dark:bg-[#1e1e1e] font-mono text-sm overflow-x-auto [&_code]:text-[#D4D4D4]">
              <code
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    exercise.correctAnswer as string,
                    Prism.languages.markup,
                    "markup"
                  ),
                }}
              />
            </div>
            {exercise.explanation && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
                <p className="text-sm">
                  <strong className="text-blue-700 dark:text-blue-400">
                    Explanation:
                  </strong>{" "}
                  {exercise.explanation}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submitted Message */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="p-4 mb-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={24}
                className="text-green-500 flex-shrink-0"
              />
              <div>
                <p className="font-bold mb-2">✓ Exercise Completed!</p>
                <p className="text-sm text-foreground/80">
                  Great job! Review the solution above to compare approaches.
                  Remember, there can be multiple correct ways to solve a
                  problem.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-3">
        {!submitted ? (
          <>
            <motion.button
              onClick={handleSubmit}
              disabled={!userCode.trim()}
              className={`border-3 border-foreground font-mono font-bold px-6 py-3 transition-colors ${
                !userCode.trim()
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-foreground text-background hover:bg-background hover:text-foreground"
              }`}
              whileHover={userCode.trim() ? { scale: 1.02 } : {}}
              whileTap={userCode.trim() ? { scale: 0.98 } : {}}
            >
              Submit Solution
            </motion.button>
            <p className="text-xs text-muted-foreground flex items-center font-mono">
              This is a self-assessed exercise. Compare your code with the
              solution.
            </p>
          </>
        ) : (
          <motion.button
            onClick={handleReset}
            className="border-3 border-foreground bg-background text-foreground font-mono font-bold px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset Exercise
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ExerciseCodeChallenge;

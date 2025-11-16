import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Exercise } from "@/courses/courses";

interface ExerciseMultipleChoiceProps {
  exercise: Exercise;
  onComplete: () => void;
  isCompleted: boolean;
}

const ExerciseMultipleChoice = ({
  exercise,
  onComplete,
  isCompleted,
}: ExerciseMultipleChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(isCompleted);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);

    if (selectedAnswer === exercise.correctAnswer) {
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  };

  const isCorrect = selectedAnswer === exercise.correctAnswer;

  return (
    <motion.div
      className="border-4 border-foreground p-4 md:p-6 bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question */}
      <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="w-8 h-8 bg-primary text-background flex items-center justify-center font-mono font-bold flex-shrink-0">
          ?
        </div>
        <div className="flex-1">
          <p className="font-bold text-base md:text-lg mb-2">
            {exercise.question}
          </p>
          {exercise.hint && !showResult && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm font-mono text-primary hover:underline flex items-center gap-1 py-1 px-2 sm:p-0 -ml-2 sm:ml-0"
            >
              <Lightbulb size={16} />
              {showHint ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && !showResult && exercise.hint && (
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

      {/* Options */}
      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        {exercise.options?.map((option, index) => {
          const isThisCorrect = index === exercise.correctAnswer;
          const isSelected = selectedAnswer === index;

          let borderColor = "border-foreground/30";
          let bgColor = "bg-background";
          let icon = null;

          if (showResult) {
            if (isThisCorrect) {
              borderColor = "border-green-500";
              bgColor = "bg-green-50 dark:bg-green-900/20";
              icon = <CheckCircle2 size={20} className="text-green-500" />;
            } else if (isSelected && !isThisCorrect) {
              borderColor = "border-red-500";
              bgColor = "bg-red-50 dark:bg-red-900/20";
              icon = <XCircle size={20} className="text-red-500" />;
            }
          } else if (isSelected) {
            borderColor = "border-primary";
            bgColor = "bg-primary/5";
          }

          return (
            <motion.button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              onKeyDown={(e) => {
                if (!showResult && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setSelectedAnswer(index);
                }
              }}
              disabled={showResult}
              className={`w-full text-left p-3 md:p-4 border-3 ${borderColor} ${bgColor} transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:hover:shadow-none flex items-center gap-2 md:gap-3 group min-h-[48px] focus:outline-none focus:ring-4 focus:ring-primary/50`}
              whileHover={!showResult ? { x: 2 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              aria-label={`Option ${String.fromCharCode(
                65 + index
              )}: ${option}`}
              aria-pressed={isSelected}
              aria-disabled={showResult}
              role="radio"
              tabIndex={0}
            >
              {/* Radio circle */}
              <div
                className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-foreground/30"
                }`}
              >
                {isSelected && !showResult && (
                  <div className="w-3 h-3 rounded-full bg-background" />
                )}
                {showResult && icon}
              </div>

              {/* Option text */}
              <span
                className={`flex-1 font-mono text-sm md:text-base ${
                  isSelected && !showResult ? "font-bold" : ""
                }`}
              >
                {option}
              </span>

              {/* Letter label */}
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                {String.fromCharCode(65 + index)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Result Message */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className={`p-4 mb-6 border-l-4 ${
              isCorrect
                ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                : "bg-red-50 dark:bg-red-900/20 border-red-500"
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2
                  size={24}
                  className="text-green-500 flex-shrink-0"
                />
              ) : (
                <XCircle size={24} className="text-red-500 flex-shrink-0" />
              )}
              <div>
                <p className="font-bold mb-2">
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                {exercise.explanation && (
                  <p className="text-sm text-foreground/80">
                    {exercise.explanation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-3" role="group" aria-label="Exercise actions">
        {!showResult ? (
          <motion.button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={`border-3 border-foreground font-mono font-bold px-4 md:px-6 py-3 transition-colors text-sm md:text-base w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-primary/50 ${
              selectedAnswer === null
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-foreground text-background hover:bg-background hover:text-foreground"
            }`}
            whileHover={selectedAnswer !== null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
            aria-label="Submit your answer"
            aria-disabled={selectedAnswer === null}
          >
            Submit Answer
          </motion.button>
        ) : (
          <motion.button
            onClick={handleReset}
            className="border-3 border-foreground bg-background text-foreground font-mono font-bold px-4 md:px-6 py-3 hover:bg-foreground hover:text-background transition-colors text-sm md:text-base w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-primary/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Reset exercise and try again"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ExerciseMultipleChoice;

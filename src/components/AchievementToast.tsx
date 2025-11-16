import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { Achievement, getRarityColor } from "@/lib/achievements";
import { useEffect, useState } from "react";

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementToast = ({ achievement, onClose }: AchievementToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-sm"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <div className="border-4 border-foreground bg-background shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-foreground text-background px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-accent" />
                <span className="font-mono font-bold text-sm">
                  ACHIEVEMENT UNLOCKED!
                </span>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="hover:text-accent transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-5xl">{achievement.icon}</div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <div
                    className={`inline-block px-2 py-1 text-xs font-mono font-bold ${getRarityColor(
                      achievement.rarity
                    )}`}
                  >
                    {achievement.rarity.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar animation */}
            <motion.div
              className="h-1 bg-accent"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              style={{ transformOrigin: "right" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;

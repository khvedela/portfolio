import { motion } from "framer-motion";
import { Trophy, Lock } from "lucide-react";
import {
  ALL_ACHIEVEMENTS,
  getUnlockedAchievements,
  getRarityColor,
  Achievement,
} from "@/lib/achievements";

const AchievementsBadge = () => {
  const unlockedAchievements = getUnlockedAchievements();
  const allAchievements = Object.values(ALL_ACHIEVEMENTS);

  const unlockedIds = unlockedAchievements.map((a) => a.id);

  return (
    <div className="border-4 border-foreground p-6 bg-background">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={24} className="text-primary" />
        <h2 className="text-2xl font-display font-bold">Achievements</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4 font-mono">
        {unlockedAchievements.length} / {allAchievements.length} unlocked
      </p>

      {/* Progress bar */}
      <div className="h-3 bg-muted border-2 border-foreground mb-6">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{
            width: `${
              (unlockedAchievements.length / allAchievements.length) * 100
            }%`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {allAchievements.map((achievement) => {
          const isUnlocked = unlockedIds.includes(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              className={`border-3 border-foreground p-3 transition-all group ${
                isUnlocked
                  ? "bg-background hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-muted/30 opacity-60"
              }`}
              whileHover={isUnlocked ? { y: -2 } : {}}
              title={
                isUnlocked
                  ? achievement.description
                  : `🔒 ${achievement.description}`
              }
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="text-3xl mb-2 relative">
                  {isUnlocked ? (
                    achievement.icon
                  ) : (
                    <Lock size={32} className="text-muted-foreground" />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-xs mb-1 line-clamp-2">
                  {isUnlocked ? achievement.title : "???"}
                </h3>

                {/* Rarity badge */}
                {isUnlocked && (
                  <div
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 ${getRarityColor(
                      achievement.rarity
                    )}`}
                  >
                    {achievement.rarity.toUpperCase()}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsBadge;

import { motion } from "framer-motion";
import { BarChart3, Clock, Target, Flame, Award } from "lucide-react";
import { getUserAnalytics, formatTime } from "@/lib/analytics";
import { getUnlockedAchievements } from "@/lib/achievements";

const AnalyticsDashboard = () => {
  const analytics = getUserAnalytics();
  const achievements = getUnlockedAchievements();

  const stats = [
    {
      icon: Target,
      label: "Lessons Completed",
      value: analytics.totalLessons,
      color: "text-primary",
    },
    {
      icon: Award,
      label: "Exercises Completed",
      value: analytics.totalExercises,
      color: "text-accent",
    },
    {
      icon: Clock,
      label: "Time Spent Learning",
      value: formatTime(analytics.totalTimeSpent),
      color: "text-blue-500",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${analytics.currentStreak} days`,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="border-4 border-foreground p-6 bg-background">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={24} className="text-primary" />
        <h2 className="text-2xl font-display font-bold">Your Stats</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="border-3 border-foreground p-4 bg-background hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            whileHover={{ y: -2 }}
          >
            <stat.icon size={24} className={`${stat.color} mb-2`} />
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-mono">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-4 border-t-3 border-foreground/20 pt-6">
        <div>
          <h3 className="font-bold text-sm mb-2 font-mono">ACHIEVEMENTS</h3>
          <p className="text-muted-foreground font-mono text-sm">
            {achievements.length} unlocked
          </p>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-2 font-mono">LONGEST STREAK</h3>
          <p className="text-muted-foreground font-mono text-sm">
            🔥 {analytics.longestStreak} days
          </p>
        </div>
      </div>

      {analytics.lastActive && (
        <div className="mt-4 text-xs text-muted-foreground font-mono border-t-2 border-foreground/20 pt-4">
          Last active: {new Date(analytics.lastActive).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;

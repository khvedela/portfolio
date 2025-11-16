import { getCourseProgress, getAllProgress } from "./courseProgress";
import { getCourse } from "@/courses/courses";

export type AchievementId =
  | "first-lesson"
  | "first-course"
  | "speed-learner"
  | "perfect-score"
  | "early-bird"
  | "night-owl"
  | "course-completionist"
  | "exercise-master"
  | "week-streak"
  | "html-expert";

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt?: string; // ISO date string
}

export interface AchievementProgress {
  unlockedAchievements: AchievementId[];
  lastChecked: string;
}

const ACHIEVEMENTS_KEY = "achievements";

// All available achievements
export const ALL_ACHIEVEMENTS: Record<AchievementId, Omit<Achievement, "unlockedAt">> = {
  "first-lesson": {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    rarity: "common",
  },
  "first-course": {
    id: "first-course",
    title: "Course Conqueror",
    description: "Complete your first course",
    icon: "🏆",
    rarity: "rare",
  },
  "speed-learner": {
    id: "speed-learner",
    title: "Speed Learner",
    description: "Complete 3 lessons in one day",
    icon: "⚡",
    rarity: "rare",
  },
  "perfect-score": {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Get all exercises correct on first try in a lesson",
    icon: "💯",
    rarity: "epic",
  },
  "early-bird": {
    id: "early-bird",
    title: "Early Bird",
    description: "Complete a lesson before 9 AM",
    icon: "🌅",
    rarity: "common",
  },
  "night-owl": {
    id: "night-owl",
    title: "Night Owl",
    description: "Complete a lesson after 10 PM",
    icon: "🦉",
    rarity: "common",
  },
  "course-completionist": {
    id: "course-completionist",
    title: "Completionist",
    description: "Complete all available courses",
    icon: "👑",
    rarity: "legendary",
  },
  "exercise-master": {
    id: "exercise-master",
    title: "Exercise Master",
    description: "Complete 50 exercises",
    icon: "💪",
    rarity: "epic",
  },
  "week-streak": {
    id: "week-streak",
    title: "Week Warrior",
    description: "Learn for 7 days in a row",
    icon: "🔥",
    rarity: "epic",
  },
  "html-expert": {
    id: "html-expert",
    title: "HTML Expert",
    description: "Complete the HTML Basics course",
    icon: "📝",
    rarity: "rare",
  },
};

// Get achievement progress from localStorage
export const getAchievementProgress = (): AchievementProgress => {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    return stored
      ? JSON.parse(stored)
      : { unlockedAchievements: [], lastChecked: new Date().toISOString() };
  } catch (error) {
    console.error("Error reading achievements:", error);
    return { unlockedAchievements: [], lastChecked: new Date().toISOString() };
  }
};

// Save achievement progress
const saveAchievementProgress = (progress: AchievementProgress): void => {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving achievements:", error);
  }
};

// Unlock an achievement
export const unlockAchievement = (achievementId: AchievementId): boolean => {
  const progress = getAchievementProgress();
  
  if (progress.unlockedAchievements.includes(achievementId)) {
    return false; // Already unlocked
  }

  progress.unlockedAchievements.push(achievementId);
  progress.lastChecked = new Date().toISOString();
  saveAchievementProgress(progress);
  return true; // Newly unlocked
};

// Get all unlocked achievements with full details
export const getUnlockedAchievements = (): Achievement[] => {
  const progress = getAchievementProgress();
  return progress.unlockedAchievements.map((id) => ({
    ...ALL_ACHIEVEMENTS[id],
    unlockedAt: progress.lastChecked,
  }));
};

// Check if achievement is unlocked
export const isAchievementUnlocked = (achievementId: AchievementId): boolean => {
  const progress = getAchievementProgress();
  return progress.unlockedAchievements.includes(achievementId);
};

// Get achievement completion percentage
export const getAchievementCompletionPercentage = (): number => {
  const progress = getAchievementProgress();
  const total = Object.keys(ALL_ACHIEVEMENTS).length;
  const unlocked = progress.unlockedAchievements.length;
  return Math.round((unlocked / total) * 100);
};

// Check and unlock achievements based on current progress
export const checkAchievements = (): AchievementId[] => {
  const newlyUnlocked: AchievementId[] = [];
  const allProgress = getAllProgress();
  
  // Count total lessons and exercises completed
  let totalLessonsCompleted = 0;
  let totalExercisesCompleted = 0;
  let coursesCompleted = 0;
  
  Object.entries(allProgress).forEach(([courseId, progress]) => {
    totalLessonsCompleted += progress.completedLessons.length;
    totalExercisesCompleted += progress.completedExercises.length;
    
    const course = getCourse(courseId);
    if (course && progress.completedLessons.length === course.lessons.length) {
      coursesCompleted++;
      
      // HTML Expert
      if (courseId === "html-basics" && unlockAchievement("html-expert")) {
        newlyUnlocked.push("html-expert");
      }
    }
  });

  // First Lesson
  if (totalLessonsCompleted >= 1 && unlockAchievement("first-lesson")) {
    newlyUnlocked.push("first-lesson");
  }

  // First Course
  if (coursesCompleted >= 1 && unlockAchievement("first-course")) {
    newlyUnlocked.push("first-course");
  }

  // Exercise Master
  if (totalExercisesCompleted >= 50 && unlockAchievement("exercise-master")) {
    newlyUnlocked.push("exercise-master");
  }

  // Course Completionist (all courses)
  const publishedCoursesCount = 1; // Update when more courses added
  if (coursesCompleted >= publishedCoursesCount && unlockAchievement("course-completionist")) {
    newlyUnlocked.push("course-completionist");
  }

  return newlyUnlocked;
};

// Check time-based achievements
export const checkTimeBasedAchievements = (): AchievementId[] => {
  const newlyUnlocked: AchievementId[] = [];
  const hour = new Date().getHours();

  // Early Bird (before 9 AM)
  if (hour < 9 && unlockAchievement("early-bird")) {
    newlyUnlocked.push("early-bird");
  }

  // Night Owl (after 10 PM)
  if (hour >= 22 && unlockAchievement("night-owl")) {
    newlyUnlocked.push("night-owl");
  }

  return newlyUnlocked;
};

// Get rarity color
export const getRarityColor = (rarity: Achievement["rarity"]): string => {
  switch (rarity) {
    case "common":
      return "bg-slate-500 text-white";
    case "rare":
      return "bg-blue-500 text-white";
    case "epic":
      return "bg-purple-500 text-white";
    case "legendary":
      return "bg-amber-500 text-white";
    default:
      return "bg-slate-500 text-white";
  }
};

// Reset achievements (for testing)
export const resetAchievements = (): void => {
  try {
    localStorage.removeItem(ACHIEVEMENTS_KEY);
  } catch (error) {
    console.error("Error resetting achievements:", error);
  }
};

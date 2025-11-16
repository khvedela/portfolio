// Privacy-first analytics - all data stored locally

export interface AnalyticsEvent {
  type: "lesson_start" | "lesson_complete" | "exercise_attempt" | "exercise_complete" | "course_start" | "course_complete";
  courseId: string;
  lessonId?: string;
  exerciseId?: string;
  timestamp: string;
  duration?: number; // in milliseconds
  success?: boolean; // for exercises
}

export interface LessonAnalytics {
  lessonId: string;
  courseId: string;
  starts: number;
  completions: number;
  totalTime: number; // milliseconds
  averageTime: number; // milliseconds
  firstStarted?: string;
  lastCompleted?: string;
}

export interface ExerciseAnalytics {
  exerciseId: string;
  attempts: number;
  successes: number;
  failures: number;
  successRate: number; // percentage
}

export interface CourseAnalytics {
  courseId: string;
  starts: number;
  completions: number;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalTimeSpent: number; // milliseconds
  firstStarted?: string;
  lastAccessed?: string;
}

export interface UserAnalytics {
  totalLessons: number;
  totalExercises: number;
  totalTimeSpent: number; // milliseconds
  totalCourses: number;
  coursesCompleted: number;
  currentStreak: number; // days
  longestStreak: number; // days
  activeDays: string[]; // ISO date strings
  lastActive?: string;
}

const ANALYTICS_KEY = "courseAnalytics";
const SESSION_KEY = "currentSession";

// Store analytics event
export const trackEvent = (event: AnalyticsEvent): void => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    events.push(event);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// Get all analytics events
export const getAllEvents = (): AnalyticsEvent[] => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading events:", error);
    return [];
  }
};

// Track lesson start with session
export const trackLessonStart = (courseId: string, lessonId: string): void => {
  trackEvent({
    type: "lesson_start",
    courseId,
    lessonId,
    timestamp: new Date().toISOString(),
  });

  // Store session start time
  const sessionKey = `${SESSION_KEY}_${courseId}_${lessonId}`;
  localStorage.setItem(sessionKey, new Date().toISOString());
};

// Track lesson complete with duration
export const trackLessonComplete = (courseId: string, lessonId: string): void => {
  const sessionKey = `${SESSION_KEY}_${courseId}_${lessonId}`;
  const startTime = localStorage.getItem(sessionKey);
  
  let duration: number | undefined;
  if (startTime) {
    duration = new Date().getTime() - new Date(startTime).getTime();
    localStorage.removeItem(sessionKey);
  }

  trackEvent({
    type: "lesson_complete",
    courseId,
    lessonId,
    timestamp: new Date().toISOString(),
    duration,
  });
};

// Track exercise attempt
export const trackExerciseAttempt = (
  courseId: string,
  lessonId: string,
  exerciseId: string,
  success: boolean
): void => {
  trackEvent({
    type: success ? "exercise_complete" : "exercise_attempt",
    courseId,
    lessonId,
    exerciseId,
    timestamp: new Date().toISOString(),
    success,
  });
};

// Get lesson analytics
export const getLessonAnalytics = (courseId: string, lessonId: string): LessonAnalytics => {
  const events = getAllEvents();
  const lessonEvents = events.filter(
    (e) => e.courseId === courseId && e.lessonId === lessonId
  );

  const starts = lessonEvents.filter((e) => e.type === "lesson_start").length;
  const completions = lessonEvents.filter((e) => e.type === "lesson_complete").length;
  
  const completionEvents = lessonEvents.filter((e) => e.type === "lesson_complete" && e.duration);
  const totalTime = completionEvents.reduce((sum, e) => sum + (e.duration || 0), 0);
  const averageTime = completions > 0 ? totalTime / completions : 0;

  const startEvents = lessonEvents.filter((e) => e.type === "lesson_start");
  const completeEvents = lessonEvents.filter((e) => e.type === "lesson_complete");

  return {
    lessonId,
    courseId,
    starts,
    completions,
    totalTime,
    averageTime,
    firstStarted: startEvents.length > 0 ? startEvents[0].timestamp : undefined,
    lastCompleted: completeEvents.length > 0 ? completeEvents[completeEvents.length - 1].timestamp : undefined,
  };
};

// Get exercise analytics
export const getExerciseAnalytics = (exerciseId: string): ExerciseAnalytics => {
  const events = getAllEvents();
  const exerciseEvents = events.filter((e) => e.exerciseId === exerciseId);

  const attempts = exerciseEvents.filter((e) => e.type === "exercise_attempt" || e.type === "exercise_complete").length;
  const successes = exerciseEvents.filter((e) => e.type === "exercise_complete" && e.success).length;
  const failures = exerciseEvents.filter((e) => e.type === "exercise_attempt" && e.success === false).length;
  
  const successRate = attempts > 0 ? Math.round((successes / attempts) * 100) : 0;

  return {
    exerciseId,
    attempts,
    successes,
    failures,
    successRate,
  };
};

// Get course analytics
export const getCourseAnalytics = (courseId: string): CourseAnalytics => {
  const events = getAllEvents();
  const courseEvents = events.filter((e) => e.courseId === courseId);

  const starts = courseEvents.filter((e) => e.type === "course_start").length;
  const completions = courseEvents.filter((e) => e.type === "course_complete").length;
  const totalLessonsCompleted = new Set(
    courseEvents.filter((e) => e.type === "lesson_complete").map((e) => e.lessonId)
  ).size;
  const totalExercisesCompleted = new Set(
    courseEvents.filter((e) => e.type === "exercise_complete").map((e) => e.exerciseId)
  ).size;

  const lessonCompleteEvents = courseEvents.filter((e) => e.type === "lesson_complete" && e.duration);
  const totalTimeSpent = lessonCompleteEvents.reduce((sum, e) => sum + (e.duration || 0), 0);

  const allEvents = courseEvents.filter((e) => e.timestamp);
  
  return {
    courseId,
    starts,
    completions,
    totalLessonsCompleted,
    totalExercisesCompleted,
    totalTimeSpent,
    firstStarted: allEvents.length > 0 ? allEvents[0].timestamp : undefined,
    lastAccessed: allEvents.length > 0 ? allEvents[allEvents.length - 1].timestamp : undefined,
  };
};

// Calculate streak
const calculateStreak = (activeDays: string[]): { current: number; longest: number } => {
  if (activeDays.length === 0) return { current: 0, longest: 0 };

  const sortedDays = [...activeDays].sort().reverse(); // Most recent first
  const today = new Date().toISOString().split("T")[0];
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Check if active today or yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  
  if (sortedDays[0] === today || sortedDays[0] === yesterdayStr) {
    currentStreak = 1;
    tempStreak = 1;
    
    for (let i = 1; i < sortedDays.length; i++) {
      const prevDate = new Date(sortedDays[i - 1]);
      const currDate = new Date(sortedDays[i]);
      const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        tempStreak++;
      } else {
        break;
      }
    }
  }
  
  // Calculate longest streak
  tempStreak = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    const prevDate = new Date(sortedDays[i - 1]);
    const currDate = new Date(sortedDays[i]);
    const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);
  
  return { current: currentStreak, longest: longestStreak };
};

// Get user analytics
export const getUserAnalytics = (): UserAnalytics => {
  const events = getAllEvents();
  
  const uniqueLessons = new Set(events.filter((e) => e.type === "lesson_complete").map((e) => e.lessonId));
  const uniqueExercises = new Set(events.filter((e) => e.type === "exercise_complete").map((e) => e.exerciseId));
  const uniqueCourses = new Set(events.map((e) => e.courseId));
  const completedCourses = events.filter((e) => e.type === "course_complete").length;
  
  const lessonCompleteEvents = events.filter((e) => e.type === "lesson_complete" && e.duration);
  const totalTimeSpent = lessonCompleteEvents.reduce((sum, e) => sum + (e.duration || 0), 0);
  
  // Get unique active days
  const activeDays = Array.from(
    new Set(events.map((e) => e.timestamp.split("T")[0]))
  );
  
  const { current, longest } = calculateStreak(activeDays);
  
  const lastEvent = events.length > 0 ? events[events.length - 1].timestamp : undefined;
  
  return {
    totalLessons: uniqueLessons.size,
    totalExercises: uniqueExercises.size,
    totalTimeSpent,
    totalCourses: uniqueCourses.size,
    coursesCompleted: completedCourses,
    currentStreak: current,
    longestStreak: longest,
    activeDays,
    lastActive: lastEvent,
  };
};

// Format time
export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

// Clear all analytics
export const clearAnalytics = (): void => {
  try {
    localStorage.removeItem(ANALYTICS_KEY);
    // Clear all session keys
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(SESSION_KEY)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing analytics:", error);
  }
};

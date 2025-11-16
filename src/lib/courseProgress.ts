import { getCourse } from "@/courses/courses";

export interface CourseProgress {
  completedLessons: string[]; // lesson IDs
  currentLessonId: string;
  completedExercises: string[]; // exercise IDs
  lastAccessedAt: string; // ISO date string
}

export interface AllProgress {
  [courseId: string]: CourseProgress;
}

const STORAGE_KEY = "courseProgress";

// Get all progress from localStorage
export const getAllProgress = (): AllProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading course progress:", error);
    return {};
  }
};

// Save all progress to localStorage
const saveAllProgress = (progress: AllProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving course progress:", error);
  }
};

// Get progress for a specific course
export const getCourseProgress = (courseId: string): CourseProgress => {
  const allProgress = getAllProgress();
  return (
    allProgress[courseId] || {
      completedLessons: [],
      currentLessonId: "",
      completedExercises: [],
      lastAccessedAt: new Date().toISOString(),
    }
  );
};

// Mark a lesson as complete
export const markLessonComplete = (
  courseId: string,
  lessonId: string
): void => {
  const allProgress = getAllProgress();
  const courseProgress = getCourseProgress(courseId);

  if (!courseProgress.completedLessons.includes(lessonId)) {
    courseProgress.completedLessons.push(lessonId);
  }

  courseProgress.lastAccessedAt = new Date().toISOString();

  allProgress[courseId] = courseProgress;
  saveAllProgress(allProgress);
};

// Mark a lesson as incomplete
export const markLessonIncomplete = (
  courseId: string,
  lessonId: string
): void => {
  const allProgress = getAllProgress();
  const courseProgress = getCourseProgress(courseId);

  courseProgress.completedLessons = courseProgress.completedLessons.filter(
    (id) => id !== lessonId
  );

  courseProgress.lastAccessedAt = new Date().toISOString();

  allProgress[courseId] = courseProgress;
  saveAllProgress(allProgress);
};

// Set current lesson
export const setCurrentLesson = (
  courseId: string,
  lessonId: string
): void => {
  const allProgress = getAllProgress();
  const courseProgress = getCourseProgress(courseId);

  courseProgress.currentLessonId = lessonId;
  courseProgress.lastAccessedAt = new Date().toISOString();

  allProgress[courseId] = courseProgress;
  saveAllProgress(allProgress);
};

// Mark exercise as complete
export const markExerciseComplete = (
  courseId: string,
  exerciseId: string
): void => {
  const allProgress = getAllProgress();
  const courseProgress = getCourseProgress(courseId);

  if (!courseProgress.completedExercises.includes(exerciseId)) {
    courseProgress.completedExercises.push(exerciseId);
  }

  courseProgress.lastAccessedAt = new Date().toISOString();

  allProgress[courseId] = courseProgress;
  saveAllProgress(allProgress);
};

// Check if lesson is complete
export const isLessonComplete = (
  courseId: string,
  lessonId: string
): boolean => {
  const courseProgress = getCourseProgress(courseId);
  return courseProgress.completedLessons.includes(lessonId);
};

// Check if exercise is complete
export const isExerciseComplete = (
  courseId: string,
  exerciseId: string
): boolean => {
  const courseProgress = getCourseProgress(courseId);
  return courseProgress.completedExercises.includes(exerciseId);
};

// Get course completion percentage
export const getCourseCompletionPercentage = (courseId: string): number => {
  const course = getCourse(courseId);
  if (!course || course.lessons.length === 0) return 0;

  const courseProgress = getCourseProgress(courseId);
  const completedCount = courseProgress.completedLessons.length;
  const totalCount = course.lessons.length;

  return Math.round((completedCount / totalCount) * 100);
};

// Get total completed courses count
export const getCompletedCoursesCount = (): number => {
  const allProgress = getAllProgress();
  let completedCount = 0;

  Object.keys(allProgress).forEach((courseId) => {
    if (getCourseCompletionPercentage(courseId) === 100) {
      completedCount++;
    }
  });

  return completedCount;
};

// Get total lessons completed across all courses
export const getTotalLessonsCompleted = (): number => {
  const allProgress = getAllProgress();
  let total = 0;

  Object.values(allProgress).forEach((progress) => {
    total += progress.completedLessons.length;
  });

  return total;
};

// Reset course progress
export const resetCourseProgress = (courseId: string): void => {
  const allProgress = getAllProgress();
  delete allProgress[courseId];
  saveAllProgress(allProgress);
};

// Reset all progress (useful for testing)
export const resetAllProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error resetting progress:", error);
  }
};

// Get next incomplete lesson in a course
export const getNextIncompleteLesson = (courseId: string): string | null => {
  const course = getCourse(courseId);
  if (!course) return null;

  const courseProgress = getCourseProgress(courseId);
  const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);

  const incompleteLesson = sortedLessons.find(
    (lesson) => !courseProgress.completedLessons.includes(lesson.id)
  );

  return incompleteLesson?.id || null;
};

// Check if user has started a course
export const hasCourseStarted = (courseId: string): boolean => {
  const courseProgress = getCourseProgress(courseId);
  return (
    courseProgress.completedLessons.length > 0 ||
    courseProgress.currentLessonId !== ""
  );
};

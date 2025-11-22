import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  GraduationCap,
  CheckCircle2,
  Circle,
  Trophy,
  Play,
  Moon,
  Sun,
  Award,
  RotateCcw,
} from "lucide-react";
import { getCourse } from "@/courses/courses";
import { Badge } from "@/components/ui/badge";
import CourseCertificate from "@/components/CourseCertificate";
import { Helmet } from "react-helmet-async";
import {
  getCourseProgress,
  getCourseCompletionPercentage,
  isLessonComplete,
  getNextIncompleteLesson,
  resetCourseProgress,
} from "@/lib/courseProgress";
import { useState, useEffect } from "react";
import { getPortfolioUrl } from "@/lib/navigation";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourse(id) : undefined;
  const [isDark, setIsDark] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }

    // Load student name from localStorage
    const savedName = localStorage.getItem("studentName");
    if (savedName) {
      setStudentName(savedName);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <div className="text-foreground font-mono text-xl">
          404 - Course Not Found
        </div>
        <Link
          to="/"
          className="border-3 border-foreground bg-foreground text-background px-6 py-3 font-mono font-bold hover:bg-background hover:text-foreground transition-colors"
        >
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const progress = getCourseProgress(course.id);
  const completionPercentage = getCourseCompletionPercentage(course.id);
  const isCompleted = completionPercentage === 100;
  const nextLesson = getNextIncompleteLesson(course.id) || course.lessons[0].id;

  const handleStartCourse = () => {
    navigate(`/courses/${course.id}/lessons/${nextLesson}`);
  };

  const handleResetCourse = () => {
    if (course?.id) {
      resetCourseProgress(course.id);
      setShowResetConfirm(false);
      window.location.reload();
    }
  };

  const handleSaveName = () => {
    localStorage.setItem("studentName", studentName);
    setIsEditingName(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500 text-white";
      case "intermediate":
        return "bg-yellow-500 text-black";
      case "advanced":
        return "bg-red-500 text-white";
      default:
        return "bg-primary text-background";
    }
  };

  return (
    <>
      <Helmet>
        <title>{course.title} | Free Course</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.description} />
        <meta property="og:type" content="website" />
      </Helmet>


      <div className="min-h-screen">
        {/* Theme toggle button - fixed top right */}
        <motion.div
          className="fixed top-6 right-6 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={toggleTheme}
            className="w-14 h-14 bg-foreground text-background border-3 border-foreground hover:bg-background hover:text-foreground transition-colors flex items-center justify-center font-bold"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 20,
            }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.header
          className="bg-foreground text-background py-12 px-6 border-b-6 border-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-background hover:text-accent transition-colors font-mono"
              >
                <ArrowLeft size={20} />
                <span>All Courses</span>
              </Link>
              <span className="text-background/50">|</span>
              <a
                href={getPortfolioUrl()}
                className="inline-flex items-center gap-2 text-background hover:text-accent transition-colors font-mono"
              >
                <ArrowLeft size={20} />
                <span>Portfolio</span>
              </a>
            </div>

            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    className={`${getDifficultyColor(
                      course.difficulty
                    )} border-0 font-mono font-bold text-sm`}
                  >
                    {course.difficulty.toUpperCase()}
                  </Badge>
                  {isCompleted && (
                    <div className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 font-mono font-bold">
                      <Trophy size={16} />
                      <span>COMPLETED</span>
                    </div>
                  )}
                </div>

                <motion.h1
                  className="text-3xl md:text-4xl font-display font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {course.title}
                </motion.h1>

                <p className="text-lg mb-4">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{course.duration}h total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>{completionPercentage}% complete</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={handleStartCourse}
                  className="border-4 border-background bg-accent text-foreground px-8 py-4 font-mono font-bold hover:bg-primary hover:text-background hover:border-primary transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  {isCompleted
                    ? "Review Course"
                    : progress.completedLessons.length > 0
                      ? "Continue"
                      : "Start Course"}
                </motion.button>

                {isCompleted && (
                  <motion.button
                    onClick={() => setShowCertificate(true)}
                    className="border-3 border-primary bg-primary text-background px-6 py-3 font-mono font-bold hover:bg-background hover:text-primary transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Award size={20} />
                    View Certificate
                  </motion.button>
                )}

                {progress.completedLessons.length > 0 && (
                  <motion.button
                    onClick={() => setShowResetConfirm(true)}
                    className="border-2 border-foreground/30 bg-background text-muted-foreground px-6 py-2 font-mono text-sm hover:border-destructive hover:text-destructive transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw size={16} />
                    Reset Progress
                  </motion.button>
                )}
              </div>
            </div>

            {/* Student Name Input */}
            <motion.div
              className="mt-6 border-t-3 border-background/30 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center gap-4">
                {isEditingName ? (
                  <>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your name"
                      className="flex-1 border-2 border-background bg-background/20 text-background px-4 py-2 font-mono placeholder:text-background/50 focus:outline-none focus:border-accent"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    />
                    <motion.button
                      onClick={handleSaveName}
                      className="border-2 border-background bg-accent text-foreground px-6 py-2 font-mono font-bold hover:bg-background hover:text-background transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save
                    </motion.button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="text-xs font-mono font-bold text-background/80 mb-1">
                        STUDENT NAME
                      </p>
                      <p className="font-mono text-lg text-background">
                        {studentName || "Not set (click to add)"}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setIsEditingName(true)}
                      className="border-2 border-background bg-background/20 text-background px-6 py-2 font-mono hover:bg-background hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {studentName ? "Edit" : "Add Name"}
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Progress Bar */}
            {progress.completedLessons.length > 0 && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-bold">
                    YOUR PROGRESS
                  </span>
                  <span className="text-xs font-mono font-bold text-accent">
                    {progress.completedLessons.length} / {course.lessons.length}{" "}
                    lessons
                  </span>
                </div>
                <div className="h-4 bg-background/20 border-2 border-background">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Learning Outcomes */}
            <motion.section
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="border-4 border-foreground p-6 sticky top-6">
                <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-primary" />
                  What You'll Learn
                </h2>
                <ul className="space-y-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        size={16}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t-2 border-foreground/20">
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-2 border-foreground/20 font-mono text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Curriculum */}
            <motion.section
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <BookOpen size={24} className="text-primary" />
                Course Curriculum
              </h2>

              <div className="space-y-4">
                {course.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, index) => {
                    const completed = isLessonComplete(course.id, lesson.id);
                    return (
                      <motion.div
                        key={lesson.id}
                        className={`border-3 border-foreground group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${completed ? "bg-primary/5" : "bg-background"
                          }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 2 }}
                      >
                        <Link
                          to={`/courses/${course.id}/lessons/${lesson.id}`}
                          className="flex items-start gap-4 p-6"
                        >
                          {/* Lesson Number & Status */}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center font-mono font-bold">
                              {completed ? (
                                <CheckCircle2
                                  size={24}
                                  className="text-primary"
                                />
                              ) : (
                                <Circle
                                  size={24}
                                  className="text-muted-foreground"
                                />
                              )}
                            </div>
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                {lesson.order}. {lesson.title}
                              </h3>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono flex-shrink-0">
                                <Clock size={14} />
                                <span>{lesson.duration}min</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                              <span>{lesson.exercises.length} exercises</span>
                              {completed && (
                                <>
                                  <span>•</span>
                                  <span className="text-primary font-bold">
                                    ✓ COMPLETED
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {showCertificate && course && (
            <CourseCertificate
              course={course}
              studentName={studentName}
              onClose={() => setShowCertificate(false)}
            />
          )}
        </AnimatePresence>

        {/* Reset Confirmation Modal */}
        <AnimatePresence>
          {showResetConfirm && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
            >
              <motion.div
                className="bg-background border-4 border-foreground p-8 max-w-md w-full"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <RotateCcw size={24} className="text-destructive" />
                  Reset Course Progress?
                </h3>
                <p className="mb-6 text-muted-foreground font-mono">
                  This will delete all your progress for this course. You'll
                  need to complete all lessons again. This action cannot be
                  undone.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 border-3 border-foreground bg-background text-foreground px-6 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleResetCourse}
                    className="flex-1 border-3 border-destructive bg-destructive text-white px-6 py-3 font-mono font-bold hover:bg-background hover:text-destructive transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CourseDetail;

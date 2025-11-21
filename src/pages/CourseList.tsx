import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  GraduationCap,
  Trophy,
  Moon,
  Sun,
} from "lucide-react";
import { getPublishedCourses, CourseCategory } from "@/courses/courses";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import AchievementsBadge from "@/components/AchievementsBadge";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { Helmet } from "react-helmet-async";
import {
  getCourseProgress,
  getCourseCompletionPercentage,
} from "@/lib/courseProgress";
import { useState, useEffect } from "react";
import { getPortfolioUrl } from "@/lib/navigation";

const CourseList = () => {
  const courses = getPublishedCourses();
  const [isDark, setIsDark] = useState(false);

  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<CourseCategory, typeof courses>);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const courseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
      },
    },
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
        <title>Free Courses | David Khvedela - Learn Web Development</title>
        <meta
          name="description"
          content="Free web development courses. Learn HTML, CSS, JavaScript, Angular, TypeScript and more. Hands-on exercises and real-world projects."
        />
        <meta property="og:title" content="Free Courses | David Khvedela" />
        <meta
          property="og:description"
          content="Free web development courses with hands-on exercises"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <CustomCursor />

      <div className="min-h-screen bg-background">
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
          className="bg-foreground text-background py-16 px-6 border-b-6 border-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto">
            <a
              href={getPortfolioUrl()}
              className="inline-flex items-center gap-2 text-background hover:text-accent transition-colors mb-6 font-mono"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </a>

            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary flex items-center justify-center">
                <GraduationCap size={32} className="text-background" />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                FREE COURSES
              </h1>
            </motion.div>

            <motion.p
              className="text-xl font-mono ml-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Learn web development. No bullshit. No paywalls. Just knowledge.
            </motion.p>
          </div>
        </motion.header>

        {/* Courses */}
        <motion.main
          className="max-w-6xl mx-auto px-6 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Render courses grouped by category */}
          {Object.entries(coursesByCategory).map(
            ([category, categoryCourses]) => (
              <div key={category} className="mb-16">
                {/* Category Header */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 flex items-center gap-3">
                    <div className="w-2 h-12 bg-primary"></div>
                    {category}
                  </h2>
                  <p className="text-muted-foreground font-mono ml-5">
                    {categoryCourses.length} course
                    {categoryCourses.length !== 1 ? "s" : ""}
                  </p>
                </motion.div>

                {/* Courses Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {categoryCourses.map((course) => {
                    const progress = getCourseProgress(course.id);
                    const completionPercentage = getCourseCompletionPercentage(
                      course.id
                    );
                    const isStarted = progress.completedLessons.length > 0;
                    const isCompleted = completionPercentage === 100;

                    return (
                      <motion.article
                        key={course.id}
                        variants={courseVariants}
                        className="border-4 border-foreground group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                        whileHover={{ y: -4 }}
                      >
                        <Link to={`/courses/${course.id}`}>
                          {/* Course Header */}
                          <div className="bg-foreground text-background p-6 border-b-4 border-foreground">
                            <div className="flex items-start justify-between mb-3">
                              <Badge
                                className={`${getDifficultyColor(
                                  course.difficulty
                                )} border-0 font-mono font-bold`}
                              >
                                {course.difficulty.toUpperCase()}
                              </Badge>
                              {isCompleted && (
                                <Trophy size={24} className="text-yellow-400" />
                              )}
                            </div>
                            <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                              {course.title}
                            </h2>
                          </div>

                          {/* Course Content */}
                          <div className="p-6 bg-background">
                            <p className="text-foreground/80 mb-4 leading-relaxed">
                              {course.description}
                            </p>

                            {/* Course Meta */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-mono">
                              <div className="flex items-center gap-1">
                                <BookOpen size={14} />
                                <span>{course.lessons.length} lessons</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{course.duration}h</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            {isStarted && (
                              <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-xs font-mono font-bold">
                                    PROGRESS
                                  </span>
                                  <span className="text-xs font-mono font-bold text-primary">
                                    {completionPercentage}%
                                  </span>
                                </div>
                                <div className="h-3 bg-muted border-2 border-foreground">
                                  <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${completionPercentage}%`,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {course.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="border-2 border-foreground/20 font-mono text-xs"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            {/* CTA */}
                            <div className="border-t-2 border-foreground/10 pt-4">
                              <span className="inline-flex items-center gap-2 text-primary font-mono font-bold group-hover:gap-4 transition-all">
                                {isCompleted ? (
                                  <>Review Course →</>
                                ) : isStarted ? (
                                  <>Continue Learning →</>
                                ) : (
                                  <>Start Course →</>
                                )}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            )
          )}

          {courses.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground font-mono text-lg">
                New courses coming soon! Check back later.
              </p>
            </motion.div>
          )}

          {/* Achievements Section */}
          <motion.section
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AchievementsBadge />
          </motion.section>

          {/* Analytics Dashboard */}
          <motion.section
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <AnalyticsDashboard />
          </motion.section>

          {/* Info Section */}
          <motion.section
            className="mt-16 border-4 border-foreground p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <BookOpen size={24} className="text-primary" />
              Why These Courses?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 font-mono">
              <div>
                <h3 className="font-bold mb-2 text-primary">100% FREE</h3>
                <p className="text-sm text-muted-foreground">
                  No credit card. No trial. No bullshit. Just free education.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-primary">HANDS-ON</h3>
                <p className="text-sm text-muted-foreground">
                  Real exercises. Real code. Learn by doing, not just reading.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-primary">NO FLUFF</h3>
                <p className="text-sm text-muted-foreground">
                  Straight to the point. What you need, nothing you don't.
                </p>
              </div>
            </div>
          </motion.section>
        </motion.main>
      </div>
    </>
  );
};

export default CourseList;

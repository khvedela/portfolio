import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import {
  getLesson,
  getCourse,
  getNextLesson,
  getPreviousLesson,
} from "@/courses/courses";
import CustomCursor from "@/components/CustomCursor";
import BrutalistTerminal from "@/components/BrutalistTerminal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Helmet } from "react-helmet-async";
import {
  setCurrentLesson,
  markLessonComplete,
  isLessonComplete,
  markExerciseComplete,
  isExerciseComplete,
} from "@/lib/courseProgress";
import ExerciseMultipleChoice from "@/components/ExerciseMultipleChoice";
import ExerciseCodeChallenge from "@/components/ExerciseCodeChallenge";

const Lesson = () => {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();

  const course = courseId ? getCourse(courseId) : undefined;
  const lesson =
    courseId && lessonId ? getLesson(courseId, lessonId) : undefined;
  const nextLesson =
    courseId && lessonId ? getNextLesson(courseId, lessonId) : undefined;
  const prevLesson =
    courseId && lessonId ? getPreviousLesson(courseId, lessonId) : undefined;

  const [readingProgress, setReadingProgress] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set()
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    if (courseId && lessonId) {
      setCurrentLesson(courseId, lessonId);
      setLessonCompleted(isLessonComplete(courseId, lessonId));

      // Load already completed exercises
      if (lesson?.exercises) {
        const completed = lesson.exercises
          .filter((ex) => isExerciseComplete(courseId, ex.id))
          .map((ex) => ex.id);
        setCompletedExercises(new Set(completed));
      }
    }
  }, [courseId, lessonId, lesson?.exercises]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMarkComplete = () => {
    if (courseId && lessonId) {
      markLessonComplete(courseId, lessonId);
      setLessonCompleted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const handleExerciseComplete = (exerciseId: string) => {
    if (courseId) {
      markExerciseComplete(courseId, exerciseId);
      setCompletedExercises((prev) => new Set([...prev, exerciseId]));
    }
  };

  const allExercisesCompleted =
    lesson?.exercises.every(
      (ex) =>
        completedExercises.has(ex.id) ||
        (courseId && isExerciseComplete(courseId, ex.id))
    ) || lesson?.exercises.length === 0;

  const handleNext = () => {
    if (nextLesson && courseId && lessonId) {
      // Auto-complete current lesson if all exercises are done
      if (allExercisesCompleted && !lessonCompleted) {
        markLessonComplete(courseId, lessonId);
        setLessonCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (prevLesson && courseId && lessonId) {
      // Auto-complete current lesson if all exercises are done
      if (allExercisesCompleted && !lessonCompleted) {
        markLessonComplete(courseId, lessonId);
        setLessonCompleted(true);
      }
      navigate(`/courses/${courseId}/lessons/${prevLesson.id}`);
      window.scrollTo(0, 0);
    }
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <CustomCursor />
        <div className="text-foreground font-mono text-xl">
          404 - Lesson Not Found
        </div>
        <Link
          to="/courses"
          className="border-3 border-foreground bg-foreground text-background px-6 py-3 font-mono font-bold hover:bg-background hover:text-foreground transition-colors"
        >
          ← Back to Courses
        </Link>
      </div>
    );
  }

  // Custom components for react-markdown
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          className="rounded-none border-3 border-foreground/20 my-6"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className="bg-muted px-2 py-1 rounded-none font-mono text-sm border border-foreground/20"
          {...props}
        >
          {children}
        </code>
      );
    },
    h2({ children, ...props }: any) {
      return (
        <h2
          className="text-3xl font-bold mb-4 mt-8 border-l-6 border-primary pl-6"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3({ children, ...props }: any) {
      return (
        <h3 className="text-2xl font-bold mb-3 mt-6 text-primary" {...props}>
          {children}
        </h3>
      );
    },
    a({ children, href, ...props }: any) {
      return (
        <a
          href={href}
          className="text-accent hover:underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },
    ul({ children, ...props }: any) {
      return (
        <ul className="list-disc ml-6 mb-4 space-y-2" {...props}>
          {children}
        </ul>
      );
    },
    ol({ children, ...props }: any) {
      return (
        <ol className="list-decimal ml-6 mb-4 space-y-2" {...props}>
          {children}
        </ol>
      );
    },
    p({ children, ...props }: any) {
      return (
        <p className="mb-4 leading-relaxed" {...props}>
          {children}
        </p>
      );
    },
    blockquote({ children, ...props }: any) {
      return (
        <blockquote
          className="border-l-6 border-accent pl-6 italic my-6 text-muted-foreground"
          {...props}
        >
          {children}
        </blockquote>
      );
    },
  };

  return (
    <>
      <Helmet>
        <title>
          {lesson.title} - {course.title} | Free Course
        </title>
        <meta
          name="description"
          content={`Lesson ${lesson.order}: ${lesson.title} - ${course.title}`}
        />
      </Helmet>

      <CustomCursor />

      {/* Confetti celebration */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={true}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-muted z-50">
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ scaleX: readingProgress / 100 }}
          initial={{ scaleX: 0 }}
        />
      </div>

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
          className="bg-foreground text-background py-8 px-6 border-b-4 border-accent sticky top-2 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm font-mono">
                <Link
                  to="/"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <Home size={16} />
                </Link>
                <span>/</span>
                <Link
                  to="/courses"
                  className="hover:text-accent transition-colors"
                >
                  Courses
                </Link>
                <span>/</span>
                <Link
                  to={`/courses/${courseId}`}
                  className="hover:text-accent transition-colors truncate max-w-[200px]"
                >
                  {course.title}
                </Link>
              </div>

              {/* Completion Checkbox */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleMarkComplete}
                  disabled={!allExercisesCompleted && !lessonCompleted}
                  className={`flex items-center gap-2 px-4 py-2 border-2 font-mono font-bold text-sm transition-colors ${
                    lessonCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : !allExercisesCompleted
                      ? "border-muted bg-muted text-muted-foreground cursor-not-allowed"
                      : "border-background bg-background text-foreground hover:bg-accent hover:text-background"
                  }`}
                  whileHover={
                    allExercisesCompleted || lessonCompleted
                      ? { scale: 1.05 }
                      : {}
                  }
                  whileTap={
                    allExercisesCompleted || lessonCompleted
                      ? { scale: 0.95 }
                      : {}
                  }
                  title={
                    !allExercisesCompleted && !lessonCompleted
                      ? "Complete all exercises first"
                      : ""
                  }
                >
                  <CheckCircle2 size={18} />
                  {lessonCompleted ? "Completed" : "Mark Complete"}
                </motion.button>
                {!allExercisesCompleted &&
                  !lessonCompleted &&
                  lesson?.exercises &&
                  lesson.exercises.length > 0 && (
                    <span className="text-xs font-mono text-muted-foreground">
                      Complete{" "}
                      {lesson.exercises.length - completedExercises.size}{" "}
                      exercise
                      {lesson.exercises.length - completedExercises.size !== 1
                        ? "s"
                        : ""}{" "}
                      first
                    </span>
                  )}
              </div>
            </div>

            {/* Lesson Title */}
            <div className="mt-4">
              <div className="text-sm font-mono mb-2 text-background/70">
                Lesson {lesson.order} of {course.lessons.length}
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                {lesson.title}
              </h1>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Lesson Navigation Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-[180px] max-h-[calc(100vh-200px)] overflow-y-auto">
                <h3 className="font-bold text-sm mb-4 font-mono border-b-3 border-foreground pb-2">
                  LESSONS
                </h3>
                <nav className="space-y-2">
                  {course.lessons
                    .sort((a, b) => a.order - b.order)
                    .map((l) => {
                      const completed = isLessonComplete(course.id, l.id);
                      const isCurrent = l.id === lesson.id;
                      return (
                        <Link
                          key={l.id}
                          to={`/courses/${course.id}/lessons/${l.id}`}
                          className={`block text-sm font-mono p-2 border-l-3 transition-all ${
                            isCurrent
                              ? "border-primary bg-primary/10 font-bold"
                              : "border-foreground/20 hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {completed ? (
                              <CheckCircle2
                                size={14}
                                className="text-primary"
                              />
                            ) : (
                              <div className="w-3.5 h-3.5 border-2 border-foreground/30 rounded-full" />
                            )}
                            <span className="flex-1 truncate">{l.title}</span>
                          </div>
                        </Link>
                      );
                    })}
                </nav>

                {/* Course Progress */}
                <div className="mt-6 pt-6 border-t-2 border-foreground/20">
                  <div className="text-xs font-mono font-bold mb-2">
                    COURSE PROGRESS
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    {
                      course.lessons.filter((l) =>
                        isLessonComplete(course.id, l.id)
                      ).length
                    }{" "}
                    / {course.lessons.length} lessons
                  </div>
                </div>
              </div>
            </aside>

            {/* Lesson Content */}
            <motion.article
              className="lg:col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Markdown Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {lesson.content}
                </ReactMarkdown>
              </div>

              {/* Exercises Section */}
              {lesson.exercises && lesson.exercises.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-accent text-foreground flex items-center justify-center">
                      <BookOpen size={24} />
                    </div>
                    <h2 className="text-3xl font-display font-bold">
                      Practice Exercises
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {lesson.exercises.map((exercise, index) => (
                      <div key={exercise.id}>
                        <div className="mb-3">
                          <span className="text-sm font-mono font-bold text-muted-foreground">
                            EXERCISE {index + 1} / {lesson.exercises.length}
                          </span>
                        </div>
                        {exercise.type === "multiple-choice" ? (
                          <ExerciseMultipleChoice
                            exercise={exercise}
                            onComplete={() =>
                              handleExerciseComplete(exercise.id)
                            }
                            isCompleted={isExerciseComplete(
                              course.id,
                              exercise.id
                            )}
                          />
                        ) : exercise.type === "code-challenge" ? (
                          <ExerciseCodeChallenge
                            exercise={exercise}
                            onComplete={() =>
                              handleExerciseComplete(exercise.id)
                            }
                            isCompleted={isExerciseComplete(
                              course.id,
                              exercise.id
                            )}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4 pt-8 border-t-4 border-foreground/20">
                {prevLesson ? (
                  <motion.button
                    onClick={handlePrevious}
                    className="border-3 border-foreground bg-background text-foreground px-6 py-4 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft size={20} />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">
                        Previous
                      </div>
                      <div className="truncate max-w-[200px]">
                        {prevLesson.title}
                      </div>
                    </div>
                  </motion.button>
                ) : (
                  <div></div>
                )}

                {nextLesson ? (
                  <motion.button
                    onClick={handleNext}
                    className="border-3 border-foreground bg-accent text-foreground px-6 py-4 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="truncate max-w-[200px]">
                        {nextLesson.title}
                      </div>
                    </div>
                    <ArrowRight size={20} />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => navigate(`/courses/${courseId}`)}
                    className="border-3 border-primary bg-primary text-background px-6 py-4 font-mono font-bold hover:bg-background hover:text-primary transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎉 Course Complete! View Certificate
                  </motion.button>
                )}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;

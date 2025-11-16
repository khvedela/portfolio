import {
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getLatestPosts } from "@/blog/posts";
import { getPublishedCourses } from "@/courses/courses";
import { Badge } from "./ui/badge";

const CVBlog = () => {
  const latestPosts = getLatestPosts(3);
  const courses = getPublishedCourses();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const postVariants = {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="mb-16 print-break-avoid" data-section="blog">
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-2">
          <motion.div
            className="w-12 h-12 bg-foreground flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            <BookOpen size={24} className="text-background" />
          </motion.div>
          <h2 className="text-4xl font-display">WRITING</h2>
        </div>
        <motion.div
          className="h-1 w-32 bg-accent ml-16"
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {latestPosts.map((post, index) => (
          <motion.article
            key={post.id}
            variants={postVariants}
            className="border-l-6 border-primary pl-8 py-4 group cursor-pointer"
            whileHover={{ x: 4 }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 20,
            }}
          >
            <Link to={`/blog/${post.id}`} className="block">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.mediumUrl && (
                  <a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-accent transition-colors no-print"
                    onClick={(e) => e.stopPropagation()}
                    title="Read on Medium"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-2 border-foreground/20 hover:border-primary transition-colors font-mono text-xs"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      {/* Courses Section */}
      {courses.length > 0 && (
        <>
          <motion.div
            className="mt-16 mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-2">
              <motion.div
                className="w-12 h-12 bg-accent flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <GraduationCap size={24} className="text-foreground" />
              </motion.div>
              <h3 className="text-3xl font-display">FREE COURSES</h3>
            </div>
            <motion.div
              className="h-1 w-32 bg-primary ml-16"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {courses.slice(0, 3).map((course) => (
              <motion.article
                key={course.id}
                variants={postVariants}
                className="border-3 border-foreground group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                whileHover={{ y: -2 }}
              >
                <Link to={`/courses/${course.id}`}>
                  <div className="bg-foreground text-background p-4 border-b-3 border-foreground">
                    <Badge className="bg-accent text-foreground border-0 font-mono font-bold mb-2">
                      {course.difficulty.toUpperCase()}
                    </Badge>
                    <h4 className="text-lg font-bold group-hover:text-accent transition-colors">
                      {course.title}
                    </h4>
                  </div>
                  <div className="p-4 bg-background">
                    <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1">
                        <BookOpen size={12} />
                        <span>{course.lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{course.duration}h</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </>
      )}

      <motion.div
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/blog"
          className="border-3 border-foreground bg-foreground text-background px-6 py-3 font-mono font-bold hover:bg-background hover:text-foreground transition-colors inline-block"
        >
          View All Posts →
        </Link>
        {courses.length > 0 && (
          <Link
            to="/courses"
            className="border-3 border-accent bg-accent text-foreground px-6 py-3 font-mono font-bold hover:bg-background hover:text-accent transition-colors inline-block"
          >
            Browse All Courses →
          </Link>
        )}
        <p className="text-muted-foreground text-sm font-mono">
          or type <span className="text-primary font-bold">blog</span> in
          terminal
        </p>
      </motion.div>
    </section>
  );
};

export default CVBlog;

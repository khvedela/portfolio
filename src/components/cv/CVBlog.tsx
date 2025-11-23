import {
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  GraduationCap,
  Radio,
  Terminal
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getLatestPosts } from "@/blog/posts";
import { getPublishedCourses } from "@/courses/courses";
import { Badge } from "../ui/badge";
import { getBlogUrl, getCoursesUrl } from "@/lib/navigation";
import RobotTrigger from "../RobotTrigger";

const CVBlog = () => {
  const latestPosts = getLatestPosts(3);
  const courses = getPublishedCourses();

  return (
    <RobotTrigger mode="contact">
    <section className="mb-20 print-break-avoid relative" data-section="blog">
      <motion.div
        className="flex items-end gap-4 mb-8 border-b-3 border-foreground pb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Data<span className="text-primary">_Transmissions</span>
        </h2>
        <div className="mb-2 text-xs font-mono text-muted-foreground hidden md:block">
          // LATEST LOGS
        </div>
      </motion.div>

      <div className="space-y-4">
        {latestPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="relative border-l-4 border-foreground/20 hover:border-primary bg-gradient-to-r from-transparent to-transparent hover:from-primary/5 hover:to-transparent transition-all duration-300 pl-6 py-2 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/blog/${post.id}`} className="block">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>LOG_ENTRY_{post.id.split('-').pop()}</span>
                <span>::</span>
                <span>{post.readTime} MIN READ</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold uppercase mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground font-mono line-clamp-2 mb-3">
                {post.excerpt}
              </p>

              <div className="flex gap-2">
                 {post.tags.map((tag) => (
                   <span key={tag} className="text-[10px] font-bold uppercase border border-foreground/20 px-2 py-0.5 text-foreground/60">
                     #{tag}
                   </span>
                 ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Courses Section */}
      {courses.length > 0 && (
        <>
          <motion.div
            className="flex items-end gap-4 mt-16 mb-8 border-b-3 border-foreground pb-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">
              Training<span className="text-accent">_Modules</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {courses.slice(0, 3).map((course) => (
              <motion.article
                key={course.id}
                className="border-2 border-foreground bg-card group hover:translate-y-[-4px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Link to={`/courses/${course.id}`}>
                  <div className="bg-foreground text-background p-3 flex justify-between items-center">
                     <span className="font-mono text-xs font-bold text-accent uppercase">{course.difficulty}</span>
                     <Radio size={14} className="animate-pulse text-accent" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold uppercase mb-2 group-hover:underline decoration-2 decoration-accent underline-offset-4">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-4 pt-4 border-t border-foreground/10">
                      <span>{course.lessons.length} MODULES</span>
                      <span>{course.duration} HRS</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </>
      )}

      <div className="mt-12 text-center">
        <a
          href={getBlogUrl()}
          className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors uppercase tracking-wider"
        >
          <Terminal size={16} />
          Access Full Archives
        </a>
      </div>
    </section>
    </RobotTrigger>
  );
};

export default CVBlog;

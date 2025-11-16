import { BookOpen, Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getLatestPosts } from "@/blog/posts";
import { Badge } from "./ui/badge";

const CVBlog = () => {
  const latestPosts = getLatestPosts(3);

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
        <p className="text-muted-foreground text-sm font-mono">
          or type <span className="text-primary font-bold">blog</span> in
          terminal
        </p>
      </motion.div>
    </section>
  );
};

export default CVBlog;

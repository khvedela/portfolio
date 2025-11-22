import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "@/blog/posts";
import { Badge } from "@/components/ui/badge";
import BrutalistTerminal from "@/components/BrutalistTerminal";
import { Helmet } from "react-helmet-async";
import { getPortfolioUrl } from "@/lib/navigation";
import { Link } from "react-router-dom";

const BlogList = () => {
  const sortedPosts = blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <>
      <Helmet>
        <title>Blog | David Khvedela - Frontend Developer</title>
        <meta
          name="description"
          content="Thoughts on code, architecture, and building things that work. Articles about Angular, TypeScript, frontend development, and software engineering."
        />
        <meta property="og:title" content="Blog | David Khvedela" />
        <meta
          property="og:description"
          content="Thoughts on code, architecture, and building things that work."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog | David Khvedela" />
        <meta
          name="twitter:description"
          content="Thoughts on code, architecture, and building things that work."
        />
      </Helmet>

      <BrutalistTerminal />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          className="bg-foreground text-background py-16 px-6 border-b-6 border-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
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
                <BookOpen size={32} className="text-background" />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                BLOG
              </h1>
            </motion.div>

            <motion.p
              className="text-xl font-mono ml-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thoughts on code, architecture, and building things that work
            </motion.p>
          </div>
        </motion.header>

        {/* Posts */}
        <motion.main
          className="max-w-4xl mx-auto px-6 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            {sortedPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={postVariants}
                className="border-l-6 border-primary pl-8 py-4 group"
                whileHover={{ x: 4 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3 font-mono">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed mb-4 text-lg">
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

                  <div className="mt-4 inline-flex items-center gap-2 text-primary font-mono font-bold group-hover:gap-4 transition-all">
                    Read article →
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground font-mono">
                No blog posts yet. Check back soon!
              </p>
            </motion.div>
          )}
        </motion.main>
      </div>
    </>
  );
};

export default BlogList;

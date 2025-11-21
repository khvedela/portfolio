import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Share2,
  Copy,
  CheckCheck,
} from "lucide-react";
import {
  getBlogPost,
  BlogPost as BlogPostType,
  blogPosts,
  getPostsByTag,
} from "@/blog/posts";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import BrutalistTerminal from "@/components/BrutalistTerminal";
import MarkdownCallout from "@/components/MarkdownCallout";
import CodeBlockWithCopy from "@/components/CodeBlockWithCopy";
import AuthorBio from "@/components/AuthorBio";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Helmet } from "react-helmet-async";
import { getPortfolioUrl } from "@/lib/navigation";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Extract headings for TOC
  const headings = useMemo(() => {
    if (!post) return [];
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    const matches = [...post.content.matchAll(headingRegex)];
    return matches.map((match) => ({
      level: match[0].split(" ")[0].length - 1, // Count # symbols minus 1 (h1=1, h2=2, h3=3)
      text: match[1],
      id: match[1].toLowerCase().replace(/[^\w]+/g, "-"),
    }));
  }, [post]);

  // Get related posts based on tags
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const related = new Set<BlogPostType>();
    post.tags.forEach((tag) => {
      getPostsByTag(tag).forEach((p) => {
        if (p.id !== post.id && related.size < 3) {
          related.add(p);
        }
      });
    });
    return Array.from(related);
  }, [post]);

  useEffect(() => {
    if (id) {
      const foundPost = getBlogPost(id);
      setPost(foundPost);
      setLoading(false);
      // Scroll to top when navigating to a new post
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));

      // Active heading detection
      // If we're at the very bottom, always highlight the last heading
      if (scrollTop + windowHeight >= documentHeight - 10) {
        if (headings.length > 0) {
          setActiveHeading(headings[headings.length - 1].id);
        }
        return;
      }

      const headingElements = headings.map((h) =>
        document.getElementById(h.id)
      );
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveHeading(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Share functions
  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = post?.title || "";
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CustomCursor />
        <div className="text-foreground font-mono">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <CustomCursor />
        <BrutalistTerminal />
        <div className="text-foreground font-mono text-xl">
          404 - Post Not Found
        </div>
        <Link
          to="/"
          className="border-3 border-foreground bg-foreground text-background px-6 py-3 font-mono font-bold hover:bg-background hover:text-foreground transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Custom components for react-markdown
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const code = String(children).replace(/\n$/, "");
      return !inline && match ? (
        <CodeBlockWithCopy code={code} language={match[1]}>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-none border-3 border-foreground/20"
            {...props}
          >
            {code}
          </SyntaxHighlighter>
        </CodeBlockWithCopy>
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
      const id = String(children)
        .toLowerCase()
        .replace(/[^\w]+/g, "-");
      return (
        <h2
          id={id}
          className="text-3xl font-bold mb-4 mt-8 border-l-6 border-primary pl-6 scroll-mt-20"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3({ children, ...props }: any) {
      const id = String(children)
        .toLowerCase()
        .replace(/[^\w]+/g, "-");
      return (
        <h3
          id={id}
          className="text-2xl font-bold mb-3 mt-6 text-primary scroll-mt-20"
          {...props}
        >
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
      // Parse blockquote content to detect callout types
      const content = String(children);

      // Check for callout markers
      if (content.includes("💡 TIP") || content.includes("**💡 TIP**")) {
        return <MarkdownCallout type="tip">{children}</MarkdownCallout>;
      }
      if (content.includes("⚠️ WARNING") || content.includes("**⚠️ WARNING**")) {
        return <MarkdownCallout type="warning">{children}</MarkdownCallout>;
      }
      if (content.includes("💡 KEY TAKEAWAYS") || content.includes("**💡 KEY TAKEAWAYS**")) {
        return <MarkdownCallout type="info">{children}</MarkdownCallout>;
      }
      if (content.includes("📝 NOTE") || content.includes("**📝 NOTE**")) {
        return <MarkdownCallout type="note">{children}</MarkdownCallout>;
      }

      // Default blockquote styling
      return (
        <blockquote
          className="border-l-6 border-accent pl-6 italic my-6 text-muted-foreground"
          {...props}
        >
          {children}
        </blockquote>
      );
    },
    table({ children, ...props }: any) {
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full border-3 border-foreground/20" {...props}>
            {children}
          </table>
        </div>
      );
    },
    thead({ children, ...props }: any) {
      return (
        <thead className="bg-foreground text-background" {...props}>
          {children}
        </thead>
      );
    },
    th({ children, ...props }: any) {
      return (
        <th
          className="border-2 border-foreground/20 px-4 py-2 text-left font-bold"
          {...props}
        >
          {children}
        </th>
      );
    },
    td({ children, ...props }: any) {
      return (
        <td className="border-2 border-foreground/20 px-4 py-2" {...props}>
          {children}
        </td>
      );
    },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | David Khvedela</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content="David Khvedela" />
      </Helmet>

      <CustomCursor />
      <BrutalistTerminal />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-primary z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          className="bg-foreground text-background py-12 px-6 border-b-6 border-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-background hover:text-accent transition-colors font-mono"
              >
                <ArrowLeft size={20} />
                <span>Back to Blog</span>
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

            <motion.h1
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-mono mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-2 border-background/50 text-background font-mono"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {post.mediumUrl && (
              <motion.a
                href={post.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-background hover:text-accent transition-colors font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ExternalLink size={16} />
                <span>Also on Medium</span>
              </motion.a>
            )}
          </div>
        </motion.header>

        {/* Main Content with TOC */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:flex lg:gap-12">
          {/* Table of Contents - Desktop Only */}
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-bold text-lg mb-4 font-mono border-b-3 border-foreground pb-2">
                  TABLE OF CONTENTS
                </h3>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm font-mono transition-colors ${heading.level === 2 ? "font-bold" : "ml-4"
                        } ${activeHeading === heading.id
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>

                {/* Social Share Buttons in TOC */}
                <div className="mt-8 pt-6 border-t-3 border-foreground/20">
                  <h4 className="font-bold text-sm mb-4 font-mono">SHARE</h4>
                  <div className="space-y-2">
                    <button
                      onClick={shareOnLinkedIn}
                      className="w-full border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-xs hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                    >
                      <Share2 size={14} />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="w-full border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-xs hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                    >
                      <Share2 size={14} />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={copyLink}
                      className="w-full border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-xs hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                    >
                      {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                      <span>{copied ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Content */}
          <motion.article
            className="flex-1 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-a:text-accent prose-strong:text-primary">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Author Bio */}
            <AuthorBio />

            {/* Social Share Buttons - Mobile */}
            <div className="lg:hidden mt-12 pt-8 border-t-3 border-foreground/20">
              <h3 className="font-bold text-lg mb-4 font-mono">
                SHARE THIS POST
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={shareOnLinkedIn}
                  className="border-3 border-foreground bg-background text-foreground px-6 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                >
                  <Share2 size={18} />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="border-3 border-foreground bg-background text-foreground px-6 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                >
                  <Share2 size={18} />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={copyLink}
                  className="border-3 border-foreground bg-background text-foreground px-6 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                >
                  {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                className="mt-16 pt-8 border-t-3 border-foreground/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-bold text-2xl mb-6 font-mono">
                  RELATED POSTS
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="border-3 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors group"
                    >
                      <h4 className="font-bold text-lg mb-2 font-mono line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-background/80 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <Clock size={12} />
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              className="mt-16 pt-8 border-t-3 border-foreground/20 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 border-3 border-foreground bg-foreground text-background px-6 py-3 font-mono font-bold hover:bg-background hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Blog</span>
              </Link>
              <a
                href={getPortfolioUrl()}
                className="inline-flex items-center gap-2 border-3 border-foreground bg-background text-foreground px-6 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Portfolio</span>
              </a>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </>
  );
};

export default BlogPost;

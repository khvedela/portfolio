import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const AuthorBio = () => {
  return (
    <motion.div
      className="mt-16 pt-8 border-t-3 border-foreground/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="border-6 border-foreground p-8 bg-muted/50">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar placeholder - you can replace with actual image */}
          <div className="w-24 h-24 bg-primary flex items-center justify-center text-background font-display text-4xl font-bold flex-shrink-0">
            DK
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-display font-bold mb-2">
              David Khvedelidze
            </h3>
            <p className="text-muted-foreground font-mono text-sm mb-4">
              Senior Frontend Engineer @ TBC Bank
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Building things that just work for daily users. Obsessed with
              performance, type safety, and developer experience. Angular
              advocate. No corporate buzzwords, just real engineering.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:your@email.com"
                className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                <Mail size={16} />
                <span>Contact</span>
              </a>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary font-mono font-bold hover:underline"
            >
              View Full Portfolio →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorBio;

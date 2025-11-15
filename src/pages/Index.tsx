import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "@/blog/posts";
import CVHeader from "@/components/CVHeader";
import CVAbout from "@/components/CVAbout";
import CVCaseStudies from "@/components/CVCaseStudies";
import CVTechStack from "@/components/CVTechStack";
import CVEducation from "@/components/CVEducation";
import CVLanguages from "@/components/CVLanguages";
import CVBlog from "@/components/CVBlog";
import CustomCursor from "@/components/CustomCursor";
import BrutalistProgressBar from "@/components/BrutalistProgressBar";
import ASCIILoadingScreen from "@/components/ASCIILoadingScreen";
import BrutalistTerminal from "@/components/BrutalistTerminal";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check system preference
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

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      {/* Custom cursor - always visible */}
      <CustomCursor />

      {/* Brutalist Terminal - toggleable with 't' key */}
      <BrutalistTerminal />

      {/* Show only loading screen if it hasn't been dismissed */}
      <AnimatePresence mode="wait">
        {showLoading && (
          <ASCIILoadingScreen
            key="loading"
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      {/* Only render main content after loading is complete */}
      {!showLoading && (
        <div className="min-h-screen bg-background transition-colors duration-200">
          {/* Brutalist progress bar */}
          <BrutalistProgressBar />

          {/* Fixed action buttons - top right */}
          <motion.div
            className="no-print fixed top-6 right-6 z-50 flex flex-col gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Blog button */}
            <Link to="/blog">
              <motion.button
                className="w-14 h-14 bg-primary text-primary-foreground border-3 border-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center font-bold relative group"
                aria-label="View blog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                {/* New badge indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent border-2 border-foreground flex items-center justify-center text-[10px] font-bold"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {blogPosts.length}
                </motion.div>
                {/* Tooltip */}
                <motion.div
                  className="absolute right-full mr-3 bg-foreground text-background px-3 py-2 text-sm font-mono whitespace-nowrap border-3 border-foreground opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  READ BLOG
                </motion.div>
              </motion.button>
            </Link>

            {/* Theme toggle button */}
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

          <CVHeader />

          <main className="max-w-4xl mx-auto px-6 py-16 print:py-8 relative">
            {/* Decorative grid background */}
            <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>

            <div className="relative">
              <CVAbout />
              <CVCaseStudies />
              <CVTechStack />
              <CVBlog />
              <CVEducation />
              <CVLanguages />
            </div>
          </main>

          {/* Footer - brutalist */}
          <motion.footer
            className="no-print border-t-5 border-foreground py-10 px-6 mt-20 bg-foreground text-background relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Diagonal stripes */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(var(--background)),
            hsl(var(--background)) 10px,
            transparent 10px,
            transparent 20px
          )`,
              }}
            ></div>

            <motion.div
              className="max-w-4xl mx-auto text-center relative z-10"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-mono text-sm mb-3 uppercase tracking-widest">
                Built with Love, Confidence and Coffee
              </p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <motion.div
                  className="h-px w-12 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                <p className="text-xs font-mono">
                  No AI-generated corporate poetry. No spinning cubes. Just work
                  that matters.
                </p>
                <motion.div
                  className="h-px w-12 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.footer>
        </div>
      )}
    </>
  );
};

export default Index;

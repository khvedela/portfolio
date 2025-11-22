import { Moon, Sun } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "@/blog/posts";

const CVHeader = lazy(() => import("@/components/cv/CVHeader"));
const CVAbout = lazy(() => import("@/components/cv/CVAbout"));
const CVCaseStudies = lazy(() => import("@/components/cv/CVCaseStudies"));
const CVTechStack = lazy(() => import("@/components/cv/CVTechStack"));
const CVEducation = lazy(() => import("@/components/cv/CVEducation"));
const CVLanguages = lazy(() => import("@/components/cv/CVLanguages"));
const CVBlog = lazy(() => import("@/components/cv/CVBlog"));
import BrutalistProgressBar from "@/components/BrutalistProgressBar";
import ASCIILoadingScreen from "@/components/ASCIILoadingScreen";

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
      {/* Custom cursor - removed as it is now global */}


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
        <div className="min-h-screen transition-colors duration-200">
          {/* Brutalist progress bar */}
          <BrutalistProgressBar />

          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center font-mono">Loading...</div>}>
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
          </Suspense>

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

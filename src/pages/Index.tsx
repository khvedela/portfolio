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
      {/* Global Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] opacity-50" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] bg-repeat" />

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
        <div className="min-h-screen transition-colors duration-200 relative overflow-hidden">
           
          {/* Background Grid - Fixed */}
          <div className="fixed inset-0 bg-grid-large opacity-[0.03] pointer-events-none" />

          {/* Brutalist progress bar */}
          <BrutalistProgressBar />

          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center font-mono">Loading System Modules...</div>}>
            <CVHeader />

            <main className="max-w-4xl mx-auto px-4 md:px-6 py-16 print:py-8 relative z-10">
              
              <div className="relative space-y-24">
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
            className="no-print border-t-4 border-foreground py-12 px-6 mt-20 bg-foreground text-background relative overflow-hidden"
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
              <p className="font-mono text-sm mb-4 uppercase tracking-widest flex items-center justify-center gap-2">
                 <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                 System Status: Operational
              </p>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  className="h-px w-12 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                <p className="text-xs font-mono opacity-70">
                  NO AI POETRY. NO SPINNING CUBES. JUST RAW DATA.
                </p>
                <motion.div
                  className="h-px w-12 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </div>
              
              <div className="font-mono text-[10px] text-muted-foreground">
                 BUILD_ID: 2025.11.23.RELEASE // PARIS_SECTOR
              </div>
            </motion.div>
          </motion.footer>
        </div>
      )}
    </>
  );
};

export default Index;

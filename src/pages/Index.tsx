import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CVHeader from "@/components/CVHeader";
import CVAbout from "@/components/CVAbout";
import CVCaseStudies from "@/components/CVCaseStudies";
import CVTechStack from "@/components/CVTechStack";
import CVEducation from "@/components/CVEducation";
import CVLanguages from "@/components/CVLanguages";
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

          {/* Theme toggle button - brutalist style */}
          <motion.div
            className="no-print fixed top-6 right-6 z-50"
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

          <CVHeader />

          <main className="max-w-4xl mx-auto px-6 py-16 print:py-8 relative">
            {/* Decorative grid background */}
            <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>

            <div className="relative">
              <CVAbout />
              <CVCaseStudies />
              <CVTechStack />
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

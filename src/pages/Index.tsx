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
import CommandMenu from "@/components/CommandMenu";

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

      {/* Command Menu - fixed position */}
      <CommandMenu isDark={isDark} onToggleTheme={toggleTheme} />

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

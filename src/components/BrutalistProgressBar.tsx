import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const BrutalistProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = useMemo(
    () => [
      { label: "TOP", id: "top", threshold: 0 },
      { label: "ABOUT", id: "about", threshold: 15 },
      { label: "WORK", id: "work", threshold: 35 },
      { label: "TECH", id: "tech", threshold: 60 },
      { label: "EDU", id: "education", threshold: 80 },
      { label: "END", id: "end", threshold: 95 },
    ],
    []
  );

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Fix the 99% issue by rounding and ensuring 100 at the end
      const percentage = latest >= 0.995 ? 100 : Math.round(latest * 100);
      setScrollPercentage(percentage);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const updateCurrentSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get all section elements
      const sectionElements = sections
        .map((s) => {
          if (s.id === "top") return { id: s.id, top: 0 };
          if (s.id === "end")
            return { id: s.id, top: document.documentElement.scrollHeight };
          const el = document.querySelector(`[data-section="${s.id}"]`);
          return el
            ? { id: s.id, top: el.getBoundingClientRect().top + scrollPosition }
            : null;
        })
        .filter(Boolean);

      // Find the current section based on scroll position
      let currentIndex = 0;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (
          sectionElements[i] &&
          scrollPosition >= sectionElements[i].top - windowHeight / 3
        ) {
          currentIndex = i;
          break;
        }
      }

      setCurrentSectionIndex(currentIndex);
    };

    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    updateCurrentSection(); // Initial check

    return () => window.removeEventListener("scroll", updateCurrentSection);
  }, [sections]);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "end") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Use a more reliable selector and add a small delay for the query
      requestAnimationFrame(() => {
        const section = document.querySelector(`[data-section="${id}"]`);
        if (section) {
          const yOffset = -20; // Small offset from top
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-foreground/10 no-print">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background: `linear-gradient(90deg, 
              hsl(var(--primary)) 0%, 
              hsl(var(--primary)) 50%, 
              hsl(var(--accent)) 100%
            )`,
          }}
        />
      </div>

      {/* Mobile progress indicator - compact version, far right */}
      <motion.div
        className="no-print lg:hidden fixed bottom-4 right-4 z-50 bg-foreground text-background border-3 border-foreground font-mono font-bold select-none cursor-pointer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <div className="px-3 py-2 text-sm leading-none flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary"
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <span>{scrollPercentage}%</span>
        </div>

        {/* Expandable navigation menu */}
        {isOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-foreground border-3 border-foreground min-w-[120px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection(section.id);
                }}
                className={`w-full px-4 py-2 text-left text-xs uppercase tracking-wider hover:bg-primary hover:text-foreground transition-colors ${
                  index !== sections.length - 1
                    ? "border-b-2 border-foreground"
                    : ""
                }`}
              >
                {section.label}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Right side section markers - DESKTOP ONLY - Clickable with animations */}
      <div className="no-print hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
        {sections.map((marker, index) => {
          const isActive = index <= currentSectionIndex;
          const isCurrentSection = index === currentSectionIndex;

          return (
            <button
              key={marker.label}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(marker.id);
              }}
              className="relative group cursor-pointer"
              style={{
                transform: isCurrentSection
                  ? "translateX(-12px)"
                  : "translateX(0)",
                transition: "transform 0.15s cubic-bezier(0.2, 0, 0.8, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(-12px)";
              }}
              onMouseLeave={(e) => {
                if (!isCurrentSection) {
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              {/* Active indicator line */}
              {(isActive || isCurrentSection) && (
                <div
                  className="absolute right-full top-1/2 -translate-y-1/2 h-px bg-primary origin-right mr-1"
                  style={{
                    width: isCurrentSection ? "20px" : "12px",
                    transition: "width 0.2s ease-out",
                  }}
                />
              )}

              <div
                className={`w-16 h-10 border-l-3 border-y-3 border-foreground flex items-center justify-center text-[11px] font-mono font-bold transition-colors duration-150 ${
                  isCurrentSection
                    ? "bg-primary text-foreground shadow-[-4px_4px_0_hsl(var(--primary)/0.3)]"
                    : isActive
                    ? "bg-accent/20 text-foreground hover:bg-accent/40"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {marker.label}
              </div>

              {/* Hover tooltip */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-20 px-3 py-1.5 bg-foreground text-background text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none border-2 border-foreground transition-opacity duration-150">
                Go to {marker.label}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default BrutalistProgressBar;

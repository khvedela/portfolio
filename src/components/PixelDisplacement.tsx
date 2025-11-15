import { useEffect } from "react";

const PixelDisplacement = () => {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const createGlitchClone = (element: HTMLElement) => {
      // Create RGB split clones
      const clone1 = element.cloneNode(true) as HTMLElement;
      const clone2 = element.cloneNode(true) as HTMLElement;

      // Style the clones for RGB split
      clone1.style.position = "absolute";
      clone1.style.top = "0";
      clone1.style.left = "0";
      clone1.style.width = "100%";
      clone1.style.height = "100%";
      clone1.style.mixBlendMode = "screen";
      clone1.style.color = "hsl(var(--primary))";
      clone1.style.opacity = "0.7";
      clone1.style.pointerEvents = "none";
      clone1.style.transform = "translate(-3px, 0)";
      clone1.style.zIndex = "1";

      clone2.style.position = "absolute";
      clone2.style.top = "0";
      clone2.style.left = "0";
      clone2.style.width = "100%";
      clone2.style.height = "100%";
      clone2.style.mixBlendMode = "screen";
      clone2.style.color = "hsl(var(--accent))";
      clone2.style.opacity = "0.7";
      clone2.style.pointerEvents = "none";
      clone2.style.transform = "translate(3px, 0)";
      clone2.style.zIndex = "1";

      // Make parent relative if needed
      const position = window.getComputedStyle(element).position;
      if (position === "static") {
        element.style.position = "relative";
      }

      element.appendChild(clone1);
      element.appendChild(clone2);

      // Remove clones after animation
      setTimeout(() => {
        clone1.remove();
        clone2.remove();
      }, 150);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollVelocity = Math.abs(currentScrollY - lastScrollY);

      if (scrollVelocity > 15 && !ticking) {
        ticking = true;

        // Select random section to glitch
        const sections = Array.from(
          document.querySelectorAll(
            "section, h1, h2, .border-brutalist, button"
          )
        );
        const randomSections = sections
          .sort(() => Math.random() - 0.5)
          .slice(0, 2 + Math.floor(Math.random() * 2)); // 2-3 random elements

        randomSections.forEach((section) => {
          const element = section as HTMLElement;
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;

          if (isInView) {
            // RGB split glitch effect
            createGlitchClone(element);

            // Brief shake
            const shake = Math.random() > 0.5 ? 2 : -2;
            element.style.transform = `translateX(${shake}px)`;
            element.style.transition = "none";

            setTimeout(() => {
              element.style.transform = "";
              element.style.transition = "transform 0.1s ease";
            }, 80);
          }
        });

        setTimeout(() => {
          ticking = false;
        }, 200);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default PixelDisplacement;

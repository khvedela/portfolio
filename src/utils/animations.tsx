import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

// GSAP plugins and setup
gsap.registerPlugin(ScrollTrigger);

// Custom hook for applying scroll animations
export function useScrollAnimations() {
  const elementRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Wait a bit for page transition animations to finish
    const scrollAnimDelay = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate in elements with scroll-animate class
        gsap.utils
          .toArray<HTMLElement>(".scroll-animate")
          .forEach((element) => {
            // Ensure it's visible initially if not in viewport
            gsap.set(element, { opacity: 0 });

            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          });

        // Staggered animations for items
        gsap.utils
          .toArray<HTMLElement>(".scroll-stagger-container")
          .forEach((container) => {
            const items = container.querySelectorAll(".scroll-stagger-item");

            // Ensure items are visible initially
            gsap.set(items, { opacity: 1 });

            gsap.fromTo(
              items,
              {
                y: 20,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: container,
                  start: "top 80%",
                },
              }
            );
          });
      }, elementRef);

      return () => ctx.revert();
    }, 600); // Delay to let page transitions complete

    return () => clearTimeout(scrollAnimDelay);
  }, [pathname]); // Re-run when pathname changes

  return elementRef;
}

// Custom hook for parallax effects
export function useParallax() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Apply parallax to elements with parallax class
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((element) => {
        const depth = element.dataset.depth || "0.2";
        const movement = parseFloat(depth) * 100;

        gsap.to(element, {
          y: `${movement}%`,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, parallaxRef);

    return () => ctx.revert();
  }, []);

  return parallaxRef;
}

export default {
  useScrollAnimations,
  useParallax,
};

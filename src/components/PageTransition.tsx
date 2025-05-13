"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Track pathname for animation resets

  // Ensure the overlay exists when the component mounts
  useEffect(() => {
    // Check if overlay exists
    let overlay = document.getElementById("global-page-transition-overlay");

    // If it doesn't exist, create it
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "global-page-transition-overlay";
      overlay.className = "page-transition-overlay";
      document.body.appendChild(overlay);
    }

    // Ensure overlay is properly styled and positioned
    gsap.set(overlay, {
      scaleY: 0,
      transformOrigin: "top",
      pointerEvents: "none",
    });

    // Clean up only if component is root
    return () => {
      // Don't remove the overlay as it's shared across routes
    };
  }, []);

  // Run animation on component mount (page enter) or route change
  useLayoutEffect(() => {
    // Wait a moment for the DOM to settle
    const animationDelay = 50;

    const timeoutId = setTimeout(() => {
      // Create a clean context for GSAP animations
      const ctx = gsap.context(() => {
        // Kill all existing animations to prevent conflicts
        gsap.killTweensOf("*");

        // Prepare the page for animation
        gsap.set(pageRef.current, {
          opacity: 0,
          y: 10,
        });

        // Ensure skill tags and other elements are visible initially
        gsap.set([".skill-tag", ".profile-image"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        // Create a master timeline for the page animations
        const masterTimeline = gsap.timeline({
          defaults: { duration: 0.5, ease: "power2.out" },
        });

        // Page enter animation - initial fade in
        masterTimeline
          .to(pageRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            clearProps: "opacity,transform", // Clear after animation to avoid conflicts
          })
          .from(
            ".animate-item",
            {
              opacity: 0,
              y: 30,
              stagger: 0.08,
              duration: 0.5,
              ease: "back.out(1.2)",
              clearProps: "opacity,transform", // Clear after animation to avoid conflicts
            },
            "-=0.2"
          );

        // Special animation for profile image with a slight bounce
        if (document.querySelector(".profile-image")) {
          masterTimeline.from(
            ".profile-image",
            {
              scale: 0.9,
              opacity: 0.5,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              clearProps: "scale,opacity", // Clear after animation
            },
            "-=0.4"
          );
        }

        // Special animation for skill tags with staggered effect
        if (document.querySelectorAll(".skill-tag").length > 0) {
          masterTimeline.from(
            ".skill-tag",
            {
              opacity: 0,
              y: 15,
              stagger: 0.03,
              duration: 0.4,
              ease: "back.out(1.7)",
              clearProps: "opacity,transform", // Clear after animation
            },
            "-=0.2"
          );
        }
      }, pageRef);

      // Cleanup
      return () => ctx.revert();
    }, animationDelay);

    return () => clearTimeout(timeoutId);
  }, [pathname]); // Re-run when pathname changes

  return (
    <div ref={pageRef} className="page-transition-container w-full">
      {children}
    </div>
  );
}

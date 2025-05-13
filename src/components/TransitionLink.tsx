"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

// Wrapper for Link component with transition support
export default function TransitionLink({
  href,
  children,
  className,
  delay = 0.5,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationRef = useRef<gsap.Context | null>(null);

  // Handle the link click with animation
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't transition if clicking the current page
    if (pathname === href) return;

    e.preventDefault();

    // Don't allow multiple transitions at once
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Get the overlay element (should always exist now)
    const overlay = document.getElementById("global-page-transition-overlay");
    if (!overlay) {
      // Fallback: just navigate directly if overlay missing
      router.push(href);
      return;
    }

    // Kill any existing animations on the overlay
    gsap.killTweensOf(overlay);

    // Create a timeline for the transition
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Apply overlay blocking during transition
          overlay.style.pointerEvents = "auto";

          router.push(href);

          // After navigation, animate the overlay out with a clean completion callback
          setTimeout(() => {
            gsap.to(overlay, {
              scaleY: 0,
              transformOrigin: "top",
              duration: 0.6,
              ease: "power1.inOut",
              onComplete: () => {
                setIsTransitioning(false);
                // Remove pointer-events blocking after animation
                overlay.style.pointerEvents = "none";
              },
            });
          }, 100); // Short delay to ensure router navigation completes
        },
      });

      // Fade out current page content
      tl.to(".page-transition-container", {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate the overlay in
      tl.to(
        overlay,
        {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.1"
      );
    });

    // Store animation context for cleanup
    if (animationRef.current) {
      animationRef.current.revert();
    }
    animationRef.current = ctx;
  };

  // Clean up animations when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.revert();
      }
    };
  }, []);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-disabled={isTransitioning}
    >
      {children}
    </Link>
  );
}

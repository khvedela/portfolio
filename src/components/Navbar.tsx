"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";

function useSlideAnimation<T extends HTMLElement>() {
  const refs = useRef<(T | null)[]>([]);

  const animate = useCallback((index: number) => {
    const el = refs.current[index];
    if (!el) return;
    import("gsap").then(({ gsap }) => {
      gsap.killTweensOf(el);
      const tl = gsap.timeline();
      tl.fromTo(
        el,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.4, ease: "power2.out" }
      ).fromTo(
        el,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.4, ease: "power2.out" }
      );
    });
  }, []);

  useEffect(() => {
    return () => {
      refs.current.forEach((el) => {
        if (el) import("gsap").then(({ gsap }) => gsap.killTweensOf(el));
      });
    };
  }, []);

  return { refs, animate } as const;
}

interface NavLinkProps {
  label: string;
  href: string;
  index: number;
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  animate: (index: number) => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

function NavLink({
  label,
  href,
  index,
  refs,
  animate,
  isActive,
  isDisabled,
}: NavLinkProps) {
  const handleEnter = useCallback(() => {
    if (!isDisabled) animate(index);
  }, [animate, index, isDisabled]);

  return (
    <li
      className={`overflow-hidden ${
        isDisabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
      role="menuitem"
      onMouseEnter={handleEnter}
    >
      {isDisabled ? (
        <span className="block text-gray-400 cursor-not-allowed">
          <span
            ref={(el) => {
              refs.current[index] = el;
            }}
            className={`inline-block ${
              isActive ? "text-yellow-300 font-medium" : ""
            }`}
          >
            {label}
          </span>
        </span>
      ) : (
        <Link href={href} className="block focus:outline-none">
          <span
            ref={(el) => {
              refs.current[index] = el;
            }}
            className={`inline-block ${
              isActive ? "text-yellow-300 font-medium" : ""
            }`}
          >
            {label}
          </span>
        </Link>
      )}
    </li>
  );
}

export default function Navbar() {
  const navItems: { label: string; href: string; implemented: boolean }[] = [
    { label: "Home", href: "/home", implemented: true },
    { label: "Work", href: "/work", implemented: false },
    { label: "About", href: "/about", implemented: false },
    { label: "Playground", href: "/playground", implemented: false },
    { label: "Resource", href: "/resource", implemented: false },
  ];
  const { refs, animate } = useSlideAnimation<HTMLSpanElement>();

  // Get current path to determine active link
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const originalEmail = "davidkhvedelidze@gmail.com";
  const copyLabel = "copy email";

  const [emailLabel, setEmailLabel] = useState(originalEmail);
  const emailSpanRef = useRef<HTMLSpanElement | null>(null);

  // Apply animation to email similar to nav links
  const handleEmailAnimation = useCallback(() => {
    const el = emailSpanRef.current;
    if (!el) return;
    import("gsap").then(({ gsap }) => {
      gsap.killTweensOf(el);
      const tl = gsap.timeline();
      tl.fromTo(
        el,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.4, ease: "power2.out" }
      ).fromTo(
        el,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.4, ease: "power2.out" }
      );
    });
  }, []);

  const transitionEmail = useCallback((newLabel: string) => {
    const el = emailSpanRef.current;
    if (!el) return;
    import("gsap").then(({ gsap }) => {
      gsap.killTweensOf(el);
      const tl = gsap.timeline();
      tl.to(el, { yPercent: -100, duration: 0.4, ease: "power2.out" })
        .add(() => setEmailLabel(newLabel))
        .fromTo(
          el,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.4, ease: "power2.out" }
        );
    });
  }, []);

  const handleEmailMouseEnter = useCallback(() => {
    handleEmailAnimation(); // Add animation
    transitionEmail(copyLabel);
  }, [transitionEmail, handleEmailAnimation]);

  const handleEmailMouseLeave = useCallback(
    () => transitionEmail(originalEmail),
    [transitionEmail]
  );

  const handleEmailClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigator.clipboard.writeText(originalEmail);
      const el = emailSpanRef.current;
      if (!el) return;
      import("gsap").then(({ gsap }) => {
        gsap.killTweensOf(el);
        const tl = gsap.timeline();
        tl.to(el, { yPercent: -100, duration: 0.4, ease: "power2.out" })
          .add(() => setEmailLabel("Copied"))
          .fromTo(
            el,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.4, ease: "power2.out" }
          )
          .addPause("+=1.5")
          .to(el, { yPercent: -100, duration: 0.4, ease: "power2.out" })
          .add(() => setEmailLabel(originalEmail))
          .fromTo(
            el,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.4, ease: "power2.out" }
          );
      });
    },
    [originalEmail]
  );

  const navRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    import("gsap").then(({ gsap }) => {
      gsap.from(el, {
        yPercent: -100,
        duration: 0.6,
        ease: "bounce.out",
      });
    });
  }, []);

  // Add animation when mobile menu state changes
  useEffect(() => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    import("gsap").then(({ gsap }) => {
      if (mobileMenuOpen) {
        // Animate menu opening
        gsap.fromTo(
          menuEl,
          {
            height: 0,
            opacity: 0,
            transformOrigin: "top center",
          },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );

        // Animate menu items
        gsap.fromTo(
          menuEl.querySelectorAll("li"),
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.3,
            delay: 0.1,
            ease: "back.out(1.7)",
          }
        );
      } else {
        // Animate menu closing
        gsap.to(menuEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className="m-auto w-full px-4 sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-1/2" // Reduced width from 2/3 to 1/2
    >
      {/* Desktop Navigation */}
      <ul
        role="menubar"
        className="text-white hidden md:flex items-center justify-between bg-[#111] px-3 sm:px-6 py-2 rounded-full mt-3 max-w-3xl mx-auto" // Added max-width constraint and mx-auto
      >
        {navItems.map((item, i) => (
          <NavLink
            key={item.label}
            label={item.label}
            href={item.href}
            index={i}
            refs={refs}
            animate={animate}
            isActive={currentPath === item.href}
            isDisabled={!item.implemented}
          />
        ))}
        <li
          role="menuitem"
          className="overflow-hidden bg-white rounded-full px-2 sm:px-4 py-1 text-xs sm:text-sm"
          onMouseEnter={handleEmailMouseEnter}
          onMouseLeave={handleEmailMouseLeave}
        >
          <a
            href="#"
            onClick={handleEmailClick}
            className="block focus:outline-none text-[#111]"
          >
            <span
              ref={(el) => {
                emailSpanRef.current = el;
              }}
              className="inline-flex w-full sm:w-56 items-center justify-center gap-1 text-center"
            >
              {emailLabel}
              {emailLabel === "Copied" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </a>
        </li>
      </ul>

      {/* Mobile Navigation Button */}
      <div className="md:hidden flex justify-between items-center bg-[#111] px-4 py-2 rounded-full mt-3 max-w-xs mx-auto">
        {" "}
        {/* Added max-width and mx-auto */}
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <li
          role="menuitem"
          className="list-none overflow-hidden bg-white rounded-full px-2 py-1 text-xs"
          onMouseEnter={handleEmailMouseEnter}
          onMouseLeave={handleEmailMouseLeave}
        >
          <a
            href="#"
            onClick={handleEmailClick}
            className="block focus:outline-none text-[#111]"
          >
            <span
              ref={(el) => {
                emailSpanRef.current = el;
              }}
              className="inline-flex items-center justify-center gap-1 text-center"
            >
              {emailLabel === originalEmail ? "Email" : emailLabel}
              {emailLabel === "Copied" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </a>
        </li>
      </div>

      {/* Mobile Menu Dropdown - Added ref and always render it for animation */}
      <ul
        ref={mobileMenuRef}
        className={`md:hidden bg-[#111] mt-2 rounded-xl p-4 text-white overflow-hidden max-w-xs mx-auto ${
          !mobileMenuOpen ? "h-0 p-0" : ""
        }`}
        style={{ height: 0, opacity: 0 }}
      >
        {navItems.map((item, i) => (
          <li
            key={item.label}
            className={`py-2 text-center ${
              !item.implemented ? "opacity-40 cursor-not-allowed" : ""
            } ${
              currentPath === item.href ? "text-yellow-300 font-medium" : ""
            }`}
          >
            {item.implemented ? (
              <Link href={item.href} className="block focus:outline-none">
                {item.label}
              </Link>
            ) : (
              <span className="block">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(numberRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
    if (textRef.current) {
      tl.from(
        textRef.current.children,
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1
        ref={numberRef}
        className="text-9xl font-black text-gray-900 tracking-widest"
      >
        404
      </h1>
      <div ref={textRef} className="mt-8 space-y-6">
        <h2 className="text-2xl font-medium">Oops! Page not found</h2>
        <p className="max-w-md mx-auto text-gray-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/home"
          className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

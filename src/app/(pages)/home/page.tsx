"use client";

export const runtime = "edge";

import { Canvas } from "@react-three/fiber";
import GeometryTopology from "@/components/GeometryTopology";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const textRef = useRef({} as any);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    // Create main timeline for all animations - run immediately
    const mainTl = gsap.timeline();

    // Get elements
    const canvasContainer = canvasContainerRef.current;

    gsap.set(canvasContainer, {
      width: "100%", // Start at full width to show geometry immediately
      opacity: 1, // Start fully visible
    });
  }, []);

  // Split first and last name for responsive display
  const firstName = "DAVID";
  const lastName = "KHVEDELIDZE";

  // Create individual letters for the first name with improved styling
  const firstNameLetters = firstName.split("").map((letter, index) => (
    <span
      key={`first-${index}`}
      className="letter inline-block overflow-visible px-[0.01em] font-extrabold"
    >
      {letter}
    </span>
  ));

  // Create individual letters for the last name with improved styling
  const lastNameLetters = lastName.split("").map((letter, index) => (
    <span
      key={`last-${index}`}
      className="letter inline-block overflow-visible px-[0.01em] font-extrabold"
    >
      {letter}
    </span>
  ));

  return (
    <>
      <div className="flex gap-3">
        <h1 className="text-xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-black text-left leading-tight perspective-500 select-none relative z-10">
          DAVID
        </h1>
        <h1 className="text-xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-black text-left leading-tight perspective-500 select-none relative z-10">
          KHVEDELIDZE
        </h1>
      </div>
      <div
        ref={canvasContainerRef}
        className="w-full h-[70vh] flex cursor-pointer"
      >
        <Canvas
          className="!w-[100%]"
          dpr={[1, 2]} // Responsive device pixel ratio
          gl={{
            antialias: true,
            alpha: true, // Make canvas transparent
            premultipliedAlpha: true, // Proper alpha blending
          }}
        >
          <GeometryTopology animateIn={true} />
        </Canvas>
      </div>
    </>
  );
}

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
    const letters = textRef.current.querySelectorAll(".letter");
    const canvasContainer = canvasContainerRef.current;

    // Set initial states
    gsap.set(letters, {
      y: 100,
      opacity: 0,
      transformOrigin: "50% 50%",
    });

    gsap.set(canvasContainer, {
      width: "100%", // Start at full width to show geometry immediately
      opacity: 1, // Start fully visible
    });

    // Text animation sequence
    const textTl = gsap.timeline();
    textTl
      .to(letters, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.06,
        ease: "back.out(1.2)",
      })
      .to(letters, {
        duration: 0.3,
        y: -5,
        stagger: 0.03,
        ease: "elastic.out(1.2, 0.5)",
        yoyo: true,
        repeat: 1,
      });

    // Add sequences to main timeline - start text animation simultaneously with geometry
    mainTl.add(textTl, 0);
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
      <div
        ref={textRef}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-left leading-tight perspective-500 select-none"
      >
        <div className="block md:inline">{firstNameLetters}</div>
        <div className="block md:inline md:ml-5">{lastNameLetters}</div>
      </div>
      <div
        ref={canvasContainerRef}
        className="w-full h-[70vh] flex cursor-pointer"
      >
        <Canvas
          className="!w-[100%]"
          dpr={[1, 2]} // Responsive device pixel ratio
          gl={{ antialias: true }}
        >
          <GeometryTopology animateIn={true} />
        </Canvas>
      </div>
    </>
  );
}

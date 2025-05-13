"use client";

export const runtime = "edge";

import { Canvas } from "@react-three/fiber";
import GeometryTopology from "@/components/GeometryTopology";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    // Get elements
    const canvasContainer = canvasContainerRef.current;

    gsap.set(canvasContainer, {
      width: "100%", // Start at full width to show geometry immediately
      opacity: 1, // Start fully visible
    });
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 w-full items-start">
        <h1 className="whitespace-nowrap text-[8vw] sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-black text-left leading-tight perspective-500 select-none relative z-10">
          DAVID
        </h1>
        <h1 className="whitespace-nowrap text-[8vw] sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-black text-left leading-tight perspective-500 select-none relative z-10">
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

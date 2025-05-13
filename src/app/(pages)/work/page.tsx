"use client";

import ProjectShowcase from "../../../components/ProjectShowcase";
import { useRef } from "react";

export default function WorkPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="min-h-[85vh]">
      <h1 className="text-3xl font-bold mb-6 animate-item">My Work</h1>
      <div className="animate-item">
        <ProjectShowcase />
      </div>
    </div>
  );
}

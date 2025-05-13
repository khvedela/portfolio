"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollAnimations } from "../utils/animations";

const projects = [
  {
    title: "TBC Personal Banking Dashboard",
    description:
      "Redesigned the personal banking dashboard for TBC Bank, improving user engagement by 35%. Built with React, Redux, and custom visualization components.",
    image: "/noise256.jpg",
    link: "/work/tbc-dashboard",
  },
  {
    title: "Financial Analytics Platform",
    description:
      "Developed a comprehensive financial analytics platform at Optio.AI featuring interactive charts and real-time data visualization. Uses Next.js, TypeScript, and D3.js.",
    image: "/noise256.jpg",
    link: "/work/financial-analytics",
  },
  {
    title: "E-commerce Checkout Experience",
    description:
      "Redesigned checkout experience for a major e-commerce platform, reducing cart abandonment by 25%. Built with React, Redux, and Stripe integration.",
    image: "/noise256.jpg",
    link: "/work/ecommerce-checkout",
  },
  {
    title: "3D Portfolio Gallery",
    description:
      "Personal project showcasing interactive 3D models and animations. Built with Three.js, React Three Fiber, and GSAP for smooth transitions.",
    image: "/noise256.jpg",
    link: "/work/3d-gallery",
  },
];

export default function ProjectShowcase() {
  const projectsRef = useRef<HTMLDivElement>(null);

  // We'll only use this ref for scroll animations, not for page transitions
  const scrollRef = useScrollAnimations();

  return (
    <section className="py-8 min-h-[60vh]" ref={scrollRef}>
      <h2 className="text-2xl font-bold text-center mb-6 scroll-animate">
        My Projects
      </h2>
      <div
        ref={projectsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 scroll-stagger-container"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#111] text-white p-4 rounded-lg hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 project-card scroll-stagger-item"
            style={{ opacity: 1 }} // Ensure initial visibility
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="rounded-md object-cover w-full h-48"
            />
            <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
            <p className="text-sm mt-2">{project.description}</p>
            <a
              href={project.link}
              className="text-blue-400 hover:underline mt-4 inline-block"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

export const runtime = "edge";

export default function AboutPage() {
  // Create a ref for the entire component
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[85vh]" ref={pageRef}>
      <h1 className="text-3xl font-bold mb-6 animate-item">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="animate-item">
          <Image
            src="/headshot.jpeg"
            alt="David Khvedelidze"
            width={400}
            height={400}
            className="rounded-lg w-full object-cover profile-image"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 animate-item">
            David Khvedelidze
          </h2>
          <p className="mb-4 animate-item">
            Hi there! I'm a Front-End Developer with 5+ years of experience
            creating dynamic, responsive web applications. I specialize in
            React/Next.js development with a focus on performance optimization
            and modern UI implementations.
          </p>
          <p className="mb-4 animate-item">
            I'm passionate about creating intuitive user experiences with clean,
            maintainable code. My expertise includes component architecture,
            state management, and working with complex data visualization.
          </p>

          <div className="mt-4 animate-item">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Redux",
                "HTML5/CSS3",
                "Tailwind CSS",
                "GSAP",
                "Three.js",
                "Responsive Design",
                "REST APIs",
                "Git/GitHub",
              ].map((skill, index) => (
                <span
                  key={skill}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 animate-item">Experience</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-gray-300 pl-4 animate-item">
            <h3 className="text-xl font-medium">Senior Frontend Developer</h3>
            <p className="text-gray-600 dark:text-gray-400">
              TBC Bank • 2021 - Present
            </p>
            <p className="mt-2">
              Lead frontend development for customer-facing banking applications
              using React and Next.js. Implemented responsive interfaces and
              improved application performance by 40%. Mentored junior
              developers and collaborated closely with UX/UI designers.
            </p>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 animate-item">
            <h3 className="text-xl font-medium">Frontend Developer</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optio.AI • 2018 - 2021
            </p>
            <p className="mt-2">
              Developed financial management applications using React, Redux,
              and custom visualization libraries. Implemented UI components for
              complex financial data dashboards and cross-browser compatibility.
              Worked in an Agile environment with continuous integration and
              delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 animate-item">Education</h2>
        <div className="border-l-4 border-gray-300 pl-4 animate-item">
          <h3 className="text-xl font-medium">
            Bachelor's in Computer Science
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            San Jose State University • 2014 - 2018
          </p>
          <p className="mt-2">
            Specialized in web development, data structures, and algorithms.
            Graduated with a 3.8 GPA. Participated in coding competitions and
            web development projects.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 animate-item">
          Certifications
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-gray-300 pl-4 animate-item">
            <h3 className="text-xl font-medium">
              React Advanced Certification
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Meta • 2022</p>
          </div>
          <div className="border-l-4 border-gray-300 pl-4 animate-item">
            <h3 className="text-xl font-medium">AWS Cloud Practitioner</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Amazon Web Services • 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

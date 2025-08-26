import React from 'react';
import MagneticButton from './MagneticButton';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["Angular", "TypeScript", "RxJS", "NgRx"]
    },
    {
      title: "UI/UX", 
      skills: ["Tailwind", "PrimeNG", "WCAG", "Responsive"]
    },
    {
      title: "DevOps",
      skills: ["Azure DevOps", "Docker", "Kubernetes", "GitHub Actions"]
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 font-medium scroll-reveal">
              Technical Skills
            </h2>
            <div className="w-12 h-px bg-primary mx-auto scroll-reveal"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="scroll-reveal"
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <MagneticButton className="block w-full">
                  <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-smooth">
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 text-center text-primary">
                      {category.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {category.skills.map((skill) => (
                        <div 
                          key={skill}
                          className="group text-center p-3 sm:p-4 rounded-lg bg-muted hover:bg-accent transition-smooth"
                        >
                          <span className="text-xs sm:text-sm md:text-base font-medium text-foreground group-hover:text-accent-foreground transition-smooth">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </MagneticButton>
              </div>
            ))}
          </div>
          
          <div className="text-center scroll-reveal px-4" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Specialized in Angular development with expertise in performance optimization, state management (NgRx/SignalStore), 
              accessibility (WCAG 2.1 AA), and building scalable component libraries with PrimeNG and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
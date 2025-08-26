const Experience = () => {
  const experiences = [
    {
      title: "Frontend Developer (Angular)",
      company: "TBC Bank",
      period: "Mar 2020 - Present",
      description: "Delivered 5+ mission-critical banking apps in Angular. Reduced load times by 30-40% via code-splitting and optimized change detection. Built shared UI libraries with PrimeNG + Tailwind, cutting duplicate code by ~40%. Implemented NgRx/SignalStore patterns and increased test coverage to 80%+.",
      location: "Tbilisi, Georgia",
      type: "Professional Experience"
    },
    {
      title: "Angular Developer (Contract)",
      company: "GetNugget",
      period: "Mar 2023 - Jul 2024",
      description: "Built content discovery platform in Angular 16/17 with REST/GraphQL APIs. Improved time-to-interactive by 35% with progressive loading. Delivered WCAG 2.1 AA accessible components and automated build/test workflows with Nx and GitHub Actions.",
      location: "Remote (EU)",
      type: "Freelance"
    },
    {
      title: "Networking & IoT",
      company: "CNAM Paris",
      period: "2024 - Present",
      description: "Pursuing advanced studies in networking technologies and Internet of Things while maintaining professional frontend development work.",
      location: "Paris, France",
      type: "Education"
    },
    {
      title: "B.Sc. Information Technologies",
      company: "Business and Technology University",
      period: "2020 - 2024",
      description: "Bachelor's degree in Information Technologies with focus on software development and computer science fundamentals.",
      location: "Tbilisi, Georgia",
      type: "Education"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-sm mb-6 font-medium scroll-reveal">
              Experience & Education
            </h2>
            <div className="w-12 h-px bg-primary mx-auto scroll-reveal"></div>
          </div>
          
          <div className="space-y-8">
            {experiences.map((item, index) => (
              <div 
                key={index}
                className="relative bg-card p-8 rounded-lg shadow-subtle hover:shadow-medium transition-smooth scroll-reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-body-sm font-medium rounded-full">
                        {item.type}
                      </span>
                      <span className="text-body-sm text-muted-foreground">
                        {item.location}
                      </span>
                    </div>
                    <h3 className="font-display text-body-xl font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium text-body-lg">
                      {item.company}
                    </p>
                  </div>
                  <div className="text-body-sm text-muted-foreground font-medium mt-2 md:mt-0">
                    {item.period}
                  </div>
                </div>
                
                <p className="text-body-md text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
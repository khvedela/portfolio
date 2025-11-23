import {
  Briefcase,
  TrendingDown,
  Lightbulb,
  CheckCircle2,
  Target,
  Zap,
  Folder,
  ChevronDown,
  ChevronUp,
  FileText,
  Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import RobotTrigger from "../RobotTrigger";

const CVCaseStudies = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleStudy = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const caseStudies = [
    {
      id: "MSN-001",
      company: "TBC Bank",
      role: "Frontend Developer (Angular)",
      period: "Mar 2020 – Present",
      location: "Tbilisi, Georgia",
      status: "DEPLOYED",
      problem:
        "5+ mission-critical banking applications suffering from slow load times (4-6s), bloated bundles, and recurring state management bugs. Users were abandoning transactions. Mobile experience was terrible.",
      approach: [
        "Audited all apps with Chrome DevTools and Lighthouse",
        "Implemented lazy loading and code-splitting across all routes",
        "Migrated from template-driven to reactive patterns with NgRx",
        "Built shared UI library with PrimeNG + Tailwind to eliminate duplicate code",
        "Introduced systematic Cypress e2e testing in CI/CD pipeline",
      ],
      results: [
        {
          metric: "30-40%",
          description: "reduction in load times (down to 1.5-2.5s)",
        },
        {
          metric: "~40%",
          description: "less duplicate code via shared libraries",
        },
        {
          metric: "~35%",
          description: "fewer state-related bugs after NgRx migration",
        },
        {
          metric: "80%+",
          description: "test coverage with Jest/Jasmine/Karma",
        },
        {
          metric: "~25%",
          description: "reduction in rework cycles through mentoring",
        },
      ],
      stack: [
        "Angular",
        "TypeScript",
        "NgRx",
        "RxJS",
        "PrimeNG",
        "Tailwind",
        "Cypress",
        "Jest",
      ],
      wouldImprove:
        "Would implement microfrontend architecture earlier for better team autonomy. Would also add real-user monitoring (RUM) to catch performance regressions before users complain.",
    },
    {
      id: "MSN-002",
      company: "GetNugget",
      role: "Angular Developer (Contract)",
      period: "Mar 2023 – Jul 2024",
      location: "Remote (EU)",
      status: "COMPLETED",
      problem:
        "Content discovery platform with poor performance (TTI >5s), no accessibility compliance, and clunky build process slowing down deployments.",
      approach: [
        "Built entire frontend in Angular 16/17 with progressive loading",
        "Implemented WCAG 2.1 AA compliant components from scratch",
        "Set up Nx monorepo with optimized build caching",
        "Integrated both REST and GraphQL APIs with proper error handling",
        "Automated testing and deployment with GitHub Actions",
      ],
      results: [
        { metric: "35%", description: "faster time-to-interactive" },
        { metric: "WCAG 2.1 AA", description: "full accessibility compliance" },
        {
          metric: "i18n",
          description: "multi-language support with Angular localization",
        },
        {
          metric: "Automated",
          description: "CI/CD with Nx, GitHub Actions, Jest & Cypress",
        },
      ],
      stack: [
        "Angular 16/17",
        "TypeScript",
        "RxJS",
        "GraphQL",
        "REST",
        "Nx",
        "GitHub Actions",
        "Cypress",
      ],
      wouldImprove:
        "Would implement server-side rendering (SSR) for better SEO and initial load. Would also add progressive web app (PWA) features for offline support.",
    },
  ];

  return (
    <RobotTrigger mode="work">
    <section className="mb-20 print-break-avoid relative" data-section="work">
      <motion.div
        className="flex items-end gap-4 mb-8 border-b-3 border-foreground pb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Mission<span className="text-accent">_Archives</span>
        </h2>
        <div className="mb-2 text-xs font-mono text-muted-foreground hidden md:block">
          // AUTHORIZED PERSONNEL ONLY
        </div>
      </motion.div>

      <div className="space-y-4">
        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
            className={`relative border-2 transition-colors duration-300 overflow-hidden ${
              expandedIndex === index 
                ? "border-foreground bg-card" 
                : "border-foreground/40 bg-card/50 hover:border-foreground hover:bg-card"
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* File Header (Always Visible) */}
            <button
              onClick={() => toggleStudy(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
            >
              <div className="flex items-center gap-4 md:gap-8">
                <div className={`p-3 border-2 ${expandedIndex === index ? "bg-primary border-primary text-primary-foreground" : "border-foreground/30 text-foreground/50 group-hover:border-foreground group-hover:text-foreground"}`}>
                  <Folder size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">{study.id}</span>
                    <span className="w-1 h-1 bg-foreground rounded-full opacity-50" />
                    <span className="font-mono text-xs font-bold text-muted-foreground uppercase">{study.status}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold uppercase">{study.company}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="font-mono text-xs opacity-50 uppercase">Clearance</div>
                  <div className="font-bold font-mono text-sm">LEVEL 5</div>
                </div>
                <div className={`transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}>
                  <ChevronDown size={24} />
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-8 pt-2 border-t-2 border-dashed border-foreground/20 mx-6">
                    
                    {/* Role & Location Info */}
                    <div className="flex flex-wrap gap-4 mb-8 font-mono text-sm bg-secondary/20 p-4 border-l-2 border-foreground">
                       <div className="flex items-center gap-2">
                         <Terminal size={14} />
                         <span className="font-bold">{study.role}</span>
                       </div>
                       <div className="hidden md:block text-muted-foreground">|</div>
                       <div>{study.period}</div>
                       <div className="hidden md:block text-muted-foreground">|</div>
                       <div>{study.location}</div>
                    </div>

                    {/* Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      
                      {/* Left Column: Objectives & Tactics */}
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-2 mb-3 text-destructive">
                            <Target size={18} />
                            <h4 className="font-mono font-bold uppercase tracking-wider text-sm">Mission Objective</h4>
                          </div>
                          <p className="text-sm md:text-base leading-relaxed border-l-2 border-destructive/30 pl-4">
                            {study.problem}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3 text-primary">
                            <Zap size={18} />
                            <h4 className="font-mono font-bold uppercase tracking-wider text-sm">Tactical Execution</h4>
                          </div>
                          <ul className="space-y-2">
                            {study.approach.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column: Outcomes & Stack */}
                      <div className="space-y-8">
                         <div>
                          <div className="flex items-center gap-2 mb-3 text-success">
                            <TrendingDown size={18} />
                            <h4 className="font-mono font-bold uppercase tracking-wider text-sm">Mission Outcomes</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {study.results.map((result, i) => (
                              <div key={i} className="bg-success/5 border border-success/20 p-3">
                                <div className="text-xl font-display font-bold text-success">{result.metric}</div>
                                <div className="text-[10px] font-mono uppercase leading-tight opacity-80">{result.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                            <FileText size={18} />
                            <h4 className="font-mono font-bold uppercase tracking-wider text-sm">Tech Arsenal</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {study.stack.map((tech, i) => (
                              <span key={i} className="px-2 py-1 text-xs font-mono border border-foreground/30 text-foreground/70">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 pt-4 border-t border-foreground/10">
                      <p className="text-xs font-mono text-muted-foreground">
                        <span className="font-bold text-accent">POST_MISSION_ANALYSIS:</span> {study.wouldImprove}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
    </RobotTrigger>
  );
};

export default CVCaseStudies;

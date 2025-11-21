import {
  Briefcase,
  TrendingDown,
  Lightbulb,
  CheckCircle2,
  Target,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const CVCaseStudies = () => {
  const caseStudies = [
    {
      company: "TBC Bank",
      role: "Frontend Developer (Angular)",
      period: "Mar 2020 – Present",
      location: "Tbilisi, Georgia",
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
      company: "GetNugget",
      role: "Angular Developer (Contract)",
      period: "Mar 2023 – Jul 2024",
      location: "Remote (EU)",
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
    <section className="mb-16 print-break-avoid" data-section="work">
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-2">
          <motion.div
            className="w-12 h-12 bg-foreground flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            <Briefcase size={24} className="text-background" />
          </motion.div>
          <h2 className="text-4xl font-display">CASE STUDIES</h2>
        </div>
        <motion.div
          className="h-1 w-32 bg-accent ml-16"
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      <div className="space-y-16">
        {caseStudies.map((study, index) => (
          <motion.article
            key={index}
            className="relative border-3 border-foreground p-8 bg-card print-break-avoid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              boxShadow: "8px 8px 0 hsl(var(--foreground) / 0.15)",
              transition: { duration: 0.2 },
            }}
          >
            {/* Company label - brutalist tag */}
            <div className="absolute -top-5 left-8 bg-accent px-6 py-2 border-3 border-foreground">
              <span className="text-lg font-bold font-mono uppercase">
                {study.company}
              </span>
            </div>

            {/* Header */}
            <div className="mt-4 mb-8 pb-6 border-b-3 border-border">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-bold font-mono mb-1">
                    {study.role}
                  </p>
                </div>
                <div className="text-right text-sm font-mono bg-muted px-4 py-2 border-2 border-foreground">
                  <p className="font-bold">{study.period}</p>
                  <p>{study.location}</p>
                </div>
              </div>
            </div>

            {/* Problem */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-destructive flex items-center justify-center">
                  <Target size={18} className="text-background" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest font-mono">
                  THE PROBLEM
                </h4>
              </div>
              <div className="border-l-5 border-destructive pl-6">
                <p className="text-base leading-relaxed">{study.problem}</p>
              </div>
            </div>

            {/* Approach */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-warning flex items-center justify-center">
                  <Lightbulb size={18} className="text-foreground" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest font-mono">
                  HOW I APPROACHED IT
                </h4>
              </div>
              <ul className="space-y-3 border-l-5 border-warning pl-6">
                {study.approach.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-base">
                    <span className="flex-shrink-0 w-6 h-6 bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-success flex items-center justify-center">
                  <TrendingDown size={18} className="text-background" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest font-mono">
                  RESULTS
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.results.map((result, i) => (
                  <motion.div
                    key={i}
                    className="border-3 border-success p-5 bg-success/5 relative overflow-hidden group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      backgroundColor: "hsl(var(--success) / 0.15)",
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Diagonal stripe accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-success/20 transform translate-x-8 -translate-y-8 rotate-45"></div>

                    <div className="relative">
                      <div className="flex items-baseline gap-2 mb-2">
                        <CheckCircle2
                          size={16}
                          className="text-success flex-shrink-0 mt-1"
                        />
                        <span className="text-3xl font-bold font-mono leading-none">
                          {result.metric}
                        </span>
                      </div>
                      <p className="text-sm font-mono">{result.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary flex items-center justify-center">
                  <Zap size={18} className="text-foreground" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest font-mono">
                  TECH STACK
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-foreground text-background font-mono text-sm font-bold border-2 border-foreground hover:bg-background hover:text-foreground transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Would Improve */}
            <div className="bg-muted border-l-6 border-accent p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 font-mono text-muted-foreground">
                What I'd improve today:
              </p>
              <p className="text-sm italic leading-relaxed">
                {study.wouldImprove}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CVCaseStudies;

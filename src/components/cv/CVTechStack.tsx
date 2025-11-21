import { Code, Wrench, Cloud, Lightbulb, Shield } from "lucide-react";
import { motion } from "framer-motion";

const CVTechStack = () => {
  const techChoices = [
    {
      category: "Angular",
      icon: Code,
      reasoning:
        "The framework I know best. Chose it at TBC Bank because enterprise apps need structure, strong typing, and a framework that doesn't break every 6 months. Angular's DI system, RxJS integration, and opinionated architecture make it perfect for large teams where consistency matters more than being trendy.",
    },
    {
      category: "TypeScript",
      icon: Shield,
      reasoning:
        "Non-negotiable. Saves hours of debugging. Refactoring without fear. IntelliSense that actually works. If you're building anything bigger than a landing page and not using TypeScript, you're volunteering for pain.",
    },
    {
      category: "RxJS & NgRx/SignalStore",
      icon: Lightbulb,
      reasoning:
        "RxJS because async is everywhere and callbacks are hell. NgRx for big apps where state bugs can cost money. SignalStore for newer projects where NgRx feels like overkill. Reactive patterns make complex UIs predictable.",
    },
    {
      category: "Tailwind CSS",
      icon: Wrench,
      reasoning:
        "Stopped writing CSS files years ago. Utility-first keeps things fast and consistent. No more fighting specificity wars or wondering where that margin came from. PrimeNG for complex components, Tailwind for everything else.",
    },
    {
      category: "Nx Monorepos",
      icon: Cloud,
      reasoning:
        "When you have 5+ apps sharing code, Nx saves your sanity. Smart caching cuts build times by 70%. Enforces module boundaries so juniors don't import everything everywhere. The best build tool no one talks about enough.",
    },
  ];

  return (
    <section className="mb-16 print-break-avoid" data-section="tech">
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
            <Wrench size={24} className="text-background" />
          </motion.div>
          <h2 className="text-4xl font-display">HOW I THINK ABOUT TOOLS</h2>
        </div>
        <motion.div
          className="h-1 w-32 bg-primary ml-16"
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      <div className="space-y-6">
        {techChoices.map((tech, index) => (
          <motion.div
            key={index}
            className="relative border-3 border-foreground bg-card p-6 group print-break-avoid"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              boxShadow: "6px 6px 0 hsl(var(--primary) / 0.3)",
              transition: { duration: 0.2 },
            }}
          >
            {/* Corner accent */}
            <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary border-3 border-foreground flex items-center justify-center">
              <tech.icon size={20} className="text-foreground" />
            </div>

            <div className="ml-10">
              <h3 className="text-xl font-bold font-mono mb-4 uppercase tracking-tight flex items-center gap-3">
                <span className="text-primary">{">"}</span>
                {tech.category}
              </h3>
              <p className="text-base leading-relaxed border-l-3 border-muted pl-4">
                {tech.reasoning}
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/5 border-t-3 border-l-3 border-primary/30"></div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-10 border-5 border-foreground p-8 bg-accent/10 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Diagonal stripes background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            hsl(var(--foreground)),
            hsl(var(--foreground)) 10px,
            transparent 10px,
            transparent 20px
          )`,
          }}
        ></div>

        <div className="relative">
          <p className="text-sm font-mono leading-relaxed">
            <span className="font-bold text-base uppercase tracking-wider block mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent inline-block"></span>
              Real talk:
            </span>
            I'm not married to any of these. The best tool is the one that
            solves the problem without creating new ones. I've seen teams waste
            months migrating to the "hot new framework" just to end up with the
            same bugs in different syntax. Pick boring technology that works.
            Ship fast. Iterate.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CVTechStack;

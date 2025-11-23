import { Code, Wrench, Cloud, Lightbulb, Shield, Cpu, Terminal, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import RobotTrigger from "../RobotTrigger";
import CVSystemMonitor from "./CVSystemMonitor";

const CVTechStack = () => {
  const techChoices = [
    {
      category: "Angular",
      icon: Code,
      status: "OPTIMIZED",
      load: 95,
      reasoning:
        "The framework I know best. Chose it at TBC Bank because enterprise apps need structure, strong typing, and a framework that doesn't break every 6 months. Angular's DI system, RxJS integration, and opinionated architecture make it perfect for large teams where consistency matters more than being trendy.",
    },
    {
      category: "TypeScript",
      icon: Shield,
      status: "SECURE",
      load: 98,
      reasoning:
        "Non-negotiable. Saves hours of debugging. Refactoring without fear. IntelliSense that actually works. If you're building anything bigger than a landing page and not using TypeScript, you're volunteering for pain.",
    },
    {
      category: "RxJS & NgRx",
      icon: Lightbulb,
      status: "ACTIVE",
      load: 90,
      reasoning:
        "RxJS because async is everywhere and callbacks are hell. NgRx for big apps where state bugs can cost money. SignalStore for newer projects where NgRx feels like overkill. Reactive patterns make complex UIs predictable.",
    },
    {
      category: "Tailwind CSS",
      icon: Wrench,
      status: "FAST",
      load: 85,
      reasoning:
        "Stopped writing CSS files years ago. Utility-first keeps things fast and consistent. No more fighting specificity wars or wondering where that margin came from. PrimeNG for complex components, Tailwind for everything else.",
    },
    {
      category: "Nx Monorepos",
      icon: Cloud,
      status: "SCALABLE",
      load: 88,
      reasoning:
        "When you have 5+ apps sharing code, Nx saves your sanity. Smart caching cuts build times by 70%. Enforces module boundaries so juniors don't import everything everywhere. The best build tool no one talks about enough.",
    },
  ];

  return (
    <RobotTrigger mode="skills">
    <section className="mb-20 print-break-avoid relative" data-section="tech">
      <motion.div
        className="flex items-end gap-4 mb-8 border-b-3 border-foreground pb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Core<span className="text-primary">_Systems</span>
        </h2>
        <div className="mb-2 text-xs font-mono text-muted-foreground hidden md:block">
          // SYSTEM ARCHITECTURE // TOOLS
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {techChoices.map((tech, index) => (
          <motion.div
            key={index}
            className="relative bg-card border-2 border-foreground p-1 md:p-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Outer Frame */}
            <div className="border border-foreground/30 p-4 md:p-6 relative h-full bg-secondary/5 hover:bg-secondary/10 transition-colors">
               {/* Screws */}
              <div className="absolute top-2 left-2 w-2 h-2 border border-foreground rounded-full opacity-50" />
              <div className="absolute top-2 right-2 w-2 h-2 border border-foreground rounded-full opacity-50" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border border-foreground rounded-full opacity-50" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border border-foreground rounded-full opacity-50" />

              <div className="flex flex-col md:flex-row gap-6">
                {/* Header Column */}
                <div className="md:w-1/4 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-foreground/20 pb-4 md:pb-0 md:pr-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <tech.icon size={24} />
                      <span className="font-mono text-xs font-bold border border-primary px-1 py-0.5">{tech.status}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold uppercase">{tech.category}</h3>
                  </div>
                  <div className="mt-4 hidden md:block">
                    <div className="flex justify-between text-[10px] font-mono mb-1 opacity-70">
                      <span>EFFICIENCY</span>
                      <span>{tech.load}%</span>
                    </div>
                    <div className="h-2 bg-foreground/10 w-full">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.load}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="md:w-3/4">
                   <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                     {tech.reasoning}
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Warning / Philosophy Block */}
        <motion.div
          className="border-4 border-warning bg-warning/5 relative p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Striped Warning Bar */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#facc15_10px,#facc15_20px)] opacity-80" />
          
          <div className="flex items-start gap-4 mt-4">
             <div className="bg-warning text-warning-foreground p-3 shrink-0">
               <AlertTriangle size={32} />
             </div>
             <div>
               <h3 className="text-xl font-display font-bold uppercase text-warning-foreground mb-2">System Override</h3>
               <p className="font-mono text-sm leading-relaxed text-foreground/90">
                 I'm not married to any of these. The best tool is the one that solves the problem without creating new ones.
                 <br/><br/>
                 <span className="font-bold border-b-2 border-foreground">Pick boring technology that works. Ship fast. Iterate.</span>
               </p>
             </div>
          </div>
        </motion.div>

        {/* Live System Monitor */}
        <CVSystemMonitor />
      </div>
    </section>
    </RobotTrigger>
  );
};

export default CVTechStack;

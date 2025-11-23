import { User, Database, Target, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import RobotTrigger from "../RobotTrigger";

const CVAbout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <RobotTrigger mode="about">
    <section className="mb-20 print-break-avoid relative" data-section="about">
      {/* Section Header */}
      <motion.div 
        className="flex items-end gap-4 mb-8 border-b-3 border-foreground pb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Operator<span className="text-accent">_Profile</span>
        </h2>
        <div className="mb-2 text-xs font-mono text-muted-foreground hidden md:block">
          // CLASSIFIED // EYES ONLY
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Module 1: Origin */}
        <motion.div 
          className="group relative bg-card border-3 border-foreground p-6 hover:border-primary transition-colors duration-300"
          variants={cardVariants}
        >
          <div className="absolute top-0 right-0 bg-foreground text-background px-2 py-1 font-mono text-xs font-bold">
            SEC_01
          </div>
          <div className="mb-4 text-primary">
            <Database size={32} />
          </div>
          <h3 className="text-xl font-display font-bold mb-3 uppercase">Origin :: TBC Bank</h3>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
            Deployed in a high-stakes banking environment. 
            Mission critical systems where <span className="text-foreground font-bold bg-accent/20 px-1">"good enough"</span> results in failure. 
            Learned that security and performance are not optional features.
          </p>
        </motion.div>

        {/* Module 2: Objective */}
        <motion.div 
          className="group relative bg-card border-3 border-foreground p-6 hover:border-accent transition-colors duration-300"
          variants={cardVariants}
        >
          <div className="absolute top-0 right-0 bg-foreground text-background px-2 py-1 font-mono text-xs font-bold">
            SEC_02
          </div>
          <div className="mb-4 text-accent">
            <Target size={32} />
          </div>
          <h3 className="text-xl font-display font-bold mb-3 uppercase">Objective :: Paris</h3>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
            Relocated to Paris sector. 
            Seeking alliances with teams who value craftsmanship.
            Targeting projects where reducing load times by <span className="text-foreground font-bold border-b-2 border-accent">40%</span> is celebrated, not ignored.
          </p>
        </motion.div>

        {/* Module 3: Philosophy */}
        <motion.div 
          className="group relative bg-card border-3 border-foreground p-6 hover:border-success transition-colors duration-300"
          variants={cardVariants}
        >
          <div className="absolute top-0 right-0 bg-foreground text-background px-2 py-1 font-mono text-xs font-bold">
            SEC_03
          </div>
          <div className="mb-4 text-success">
            <Cpu size={32} />
          </div>
          <h3 className="text-xl font-display font-bold mb-3 uppercase">Core Directives</h3>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
            1. Write Angular that scales. <br/>
            2. Mentor juniors; knowledge hoarding is toxic. <br/>
            3. Test everything. Production bugs at 3am are unacceptable.
          </p>
        </motion.div>
      </motion.div>
    </section>
    </RobotTrigger>
  );
};

export default CVAbout;

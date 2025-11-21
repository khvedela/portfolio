import { User } from "lucide-react";
import { motion } from "framer-motion";

const CVAbout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <section className="mb-16 print-break-avoid" data-section="about">
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
            <User size={24} className="text-background" />
          </motion.div>
          <h2 className="text-4xl font-display">WHO I AM</h2>
        </div>
        <motion.div
          className="h-1 w-32 bg-accent ml-16"
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="border-l-6 border-primary pl-8 py-2"
          variants={paragraphVariants}
          whileHover={{ x: 4 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
        >
          <p className="text-lg leading-relaxed">
            I'm an Angular developer who's spent the last 4+ years building
            banking apps that people actually use every day. Not the kind that
            crash when you need them most—
            <span className="font-bold">the kind that work.</span>
          </p>
        </motion.div>

        <motion.div
          className="border-l-6 border-accent pl-8 py-2"
          variants={paragraphVariants}
          whileHover={{ x: 4 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
        >
          <p className="text-lg leading-relaxed">
            Started at TBC Bank right as everything was going digital. Learned
            fast that in banking, "good enough" isn't a thing.{" "}
            <span className="font-bold text-accent">
              Performance matters. Security matters. Users forgive nothing.
            </span>
          </p>
        </motion.div>

        <motion.div
          className="border-l-6 border-primary pl-8 py-2"
          variants={paragraphVariants}
          whileHover={{ x: 4 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
        >
          <p className="text-lg leading-relaxed">
            Now I'm in Paris, looking for teams that care about craft. Not the
            kind of craft where you bikeshed component names for 3 hours, but
            the kind where you reduce load times by 40% and users don't have to
            wait. I write Angular because it scales. I mentor juniors because
            knowledge hoarding is toxic. I test things because production bugs
            at 3am suck.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CVAbout;

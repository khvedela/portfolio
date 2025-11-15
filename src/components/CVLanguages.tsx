import { Languages } from "lucide-react";
import { motion } from "framer-motion";

const CVLanguages = () => {
  const languages = [
    { name: "Georgian", level: "Native", proficiency: 100 },
    { name: "English", level: "C1", proficiency: 90 },
    { name: "Russian", level: "B2", proficiency: 70 },
    { name: "French", level: "A1", proficiency: 25 },
  ];

  return (
    <section className="mb-8 print-break-avoid">
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
            <Languages size={24} className="text-background" />
          </motion.div>
          <h2 className="text-4xl font-display">LANGUAGES</h2>
        </div>
        <motion.div
          className="h-1 w-32 bg-primary ml-16"
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className="border-3 border-foreground bg-card p-5 group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring" as const,
              stiffness: 100,
              damping: 12,
            }}
            whileHover={{
              y: -4,
              boxShadow: "8px 8px 0 hsl(var(--foreground) / 0.1)",
              transition: { duration: 0.2 },
            }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-primary border-r-transparent opacity-20"></div>

            <div className="relative">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xl font-bold font-mono uppercase">
                  {lang.name}
                </span>
                <span className="text-xs font-bold font-mono px-2 py-1 bg-foreground text-background">
                  {lang.level}
                </span>
              </div>

              {/* Progress bar - brutalist style */}
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono uppercase text-muted-foreground">
                    Proficiency
                  </span>
                  <span className="text-xs font-bold font-mono">
                    {lang.proficiency}%
                  </span>
                </div>
                <div className="w-full h-3 bg-muted border-2 border-foreground overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1 + 0.3,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CVLanguages;

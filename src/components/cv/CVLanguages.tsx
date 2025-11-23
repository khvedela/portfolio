import { Languages, Signal } from "lucide-react";
import { motion } from "framer-motion";

const CVLanguages = () => {
  const languages = [
    { name: "Georgian", level: "NATIVE", proficiency: 100, code: "GEO" },
    { name: "English", level: "C1 / FLUENT", proficiency: 90, code: "ENG" },
    { name: "Russian", level: "B2 / ADVANCED", proficiency: 70, code: "RUS" },
    { name: "French", level: "A1 / LEARNING", proficiency: 25, code: "FRA" },
  ];

  return (
    <section className="mb-20 print-break-avoid relative" data-section="languages">
      <motion.div
        className="flex items-end gap-4 mb-8 border-b-3 border-foreground pb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Comm<span className="text-accent">_Protocols</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className="bg-card border-2 border-foreground p-4 relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-bold text-xl uppercase">{lang.code}</h3>
              <Signal size={16} className={lang.proficiency > 80 ? "text-success" : "text-warning"} />
            </div>
            
            <div className="text-xs font-mono mb-3 text-muted-foreground uppercase tracking-wider">
              {lang.name} // {lang.level}
            </div>

            {/* Signal Bars */}
            <div className="flex gap-1 h-8 items-end">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-full ${i * 10 < lang.proficiency ? 'bg-foreground' : 'bg-foreground/10'}`}
                  initial={{ height: "10%" }}
                  whileInView={{ height: i * 10 < lang.proficiency ? `${Math.max(20, Math.random() * 100)}%` : "10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 + i * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CVLanguages;

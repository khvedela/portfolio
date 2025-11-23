import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";

const CVEducation = () => {
  const education = [
    {
      institution: "CNAM Paris",
      degree: "Networking & IoT",
      period: "2024–Present",
      location: "Paris, France",
      note: "Expanding into infrastructure and IoT systems",
      status: "IN_PROGRESS"
    },
    {
      institution: "Business and Technology University",
      degree: "B.Sc. Information Technologies",
      period: "2020–2024",
      location: "Tbilisi, Georgia",
      note: "Graduated while working full-time at TBC Bank",
      status: "COMPLETED"
    },
  ];

  return (
    <section className="mb-20 print-break-avoid relative" data-section="education">
      <motion.div
        className="flex items-end gap-4 mb-8 border-b-3 border-foreground pb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Academic<span className="text-accent">_Records</span>
        </h2>
        <div className="mb-2 text-xs font-mono text-muted-foreground hidden md:block">
          // EDUCATIONAL DATABASE
        </div>
      </motion.div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className="relative border-2 border-foreground bg-card p-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="border border-dashed border-foreground/30 p-6 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center relative overflow-hidden">
              {/* Watermark */}
              <div className="absolute -right-10 -top-10 text-9xl font-black text-foreground/5 rotate-12 pointer-events-none uppercase select-none">
                EDU
              </div>

              <div>
                 <div className="flex items-center gap-3 mb-2">
                   <span className="px-2 py-0.5 bg-foreground text-background text-xs font-mono font-bold uppercase">{edu.status}</span>
                   <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                 </div>
                 <h3 className="text-2xl font-display font-bold uppercase mb-1">{edu.institution}</h3>
                 <p className="font-mono text-sm font-bold text-accent mb-2">{edu.degree}</p>
                 <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                   <MapPin size={12} />
                   <span>{edu.location}</span>
                 </div>
              </div>

              <div className="md:text-right max-w-xs relative z-10">
                 <div className="p-3 bg-secondary/20 border-l-2 border-accent">
                   <p className="text-xs italic font-mono">{edu.note}</p>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CVEducation;

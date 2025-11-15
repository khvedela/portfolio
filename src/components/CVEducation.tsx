import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const CVEducation = () => {
  const education = [
    {
      institution: "CNAM Paris",
      degree: "Networking & IoT",
      period: "2024–Present",
      location: "Paris, France",
      note: "Expanding into infrastructure and IoT systems",
    },
    {
      institution: "Business and Technology University",
      degree: "B.Sc. Information Technologies",
      period: "2020–2024",
      location: "Tbilisi, Georgia",
      note: "Graduated while working full-time at TBC Bank",
    },
  ];

  return (
    <section className="mb-16 print-break-avoid" data-section="education">
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
            <GraduationCap size={24} className="text-background" />
          </motion.div>
          <h2 className="text-4xl font-display">EDUCATION</h2>
        </div>
        <motion.div
          className="h-1 w-32 bg-accent ml-16"
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className="border-3 border-foreground bg-card p-6 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              y: -4,
              boxShadow: "8px 8px 0 hsl(var(--foreground) / 0.1)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold font-mono uppercase mb-2">
                  {edu.institution}
                </h3>
                <p className="text-base font-mono">{edu.degree}</p>
              </div>
              <div className="text-right text-sm font-mono bg-muted px-4 py-2 border-2 border-foreground">
                <div className="flex items-center gap-2 justify-end mb-1 font-bold">
                  <Calendar size={14} />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <MapPin size={14} />
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>

            {edu.note && (
              <div className="border-l-4 border-accent pl-4 mt-4">
                <p className="text-sm italic">{edu.note}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CVEducation;

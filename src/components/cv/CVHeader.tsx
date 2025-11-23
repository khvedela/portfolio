import { Mail, Phone, Globe, Linkedin, Github, Copy, Cpu, Wifi, Battery, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";
import BrutalistToast from "../BrutalistToast";
import DecryptedText from "../DecryptedText";
import RobotTrigger from "../RobotTrigger";

const CVHeader = () => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [uptime, setUptime] = useState(0);
  const { toast, hideToast, copyToClipboard } = useBrutalistToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const snapVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const glitchText = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "steps(3)" } }
  };

  return (
    <RobotTrigger mode="header" className="relative">
    <header className="relative text-foreground pt-12 pb-8 px-4 md:px-0 mb-12 overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* Background Grid/Noise */}
      <div className="absolute inset-0 bg-grid-large opacity-[0.05] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 pointer-events-none">
        {/* Top Status Bar */}
        <motion.div
          className="flex justify-between items-end border-b-3 border-foreground pb-2 mb-6 font-mono text-xs md:text-sm uppercase tracking-widest pointer-events-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-success">
              <Activity size={14} className="animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <div className="hidden md:flex items-center gap-2">
              <Cpu size={14} />
              <span>MEM: OPTIMAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">SESSION:</span>
              <span className="font-bold">{formatUptime(uptime)}</span>
            </div>
            <div className="bg-foreground text-background px-2 py-0.5 font-bold">
              V.2025.1
            </div>
          </div>
        </motion.div>

        {/* Main Identity Block */}
        <motion.div
          className="grid grid-cols-1 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name and Role - Centered */}
          <motion.div className="flex flex-col items-center justify-center text-center pt-10" variants={containerVariants}>
            <div>
              <motion.div className="flex items-center justify-center gap-2 mb-2" variants={glitchText}>
                <span className="text-accent font-mono text-sm font-bold tracking-wider bg-background/80 backdrop-blur-sm px-2">/// IDENTITY CONFIRMED</span>
              </motion.div>
              <motion.h1
                className="text-5xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter uppercase mb-6"
                variants={snapVariants}
              >
                <span className="block text-foreground drop-shadow-2xl">David</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/80 drop-shadow-2xl">
                   Khvedelidze
                </span>
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-lg md:text-2xl font-bold font-mono-tight bg-background/50 backdrop-blur-md p-4 border-y-2 border-foreground/10 inline-flex pointer-events-auto"
                variants={glitchText}
              >
                <span className="bg-accent/10 px-2 py-0.5 text-accent-foreground border border-accent">
                  <DecryptedText text="FRONTEND_ENGINEER" speed={30} />
                </span>
                <span className="text-muted-foreground hidden md:inline">::</span>
                <span>
                   <DecryptedText text="ANGULAR_SPECIALIST" speed={30} />
                </span>
              </motion.div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-3 gap-8 mt-12 border-t-3 border-foreground/20 pt-6 w-full max-w-2xl bg-background/80 backdrop-blur-sm p-4 pointer-events-auto">
              {[
                { label: "EXPERIENCE", value: "04 YRS" },
                { label: "STACK", value: "ANGULAR" },
                { label: "LOCATION", value: "PARIS, FR" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</span>
                  <span className="text-xl md:text-3xl font-display font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Communication Channels */}
        <motion.div
          className="border-y-3 border-foreground py-6 bg-background/90 backdrop-blur-sm pointer-events-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex flex-wrap justify-between items-center gap-6 px-4">
             <div className="flex items-center gap-2 font-mono text-sm font-bold bg-foreground text-background px-3 py-1">
               <Wifi size={14} className="animate-pulse" />
               <span>UPLINKS_ACTIVE</span>
             </div>

             <div className="flex gap-3">
               {[
                  { icon: Mail, href: "mailto:davidkhvedelidze@gmail.com", label: "EMAIL" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/khvedelidzedavid/", label: "LINKEDIN" },
                  { icon: Github, href: "https://github.com/khvedelidzedavid", label: "GITHUB" },
                  { icon: Phone, href: "tel:+33769827966", label: "PHONE" },
               ].map((link, i) => (
                 <motion.a
                   key={i}
                   href={link.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative overflow-hidden border-2 border-foreground p-3 hover:bg-foreground hover:text-background transition-colors duration-0"
                   whileHover={{ y: -4, x: 4 }}
                   whileTap={{ y: 0, x: 0 }}
                 >
                   <link.icon size={20} />
                   <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-0" />
                 </motion.a>
               ))}
             </div>
          </div>
        </motion.div>
      </div>

      <BrutalistToast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </header>
    </RobotTrigger>
  );
};

export default CVHeader;

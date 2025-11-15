import { Mail, Phone, Globe, Linkedin, Github, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useBrutalistToast } from "@/hooks/useBrutalistToast";
import BrutalistToast from "./BrutalistToast";

const CVHeader = () => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const { toast, hideToast, copyToClipboard } = useBrutalistToast();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const contactVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <header className="relative bg-foreground text-background py-16 px-6 print:py-10 overflow-hidden border-b-6 border-accent">
      {/* Accent corner brackets */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24 border-l-5 border-t-5 border-primary"
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24 border-r-5 border-b-5 border-accent"
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Name & Title */}
        <motion.div
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-2 flex items-center gap-4"
            variants={itemVariants}
          >
            <motion.div
              className="w-2 h-16 bg-primary"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <h1 className="text-5xl md:text-7xl font-display leading-none">
              David Khvedelidze
            </h1>
          </motion.div>

          <motion.div
            className="ml-6 mt-6 border-l-3 border-accent pl-6"
            variants={itemVariants}
          >
            <p className="text-xl md:text-3xl font-bold mb-2 font-mono-tight">
              Frontend Engineer <span className="text-primary">×</span> Angular
              Specialist
            </p>
            <p className="text-base md:text-xl opacity-75 font-mono">
              4+ Years Building Things That Work
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="flex gap-3 text-sm md:text-base font-mono"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: Mail,
              text: "davidkhvedelidze@gmail.com",
              copyText: "davidkhvedelidze@gmail.com",
              href: "mailto:davidkhvedelidze@gmail.com",
              color: "primary",
              copyable: true,
            },
            {
              icon: Phone,
              text: "+33 7 69 82 79 66",
              copyText: "+33769827966",
              href: "tel:+33769827966",
              color: "primary",
              copyable: true,
            },
            {
              icon: Globe,
              text: "devdavid.me",
              copyText: "https://devdavid.me",
              href: "https://devdavid.me",
              color: "accent",
              copyable: false,
            },
            {
              icon: Linkedin,
              text: "linkedin.com/in/khvedelidzedavid",
              copyText: "https://www.linkedin.com/in/khvedelidzedavid/",
              href: "https://www.linkedin.com/in/khvedelidzedavid/",
              color: "accent",
              copyable: false,
            },
            {
              icon: Github,
              text: "github.com/khvedela",
              copyText: "https://github.com/khvedela",
              href: "https://github.com/khvedela",
              color: "accent",
              copyable: false,
            },
          ].map((contact, index) => {
            const Icon = contact.icon;

            return (
              <div key={index} className="relative group">
                <motion.div
                  className="relative"
                  onContextMenu={(e) => {
                    // Long press on mobile - copy instead of context menu
                    if (contact.copyable) {
                      e.preventDefault();
                      copyToClipboard(contact.copyText, contact.text);
                    }
                  }}
                >
                  <motion.a
                    href={contact.href}
                    target={
                      contact.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    title={contact.text}
                    onClick={(e) => {
                      // On mobile (touch devices), if copyable, copy instead of navigate
                      if (contact.copyable && "ontouchstart" in window) {
                        e.preventDefault();
                        copyToClipboard(contact.copyText, contact.text);
                      }
                    }}
                    className={`w-12 h-12 flex items-center justify-center bg-${
                      contact.color
                    } text-foreground border-3 transition-all duration-200 shrink-0 border-${
                      contact.color
                    }/30 hover:border-background cursor-pointer ${
                      hoveredIcon === index
                        ? "scale-125 shadow-[0_0_30px_rgba(0,200,255,0.6)]"
                        : ""
                    }`}
                    variants={contactVariants}
                    onMouseEnter={() => setHoveredIcon(index)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <motion.div
                      animate={{
                        scale: hoveredIcon === index ? 1.2 : 1,
                        rotate: hoveredIcon === index ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        rotate: {
                          duration: 0.5,
                          repeat: hoveredIcon === index ? Infinity : 0,
                        },
                      }}
                    >
                      <Icon size={20} />
                    </motion.div>
                  </motion.a>

                  {/* Mobile tap indicator - shows on copyable items */}
                  {contact.copyable && (
                    <div className="lg:hidden absolute -bottom-1 -right-1 w-4 h-4 bg-accent border-2 border-foreground flex items-center justify-center pointer-events-none">
                      <Copy size={10} className="text-foreground" />
                    </div>
                  )}
                </motion.div>

                {/* Copy button - only for desktop/hover */}
                {contact.copyable && (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(contact.copyText, contact.text);
                    }}
                    className="hidden lg:block absolute -top-2 -right-2 w-6 h-6 bg-accent text-foreground border-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center no-print"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={`Copy ${contact.text}`}
                  >
                    <Copy size={12} />
                  </motion.button>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Toast notification */}
      <BrutalistToast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </header>
  );
};

export default CVHeader;

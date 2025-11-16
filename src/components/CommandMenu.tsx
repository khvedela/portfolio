import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, BookOpen, GraduationCap, Terminal, X } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/blog/posts";
import { getPublishedCourses } from "@/courses/courses";

interface CommandMenuProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const CommandMenu = ({ isDark, onToggleTheme }: CommandMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const courses = getPublishedCourses();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      id: "blog",
      label: "BLOG",
      command: "blog",
      icon: BookOpen,
      link: "/blog",
      badge: blogPosts.length.toString(),
      bgColor: "bg-primary",
      description: "Read technical posts",
    },
    {
      id: "courses",
      label: "COURSES",
      command: "learn",
      icon: GraduationCap,
      link: "/courses",
      badge: "FREE",
      bgColor: "bg-accent",
      description: `${courses.length} free courses`,
    },
    {
      id: "theme",
      label: isDark ? "LIGHT MODE" : "DARK MODE",
      command: "theme",
      icon: isDark ? Sun : Moon,
      action: onToggleTheme,
      badge: isDark ? "☀️" : "🌙",
      bgColor: "bg-foreground",
      description: "Toggle appearance",
    },
  ];

  return (
    <>
      {/* Trigger Button - Brutalist Terminal Style */}
      <motion.button
        onClick={toggleMenu}
        className="no-print fixed top-6 right-6 z-[9999] w-16 h-16 bg-foreground text-background border-4 border-accent hover:bg-accent hover:text-foreground transition-all flex flex-col items-center justify-center font-mono font-bold group overflow-visible"
        aria-label="Open command menu"
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring" as const,
          stiffness: 300,
          damping: 20,
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Terminal size={20} />
              <span className="text-[8px] mt-0.5 tracking-wider">MENU</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 bg-accent"
          animate={{
            scale: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-4 h-4 bg-accent"
          animate={{
            scale: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      {/* Command Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />

            {/* Menu Panel - Terminal Style */}
            <motion.div
              className="no-print fixed top-24 right-6 z-[9999] w-80 bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              initial={{
                opacity: 0,
                x: 100,
                y: -20,
                rotate: 2,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 100,
                y: -20,
                rotate: -2,
                scale: 0.95,
              }}
              transition={{
                type: "spring" as const,
                stiffness: 260,
                damping: 20,
              }}
            >
              {/* Terminal Header */}
              <motion.div
                className="bg-foreground text-background px-4 py-3 border-b-4 border-accent flex items-center justify-between"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <div className="flex items-center gap-2 font-mono">
                  <Terminal size={16} />
                  <span className="text-sm font-bold">COMMAND_MENU</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-accent"></div>
                  <div className="w-3 h-3 bg-primary"></div>
                  <div className="w-3 h-3 bg-red-500"></div>
                </div>
              </motion.div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isLink = !!item.link;

                  const content = (
                    <motion.div
                      className="relative border-3 border-foreground p-4 cursor-pointer group overflow-hidden"
                      initial={{ opacity: 0, x: -20, rotateY: -15 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      whileHover={{
                        x: 6,
                        scale: 1.02,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                          setIsOpen(false);
                        } else if (isLink) {
                          setIsOpen(false);
                        }
                      }}
                    >
                      {/* Background animation */}
                      <motion.div
                        className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-10 transition-opacity`}
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />

                      <div className="relative flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <motion.div
                            className={`w-10 h-10 ${item.bgColor} flex items-center justify-center border-2 border-foreground`}
                            whileHover={{
                              rotate: [0, -10, 10, -10, 0],
                              scale: 1.1,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon
                              size={20}
                              className={
                                item.bgColor === "bg-foreground"
                                  ? "text-background"
                                  : "text-foreground"
                              }
                            />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-mono font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                              {item.label}
                            </h3>
                            <p className="text-xs text-muted-foreground font-mono">
                              {item.description}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-[10px] font-mono text-muted-foreground">
                                $ {item.command}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Badge */}
                        <motion.div
                          className={`${item.bgColor} ${
                            item.bgColor === "bg-foreground"
                              ? "text-background"
                              : "text-foreground"
                          } border-2 border-foreground px-2 py-1 text-[10px] font-mono font-bold whitespace-nowrap`}
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.08 + 0.2,
                            type: "spring",
                            stiffness: 300,
                          }}
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        >
                          {item.badge}
                        </motion.div>
                      </div>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={{ scaleY: 0, originY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      />

                      {/* Glitch effect on hover */}
                      <motion.div
                        className="absolute inset-0 border-2 border-accent pointer-events-none"
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        whileHover={{
                          opacity: [0, 0.3, 0, 0.3, 0],
                          x: [0, -2, 2, -2, 0],
                          y: [0, 2, -2, 2, 0],
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );

                  return isLink ? (
                    <Link key={item.id} to={item.link} className="block mb-2">
                      {content}
                    </Link>
                  ) : (
                    <div key={item.id} className="mb-2">
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Footer hint */}
              <motion.div
                className="bg-muted px-4 py-2 border-t-2 border-foreground/20"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <p className="text-[10px] font-mono text-muted-foreground text-center">
                  Press <span className="text-accent font-bold">T</span> for
                  terminal • <span className="text-accent font-bold">ESC</span>{" "}
                  to close
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandMenu;

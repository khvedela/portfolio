import { useState, useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import MobileMenu from "./MobileMenu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 animate-nav-entrance">
      <div className={`relative px-6 py-3 rounded-2xl overflow-hidden transition-all duration-700 backdrop-blur-md ${
        isScrolled 
          ? 'shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] bg-background/80 border border-border/20' 
          : 'shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] bg-background/60 border border-border/10'
      }`}>
        {/* Enhanced glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-background/20 via-background/40 to-background/20"></div>
        
        {/* Subtle highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent"></div>
        
        {/* Content layer */}
        <div className="relative z-10 flex items-center space-x-8">
          <a 
            href="/"
            className="font-display text-body-md font-semibold text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Portfolio
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body-sm text-muted-foreground hover:text-foreground transition-all duration-300 underline-animation animate-nav-item relative px-2 py-1 rounded-lg hover:bg-muted/40"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
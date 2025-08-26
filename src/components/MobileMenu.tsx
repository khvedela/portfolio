import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  useSmoothScroll();

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-smooth"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-md border-border/50">
        <div className="flex flex-col space-y-8 mt-8">
          <a 
            href="#"
            className="font-display text-xl font-semibold text-foreground hover:text-primary transition-smooth"
            onClick={handleLinkClick}
          >
            Portfolio
          </a>
          
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-muted-foreground hover:text-foreground transition-smooth underline-animation animate-nav-item py-3 border-b border-border/20 last:border-b-0"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
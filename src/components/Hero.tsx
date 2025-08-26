import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from './MagneticButton';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = Array.from(textRef.current.children);
    const timeline = gsap.timeline({ repeat: -1 });

    // Set initial position and prepare letters
    words.forEach((word, index) => {
      const letters = word.textContent?.split('') || [];
      word.innerHTML = letters.map(letter => 
        `<span class="inline-block">${letter}</span>`
      ).join('');
      
      // Set initial positions
      gsap.set(word, { y: index * 100 + '%' });
      gsap.set(word.children, { 
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1
      });
    });

    // Create smooth slot machine with letter animations
    const duration = 3; // time each word is visible
    const transition = 0.6; // transition time between words
    
    words.forEach((word, index) => {
      const nextIndex = (index + 1) % words.length;
      const startTime = index * (duration + transition);
      
      // Animate letters when word is active
      timeline
        .to(word.children, {
          duration: 0.1,
          y: () => (Math.random() - 0.5) * 4,
          rotation: () => (Math.random() - 0.5) * 2,
          scale: () => 0.98 + Math.random() * 0.04,
          stagger: {
            amount: 0.3,
            from: "random"
          },
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.1
        }, startTime)
        
        // Slide to next word
        .to(textRef.current, {
          duration: transition,
          y: `-${nextIndex * 100}%`,
          ease: "power3.inOut"
        }, startTime + duration);
    });

    return () => {
      timeline.kill();
    };
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-custom text-center">
        <div className="animate-hero-entrance">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 font-semibold animate-title-reveal leading-tight">
            <span className="text-foreground animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>David Khvedelidze</span>
          </h1>
          
          <div className="h-12 sm:h-14 md:h-16 flex flex-col sm:flex-row items-center justify-center mb-6 gap-2 sm:gap-0">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
              Frontend{' '}
            </span>
            <div className="relative overflow-hidden h-6 sm:h-7 md:h-8">
              <div ref={textRef} className="absolute top-0 left-0">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium whitespace-nowrap">Engineer</div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium whitespace-nowrap">Enthusiast</div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium whitespace-nowrap">Lover</div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium whitespace-nowrap">Maniac</div>
              </div>
            </div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto animate-fade-slide-up px-4" style={{ animationDelay: '0.9s' }}>
            Angular-focused frontend engineer delivering high-performance, scalable web apps for banking and SaaS. 4+ years experience with expertise in architecture, state management, and mentoring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get In Touch
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Learn More
              </a>
            </MagneticButton>
          </div>
        </div>
        
        <div className="mt-16 animate-fade-in">
          <div className="w-px h-16 bg-border mx-auto mb-4"></div>
          <p className="text-body-sm text-muted-foreground font-medium tracking-wider uppercase">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
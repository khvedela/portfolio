import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import EnhancedParticleSystem from "@/components/EnhancedParticleSystem";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollWarpEffect from "@/components/ScrollWarpEffect";
import BackToTop from "@/components/BackToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();
  
  return (
    <div className="min-h-screen bg-background relative">
      <ScrollWarpEffect />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <div className="relative z-10">
        <EnhancedParticleSystem />
      
      <main>
        <Hero />
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="experience">
          <Experience />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
        </main>
        
        <BackToTop />
        
        <footer className="border-t border-border py-8">
          <div className="container-custom">
            <div className="text-center">
              <p className="text-body-sm text-muted-foreground">
                © {new Date().getFullYear()} Frontend Engineer Portfolio. Crafted in Paris.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

const About = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-sm mb-6 font-medium scroll-reveal">
              About Me
            </h2>
            <div className="w-12 h-px bg-primary mx-auto scroll-reveal"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 scroll-reveal">
              <p className="text-body-lg text-foreground leading-relaxed">
                I am an international student based in <span className="font-medium text-primary">Paris</span>, originally from <span className="font-medium">Georgia</span>, currently pursuing a Master's degree in Networking & IoT at CNAM while working as a Frontend Developer.
              </p>
              
              <p className="text-body-lg text-foreground leading-relaxed">
                With over <span className="font-medium text-primary">4+ years of professional experience</span>, I specialize in Angular development at TBC Bank, where I've delivered mission-critical banking applications with focus on performance optimization, state management, and scalable architecture.
              </p>
              
              <p className="text-body-lg text-foreground leading-relaxed">
                My expertise spans from reducing application load times by 30-40% to building shared UI libraries that cut duplicate code by ~40%. I'm passionate about mentoring junior developers and seeking remote Europe-friendly opportunities.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-lg shadow-subtle scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-body-xl font-medium mb-4">
                  Currently
                </h3>
                <p className="text-muted-foreground text-body-md">
                  Master's in Networking & IoT<br />
                  <span className="text-primary font-medium">CNAM Paris (2024–Present)</span>
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-lg shadow-subtle scroll-reveal" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-display text-body-xl font-medium mb-4">
                  Based in
                </h3>
                <p className="text-muted-foreground text-body-md">
                  Paris, France<br />
                  <span className="text-foreground">Originally from Georgia</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
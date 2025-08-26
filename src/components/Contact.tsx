import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

const Contact = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "davidkhvedelidze@gmail.com",
      href: "mailto:davidkhvedelidze@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/khvedelidzedavid",
      href: "https://www.linkedin.com/in/khvedelidzedavid"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/khvedela",
      href: "https://github.com/khvedela"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="font-display text-display-sm mb-6 font-medium scroll-reveal">
              Let's Work Together
            </h2>
            <div className="w-12 h-px bg-primary mx-auto mb-8 scroll-reveal"></div>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto scroll-reveal">
              Angular specialist with 4+ years of banking and SaaS experience, seeking remote Europe-friendly opportunities. 
              Expertise in performance optimization, state management, and scalable architecture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactLinks.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card p-6 rounded-lg border border-border hover:border-primary/30 hover:shadow-medium transition-smooth hover-lift scroll-reveal"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-body-md mb-1">
                        {contact.label}
                      </h3>
                      <p className="text-body-sm text-muted-foreground">
                        {contact.value}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                  </div>
                </a>
              );
            })}
          </div>
          
          <div className="scroll-reveal" style={{ animationDelay: '0.6s' }}>
            <p className="text-body-sm text-muted-foreground">
              Based in Paris • Available for remote opportunities • Languages: Georgian (Native), English (C1), Russian (B2), French (A1)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
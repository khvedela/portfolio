import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const animatedElements = new Set<HTMLElement>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        
        if (entry.isIntersecting && !animatedElements.has(element)) {
          // Mark as animated to prevent re-triggering
          animatedElements.add(element);
          
          // Simple, reliable animation
          element.classList.remove('opacity-0', 'translate-y-8');
          element.classList.add('opacity-100', 'translate-y-0');
          
          // Stop observing once animated
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Simple setup for scroll reveal elements
    const elementsToReveal = document.querySelectorAll('.scroll-reveal');
    elementsToReveal.forEach((el) => {
      const element = el as HTMLElement;
      
      // Reset to initial state
      element.classList.add(
        'opacity-0', 
        'translate-y-8',
        'transition-all',
        'duration-700',
        'ease-out'
      );
      
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};
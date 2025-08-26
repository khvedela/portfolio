import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create PIXI application
    const app = new PIXI.Application();
    
    (async () => {
      await app.init({
        canvas: canvasRef.current!,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
        antialias: true,
      });

      // Retro Apple logo colors (rainbow order: green, yellow, orange, red, magenta, purple, blue)
      const appleColors = [
        0x90EE90, // Light green
        0xFFFFE0, // Light yellow  
        0xFFDAB9, // Peach puff (orange)
        0xFFB6C1, // Light pink (red)
        0xDDA0DD, // Plum (magenta)
        0xE6E6FA, // Lavender (purple)
        0xADD8E6  // Light blue
      ];

      // Generate dots
      const dots: Array<{
        sprite: PIXI.Graphics;
        baseRadius: number;
        baseOpacity: number;
        pulsePhase: number;
        pulseSpeed: number;
        baseX: number;
        baseY: number;
        color: number;
      }> = [];

      const spacing = 45;
      for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
        for (let y = 0; y < window.innerHeight + spacing; y += spacing) {
          const baseRadius = 0.6 + Math.random() * 0.4; // Smaller dots
          const baseOpacity = 0.15 + Math.random() * 0.1; // Much more subtle
          const color = appleColors[Math.floor(Math.random() * appleColors.length)];
          
          const dot = new PIXI.Graphics();
          dot.circle(0, 0, baseRadius);
          dot.fill(color);
          
          const finalX = x + Math.random() * 30 - 15;
          const finalY = y + Math.random() * 30 - 15;
          
          dot.x = finalX;
          dot.y = finalY;
          dot.alpha = baseOpacity;
          
          app.stage.addChild(dot);
          
          dots.push({
            sprite: dot,
            baseRadius,
            baseOpacity,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 0.3,
            baseX: finalX,
            baseY: finalY,
            color
          });
        }
      }

      // Animation loop
      let mouseX = 0;
      let mouseY = 0;
      const interactionRadius = 150;

      app.ticker.add(() => {
        const time = Date.now() * 0.001;
        
        dots.forEach(dot => {
          // Gentle floating animation
          const pulse = Math.sin(time * dot.pulseSpeed + dot.pulsePhase) * 0.05 + 1;
          const float = Math.sin(time * 0.3 + dot.pulsePhase) * 0.8;
          
          // Mouse interaction
          const distance = Math.sqrt(
            Math.pow(mouseX - dot.baseX, 2) + Math.pow(mouseY - dot.baseY, 2)
          );
          
          let targetRadius = dot.baseRadius;
          let targetOpacity = dot.baseOpacity;
          
          if (distance < interactionRadius) {
            const influence = Math.pow(1 - (distance / interactionRadius), 2);
            targetRadius = dot.baseRadius + (influence * 3);
            targetOpacity = Math.min(dot.baseOpacity + (influence * 0.25), 0.4); // More subtle hover
          }
          
          // Apply animations with floating
          dot.sprite.clear();
          dot.sprite.circle(0, 0, targetRadius * pulse);
          dot.sprite.fill(dot.color);
          dot.sprite.alpha = targetOpacity * pulse;
          dot.sprite.x = dot.baseX + float;
          dot.sprite.y = dot.baseY + Math.sin(time * 0.4 + dot.pulsePhase + 1) * 0.6;
        });
      });

      // Mouse move handler
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      };

      // Resize handler
      const handleResize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        app.destroy(true);
      };
    })();

    // Return cleanup function for useEffect
    return () => {
      if (app) {
        app.destroy(true);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default BackgroundAnimation;
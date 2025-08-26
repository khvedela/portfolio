import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface Particle {
  sprite: PIXI.Graphics;
  baseRadius: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  baseX: number;
  baseY: number;
  velocityX: number;
  velocityY: number;
  color: number;
  life: number;
  maxLife: number;
  type: 'float' | 'magnetic' | 'trail';
}

const EnhancedParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

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

      const colors = [
        0x4F46E5, // Primary indigo
        0x7C3AED, // Purple
        0xEC4899, // Pink  
        0x10B981, // Emerald
        0xF59E0B, // Amber
        0x3B82F6, // Blue
      ];

      const particles: Particle[] = [];
      const maxParticles = 150;
      const interactionRadius = 200;
      let mouseX = 0;
      let mouseY = 0;
      let mousePressed = false;

      // Create initial particles
      for (let i = 0; i < maxParticles; i++) {
        createParticle();
      }

      function createParticle(x?: number, y?: number, type: 'float' | 'magnetic' | 'trail' = 'float') {
        if (particles.length >= maxParticles) return;

        const baseRadius = type === 'trail' ? 0.3 + Math.random() * 0.2 : 0.8 + Math.random() * 0.6;
        const baseOpacity = type === 'trail' ? 0.3 + Math.random() * 0.2 : 0.1 + Math.random() * 0.15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const dot = new PIXI.Graphics();
        dot.circle(0, 0, baseRadius);
        dot.fill(color);
        
        const posX = x ?? Math.random() * window.innerWidth;
        const posY = y ?? Math.random() * window.innerHeight;
        
        dot.x = posX;
        dot.y = posY;
        dot.alpha = baseOpacity;
        
        app.stage.addChild(dot);
        
        const particle: Particle = {
          sprite: dot,
          baseRadius,
          baseOpacity,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.4,
          baseX: posX,
          baseY: posY,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: (Math.random() - 0.5) * 0.5,
          color,
          life: 0,
          maxLife: type === 'trail' ? 60 : Infinity,
          type
        };
        
        particles.push(particle);
      }

      // Enhanced animation loop
      app.ticker.add(() => {
        const time = Date.now() * 0.001;
        
        particles.forEach((particle, index) => {
          // Update particle life
          particle.life++;
          if (particle.life > particle.maxLife) {
            app.stage.removeChild(particle.sprite);
            particles.splice(index, 1);
            return;
          }

          // Different behaviors based on type
          if (particle.type === 'float') {
            // Gentle floating animation
            const pulse = Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.05 + 1;
            const float = Math.sin(time * 0.3 + particle.pulsePhase) * 1.2;
            
            // Mouse interaction
            const distance = Math.sqrt(
              Math.pow(mouseX - particle.baseX, 2) + Math.pow(mouseY - particle.baseY, 2)
            );
            
            let targetRadius = particle.baseRadius;
            let targetOpacity = particle.baseOpacity;
            let targetX = particle.baseX;
            let targetY = particle.baseY;
            
            if (distance < interactionRadius) {
              const influence = Math.pow(1 - (distance / interactionRadius), 2);
              targetRadius = particle.baseRadius + (influence * 4);
              targetOpacity = Math.min(particle.baseOpacity + (influence * 0.4), 0.6);
              
              // Magnetic effect
              const angle = Math.atan2(mouseY - particle.baseY, mouseX - particle.baseX);
              const pullStrength = influence * 20;
              targetX += Math.cos(angle) * pullStrength;
              targetY += Math.sin(angle) * pullStrength;
            }
            
            // Apply animations
            particle.sprite.clear();
            particle.sprite.circle(0, 0, targetRadius * pulse);
            particle.sprite.fill(particle.color);
            particle.sprite.alpha = targetOpacity * pulse;
            particle.sprite.x = targetX + float;
            particle.sprite.y = targetY + Math.sin(time * 0.4 + particle.pulsePhase + 1) * 0.8;
            
          } else if (particle.type === 'magnetic') {
            // Magnetic particles follow mouse
            const distance = Math.sqrt(
              Math.pow(mouseX - particle.sprite.x, 2) + Math.pow(mouseY - particle.sprite.y, 2)
            );
            
            if (distance > 5) {
              const angle = Math.atan2(mouseY - particle.sprite.y, mouseX - particle.sprite.x);
              particle.velocityX += Math.cos(angle) * 0.1;
              particle.velocityY += Math.sin(angle) * 0.1;
            }
            
            particle.velocityX *= 0.98;
            particle.velocityY *= 0.98;
            
            particle.sprite.x += particle.velocityX;
            particle.sprite.y += particle.velocityY;
            
            // Fade over time
            const lifeRatio = particle.life / particle.maxLife;
            particle.sprite.alpha = particle.baseOpacity * (1 - lifeRatio);
            
          } else if (particle.type === 'trail') {
            // Trail particles fade and move slowly
            particle.sprite.x += particle.velocityX;
            particle.sprite.y += particle.velocityY;
            
            const lifeRatio = particle.life / particle.maxLife;
            particle.sprite.alpha = particle.baseOpacity * (1 - lifeRatio);
            
            const scale = 1 - lifeRatio * 0.5;
            particle.sprite.scale.set(scale);
          }
        });
      });

      // Enhanced mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        
        // Create trail particles when moving
        if (Math.random() < 0.3) {
          createParticle(mouseX + (Math.random() - 0.5) * 20, mouseY + (Math.random() - 0.5) * 20, 'trail');
        }
      };

      const handleMouseDown = () => {
        mousePressed = true;
        // Create magnetic particles on click
        for (let i = 0; i < 5; i++) {
          createParticle(
            mouseX + (Math.random() - 0.5) * 50,
            mouseY + (Math.random() - 0.5) * 50,
            'magnetic'
          );
        }
      };

      const handleMouseUp = () => {
        mousePressed = false;
      };

      const handleResize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', handleResize);
        app.destroy(true);
      };
    })();

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

export default EnhancedParticleSystem;
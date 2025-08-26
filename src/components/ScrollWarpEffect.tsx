import { useEffect, useState, useRef } from 'react';

const ScrollWarpEffect = () => {
  const [warpIntensity, setWarpIntensity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const animationFrameRef = useRef<number>();
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);

  useEffect(() => {
    const smoothTransition = () => {
      // Smooth interpolation towards target
      const diff = targetIntensity.current - currentIntensity.current;
      const step = diff * 0.1; // Adjust for smoothness (lower = smoother)
      
      currentIntensity.current += step;
      
      // Apply a dead zone to prevent micro-movements
      if (Math.abs(diff) < 0.001) {
        currentIntensity.current = targetIntensity.current;
      }
      
      setWarpIntensity(currentIntensity.current);
      
      // Continue animation if there's still movement
      if (Math.abs(diff) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(smoothTransition);
      }
    };

    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps
    
    const handleScroll = () => {
      const currentTime = Date.now();
      
      // Throttle updates
      if (currentTime - lastUpdateTime < throttleDelay) {
        return;
      }
      lastUpdateTime = currentTime;
      
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = Math.max(currentTime - lastScrollTime.current, 16);
      
      if (deltaTime > 0) {
        const velocity = deltaY / deltaTime;
        // Smoother intensity calculation with exponential decay
        const rawIntensity = Math.min(velocity * 1.5, 1);
        
        // Only update if there's a significant change
        if (Math.abs(rawIntensity - targetIntensity.current) > 0.02) {
          targetIntensity.current = rawIntensity;
          
          // Cancel existing animation and start new one
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          animationFrameRef.current = requestAnimationFrame(smoothTransition);
        }
        
        // Natural decay when not scrolling
        setTimeout(() => {
          if (Date.now() - lastScrollTime.current > 200) {
            targetIntensity.current *= 0.8;
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            animationFrameRef.current = requestAnimationFrame(smoothTransition);
          }
        }, 200);
      }
      
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const warpStyle = {
    '--warp-intensity': warpIntensity,
    '--warp-scale': 1 + warpIntensity * 0.2,
    '--warp-offset': warpIntensity * 30,
    '--warp-blur': warpIntensity * 4,
    '--warp-opacity': warpIntensity * 0.6,
  } as React.CSSProperties;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Colorful background warp effects */}
      
      {/* Left side colorful warp */}
      <div 
        className="absolute left-0 top-0 h-full w-64 transition-all duration-300 ease-out"
        style={warpStyle}
      >
        <div className="relative h-full">
          {/* Colorful gradient waves */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-transparent"
            style={{
              transform: `translateX(calc(var(--warp-offset) * -1px)) scale(var(--warp-scale))`,
              filter: `blur(calc(var(--warp-blur) * 1px))`,
              opacity: 'var(--warp-opacity)',
            }}
          />
          
          <div 
            className="absolute inset-0 bg-gradient-to-r from-pink-500/15 via-cyan-500/10 to-transparent"
            style={{
              transform: `translateX(calc(var(--warp-offset) * -0.7px)) scale(var(--warp-scale)) translateY(20px)`,
              filter: `blur(calc(var(--warp-blur) * 1.5px))`,
              opacity: 'calc(var(--warp-opacity) * 0.8)',
            }}
          />
          
          {/* Animated particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`left-particle-${i}`}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
              style={{
                left: `${i * 12}%`,
                top: `${15 + i * 12}%`,
                transform: `
                  translateX(calc(var(--warp-offset) * ${i * -0.4}px))
                  translateY(calc(sin(${Date.now() / 1000 + i}) * 10px))
                  scale(calc(1 + var(--warp-intensity) * 3))
                  rotate(calc(var(--warp-intensity) * ${i * 45}deg))
                `,
                opacity: `calc(var(--warp-opacity) * ${1 - i * 0.1})`,
                animation: `pulse 2s ease-in-out infinite ${i * 0.2}s, 
                           float 3s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right side colorful warp */}
      <div 
        className="absolute right-0 top-0 h-full w-64 transition-all duration-300 ease-out"
        style={warpStyle}
      >
        <div className="relative h-full">
          {/* Colorful gradient waves */}
          <div 
            className="absolute inset-0 bg-gradient-to-l from-green-500/20 via-yellow-500/15 to-transparent"
            style={{
              transform: `translateX(calc(var(--warp-offset) * 1px)) scale(var(--warp-scale))`,
              filter: `blur(calc(var(--warp-blur) * 1px))`,
              opacity: 'var(--warp-opacity)',
            }}
          />
          
          <div 
            className="absolute inset-0 bg-gradient-to-l from-orange-500/15 via-red-500/10 to-transparent"
            style={{
              transform: `translateX(calc(var(--warp-offset) * 0.7px)) scale(var(--warp-scale)) translateY(-20px)`,
              filter: `blur(calc(var(--warp-blur) * 1.5px))`,
              opacity: 'calc(var(--warp-opacity) * 0.8)',
            }}
          />
          
          {/* Animated particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`right-particle-${i}`}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 animate-pulse"
              style={{
                right: `${i * 12}%`,
                top: `${25 + i * 12}%`,
                transform: `
                  translateX(calc(var(--warp-offset) * ${i * 0.4}px))
                  translateY(calc(cos(${Date.now() / 1000 + i}) * 10px))
                  scale(calc(1 + var(--warp-intensity) * 3))
                  rotate(calc(var(--warp-intensity) * ${i * -45}deg))
                `,
                opacity: `calc(var(--warp-opacity) * ${1 - i * 0.1})`,
                animation: `pulse 2s ease-in-out infinite ${i * 0.25}s, 
                           float 3.5s ease-in-out infinite ${i * 0.35}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Central colorful vortex for intense scrolling */}
      {warpIntensity > 0.5 && (
        <div 
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, 
              rgba(147, 51, 234, ${warpIntensity * 0.1}) 60%, 
              rgba(59, 130, 246, ${warpIntensity * 0.08}) 80%)`,
            opacity: warpIntensity,
            transform: `scale(${1 + warpIntensity * 0.1})`,
          }}
        />
      )}

      {/* Floating color orbs */}
      {warpIntensity > 0.3 && (
        <>
          <div 
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 transition-all duration-500"
            style={{
              left: '10%',
              top: '20%',
              transform: `translate(calc(var(--warp-offset) * 2px), calc(var(--warp-offset) * -1px)) scale(calc(1 + var(--warp-intensity)))`,
              opacity: warpIntensity,
              filter: `blur(${warpIntensity * 8}px)`,
            }}
          />
          <div 
            className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-pink-400/30 to-cyan-400/30 transition-all duration-500"
            style={{
              right: '15%',
              top: '60%',
              transform: `translate(calc(var(--warp-offset) * -2px), calc(var(--warp-offset) * 1px)) scale(calc(1 + var(--warp-intensity)))`,
              opacity: warpIntensity,
              filter: `blur(${warpIntensity * 6}px)`,
            }}
          />
          <div 
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-green-400/30 to-yellow-400/30 transition-all duration-500"
            style={{
              left: '80%',
              top: '80%',
              transform: `translate(calc(var(--warp-offset) * 1px), calc(var(--warp-offset) * -2px)) scale(calc(1 + var(--warp-intensity)))`,
              opacity: warpIntensity,
              filter: `blur(${warpIntensity * 4}px)`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default ScrollWarpEffect;

// Add floating animation to index.css if not already present
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
`;
document.head.appendChild(style);
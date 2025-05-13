import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// Create a custom ShaderMaterial with mouse interaction
const TriangleGridContourMaterial = shaderMaterial(
  {
    iTime: 0,
    iResolution: new THREE.Vector2(),
    iAspect: 1.0,
    iMouse: new THREE.Vector2(0.5, 0.5), // Mouse position normalized (0-1)
    iMouseDown: 0.0, // Mouse down state (0 or 1)
    iMouseIntensity: 1.0, // Mouse effect intensity
    iReveal: 0.0, // Add reveal parameter for animation (0-1)
  },
  // vertex shader - unchanged
  `varying vec2 vUv;
   void main() {
     vUv = uv;
     gl_Position = vec4(position, 1.0);
   }`,
  // fragment shader - add mouse interaction
  `precision highp float;
   uniform float iTime;
   uniform vec2 iResolution;
   uniform float iAspect;
   uniform vec2 iMouse;
   uniform float iMouseDown;
   uniform float iMouseIntensity;
   uniform float iReveal; // New reveal parameter
   varying vec2 vUv;

   // Standard 2D rotation
   mat2 rot2(in float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
   float hash21(vec2 p){ return fract(sin(dot(p, vec2(141.13, 289.97)))*43758.5453); }
   vec2 hash22(vec2 p) {
     float n = sin(dot(p, vec2(41, 289)));
     p = fract(vec2(262144, 32768)*n);
     return sin(p*6.2831853 + iTime);
   }
   float n2D3G(in vec2 p) {
     vec2 i = floor(p); p -= i;
     vec4 v;
     v.x = dot(hash22(i), p);
     v.y = dot(hash22(i + vec2(1, 0)), p - vec2(1, 0));
     v.z = dot(hash22(i + vec2(0, 1)), p - vec2(0, 1));
     v.w = dot(hash22(i + 1.), p - 1.);
     p = p*p*p*(p*(p*6. - 15.) + 10.);
     return mix(mix(v.x, v.y, p.x), mix(v.z, v.w, p.x), p.y);
   }
   float isoFunction(in vec2 p){ return n2D3G(p/4. + .07); }
   float distLine(vec2 a, vec2 b){ b = a - b; float h = clamp(dot(a, b)/dot(b, b), 0., 1.); return length(a - b*h); }
   float distEdge(vec2 a, vec2 b){ return dot((a + b)*.5, normalize((b - a).yx*vec2(-1, 1)) ); }
   vec2 inter(in vec2 p1,in vec2 p2,float v1,float v2,float isovalue){ return mix(p1, p2, (isovalue - v1)/(v2 - v1)*.75 + .25/2.); }
   int isoLine(vec3 n3, vec2 ip0, vec2 ip1, vec2 ip2, float isovalue, float i, inout vec2 p0, inout vec2 p1) {
     p0 = vec2(1e5); p1 = vec2(1e5);
     int iTh = 0;
     if(n3.x>isovalue) iTh += 4;
     if(n3.y>isovalue) iTh += 2;
     if(n3.z>isovalue) iTh += 1;
     if(iTh == 1 || iTh == 6){ p0 = inter(ip1, ip2, n3.y, n3.z, isovalue); p1 = inter(ip2, ip0, n3.z, n3.x, isovalue); }
     else if(iTh == 2 || iTh == 5){ p0 = inter(ip0, ip1, n3.x, n3.y, isovalue); p1 = inter(ip1, ip2, n3.y, n3.z, isovalue); }
     else if(iTh == 3 || iTh == 4){ p0 = inter(ip0, ip1, n3.x, n3.y, isovalue); p1 = inter(ip2, ip0, n3.z, n3.x, isovalue); }
     if(iTh>=4 && iTh<=6){ vec2 tmp=p0; p0=p1; p1=tmp; }
     if(i == 0.){ vec2 tmp=p0; p0=p1; p1=tmp; }
     return iTh;
   }
   vec3 simplexContour(vec2 p){
     const float gSc = 8.; p *= gSc;
     vec2 oP = p;
     p += vec2(n2D3G(p*3.5), n2D3G(p*3.5+7.3))*.015;
     vec2 s = floor(p + (p.x + p.y)*.36602540378);
     p -= s - (s.x + s.y)*.211324865;
     float i = p.x < p.y? 1.:0.; vec2 ioffs = vec2(1.-i, i);
     vec2 ip0=vec2(0), ip1=ioffs-.2113248654, ip2=vec2(.577350269);
     vec2 ctr = (ip0+ip1+ip2)/3.; ip0-=ctr; ip1-=ctr; ip2-=ctr; p-=ctr;
     vec3 n3; n3.x=isoFunction(s); n3.y=isoFunction(s+ioffs); n3.z=isoFunction(s+1.);
     float d=1e5,d2=1e5,d3=1e5,d4=1e5,d5=1e5;
     vec2 p0,p1;
     int iTh=isoLine(n3,ip0,ip1,ip2,0.,i,p0,p1);
     d=min(d, distEdge(p-p0, p-p1)); if(iTh==7) d=0.; d3=min(d3, distLine(p-p0, p-p1)); d4=min(d4, min(length(p-p0), length(p-p1)));
     float tri=min(min(distLine(p-ip0,p-ip1),distLine(p-ip1,p-ip2)),distLine(p-ip2,p-ip0)); d5=min(d5,tri); d5=min(d5,length(p)-.02);
     int iTh2=isoLine(n3,ip0,ip1,ip2,-.15,i,p0,p1); d2=min(d2, distEdge(p-p0, p-p1)); float oldD2=d2;
     if(iTh2==7) d2=0.; if(iTh==7) d2=1e5; d2=max(d2, -d);
     d3=min(d3, distLine(p-p0,p-p1)); d4=min(d4,min(length(p-p0), length(p-p1)))-.075; d3-=.008;
     d/=gSc; d2/=gSc; d3/=gSc; d4/=gSc; d5/=gSc;
     vec3 col = vec3(1, .85, .6); float sf=0.002;
     if(d>0. && d2>0.) col=vec3(1,1.8,3)*.45;
     if(d>0.) col=mix(col, vec3(1,1.85,3)*.3,(1.-smoothstep(0.,sf,d2-.012)));
     col=mix(col, vec3(1.1,.85,.6),(1.-smoothstep(0.,sf,d2)));
     col=mix(col, vec3(1.5,.9,.6)*.6,(1.-smoothstep(0.,sf,d-.012)));
     col=mix(col, vec3(1,.8,.6)*vec3(.7,1.,.75)*.95,(1.-smoothstep(0.,sf,d)));
     if(d2>0.) col*=(abs(dot(n3, vec3(1)))*1.25+1.25)/2.; else col*=max(2.-(dot(n3, vec3(1))+1.45)/1.25,0.);
     float pat=abs(fract(tri*12.5+.4)-.5)*2.; col*=pat*.425+.75;
     col=mix(col, vec3(0),(1.-smoothstep(0.,sf*0.8,d5))*.98);
     col=mix(col, vec3(0),(1.-smoothstep(0.,sf*0.5,d3)));
     col=mix(col, vec3(0),(1.-smoothstep(0.,sf*0.7,d4)));
     col=mix(col, vec3(1),(1.-smoothstep(0.,sf*0.6,d4+.005)));
     vec2 uv=vUv* iResolution.xy;
     
     // Calculate distance to mouse position (in shader space)
     vec2 mousePos = iMouse * 2.0 - 1.0;
     mousePos.x *= iAspect;
     float mouseDist = length(p - mousePos * gSc * 0.5) / gSc;
     
     // Apply mouse hover effect - highlight region under mouse
     float mouseEffect = smoothstep(0.2, 0.0, mouseDist) * iMouseIntensity;
     
     // Mouse effect: brighten colors and enhance lines when hovering
     if (mouseEffect > 0.01) {
       // Enhance colors under mouse
       col = mix(col, col * 1.5, mouseEffect * 0.7);
       
       // Add subtle pulsing when mouse is down
       if (iMouseDown > 0.5) {
         float pulse = sin(iTime * 8.0) * 0.5 + 0.5;
         col = mix(col, col * vec3(1.0, 0.9, 0.8), mouseEffect * pulse * 0.5);
       }
     }
     
     return col;
   }
   
   void main() {
     // Calculate proper aspect-ratio-corrected coordinates
     vec2 fragCoord = vUv * iResolution.xy;
     
     // Center the coordinates and scale properly with aspect ratio
     vec2 uv = (vUv - 0.5) * 2.0;
     uv.x *= iAspect; // Apply aspect ratio correction
     
     // Enhanced reveal effect with wave pattern
     float revealProgress = iReveal;
     float waveAmplitude = 0.02 * (1.0 - revealProgress); // Reduced wave amplitude for smoother edge
     float waveFreq = 15.0;
     float waveFront = revealProgress + waveAmplitude * sin(vUv.y * waveFreq + iTime * 10.0);
     
     // Early discard for reveal animation with wavy edge - use transparent background
     if (vUv.x > waveFront) {
       gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Transparent background
       return;
     }
     
     // No reveal edge effect - we've removed the glow
     float revealEdge = 0.0;
     float pulseEffect = 0.0; // Not used anymore
     
     // Apply mouse panning when mouse is dragged
     vec2 mouseOffset = vec2(0.0);
     if (iMouseDown > 0.5) {
       // Calculate mouse position change from center as an offset
       vec2 mousePos = iMouse * 2.0 - 1.0;
       mouseOffset = mousePos * 0.1; // Adjust pan sensitivity
     }
     
     // Scale for better detail and add mouse interaction
     vec2 p = rot2(3.14159/12.) * (uv - mouseOffset) + vec2(.8660254, .5) * iTime/16.;
     
     // Adjust scaling to get sharper lines - smaller scale = more triangles = more detail
     p *= 0.4;
     
     vec3 col = simplexContour(p);
     vec2 screenUv = fragCoord / iResolution.xy;
     col *= pow(16.0*screenUv.x*screenUv.y*(1.0-screenUv.x)*(1.0-screenUv.y), 0.03) + 0.1;
     
     // Enhanced highlight at reveal edge with pulse - removed for cleaner animation
     // vec3 edgeColor = mix(vec3(1.0, 0.9, 0.7), vec3(1.0, 0.7, 0.4), pulseEffect);
     // col = mix(col, edgeColor * 2.0, revealEdge * 0.6);
     
     // Add subtle color shift based on reveal progress
     col = mix(col, col * vec3(0.9, 1.0, 1.1), (1.0 - revealProgress) * 0.3);
     
     gl_FragColor = vec4(sqrt(max(col,0.)), 1.0);
   }`
);
extend({ TriangleGridContourMaterial });

interface GeometryTopologyProps {
  animateIn?: boolean;
}

export default function GeometryTopology({
  animateIn = false,
}: GeometryTopologyProps) {
  const materialRef = useRef({} as any);
  const mouseRef = useRef({ x: 0, y: 0, down: false, intensity: 1.0 });
  const { size, gl, viewport } = useThree();
  const meshRef = useRef(null as any);

  // Mouse interaction setup
  useEffect(() => {
    const canvas = gl.domElement;

    // Mouse move handler
    const handleMouseMove = (event: any) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (event.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (event.clientY - rect.top) / rect.height; // Flip Y
    };

    // Mouse down/up handlers
    const handleMouseDown = () => {
      mouseRef.current.down = true;
    };
    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    // Touch handlers for mobile
    const handleTouchMove = (event: any) => {
      if (event.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x =
          (event.touches[0].clientX - rect.left) / rect.width;
        mouseRef.current.y =
          1.0 - (event.touches[0].clientY - rect.top) / rect.height;
      }
    };

    const handleTouchStart = () => {
      mouseRef.current.down = true;
    };
    const handleTouchEnd = () => {
      mouseRef.current.down = false;
    };

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);

    // Clean up
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);

      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gl]);

  // Add keyboard controls for intensity
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "+" || e.key === "=") {
        mouseRef.current.intensity = Math.min(
          mouseRef.current.intensity + 0.1,
          2.0
        );
      } else if (e.key === "-" || e.key === "_") {
        mouseRef.current.intensity = Math.max(
          mouseRef.current.intensity - 0.1,
          0.0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (animateIn && meshRef.current) {
      // Position off-screen to the left initially
      gsap.set(meshRef.current.position, {
        x: -viewport.width * 2,
      });

      // Animate in from left to center
      gsap.to(meshRef.current.position, {
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.0, // Start after text animation
      });
    }
  }, [animateIn, viewport.width]);

  // Add reveal animation with GSAP
  useEffect(() => {
    if (animateIn && materialRef.current && meshRef.current) {
      // Initial state - reset everything
      gsap.set(materialRef.current, {
        iReveal: 0.0,
      });

      // Set initial position, scale and rotation
      gsap.set(meshRef.current.scale, {
        x: 0.85,
        y: 0.85,
      });

      gsap.set(meshRef.current.rotation, {
        z: -0.1,
      });

      // Create a timeline for coordinated animations - start immediately
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // First animate the position - no delay
      tl.to(meshRef.current.position, {
        x: 0,
        duration: 1.4,
        ease: "power2.out",
      });

      // Then reveal the shader content with a slight overlap
      tl.to(
        materialRef.current,
        {
          iReveal: 1.0,
          duration: 1.2, // Slightly faster animation
          ease: "power1.out", // Changed to a simpler easing
          onComplete: () => {
            // Force a full reveal without edge glow after animation completes
            if (materialRef.current) {
              materialRef.current.iReveal = 1.01;
            }
          },
        },
        "-=1.0"
      ); // More overlap to speed up the animation

      // Animate scale and rotation slightly after reveal starts
      tl.to(
        meshRef.current.scale,
        {
          x: 1,
          y: 1,
          duration: 1.6,
          ease: "elastic.out(1, 0.75)",
        },
        "-=1.5"
      );

      tl.to(
        meshRef.current.rotation,
        {
          z: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.7)",
        },
        "-=1.5"
      );
    }
  }, [animateIn]);

  useFrame(({ clock, size, gl }) => {
    if (materialRef.current) {
      materialRef.current.iTime = clock.getElapsedTime();
      const dpr = gl.getPixelRatio();
      materialRef.current.iResolution.set(size.width * dpr, size.height * dpr);
      materialRef.current.iAspect = size.width / size.height;

      // Update mouse uniforms
      materialRef.current.iMouse.set(mouseRef.current.x, mouseRef.current.y);
      materialRef.current.iMouseDown = mouseRef.current.down ? 1.0 : 0.0;
      materialRef.current.iMouseIntensity = mouseRef.current.intensity;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1, innerHeight / innerWidth, 1]}>
      <planeGeometry args={[2, 2]} />
      <triangleGridContourMaterial
        ref={materialRef}
        transparent={true}
        iResolution={
          new THREE.Vector2(
            innerWidth * viewport.dpr,
            innerHeight * viewport.dpr
          )
        }
        iAspect={innerWidth / innerHeight}
      />
    </mesh>
  );
}

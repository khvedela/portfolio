import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface GyroCoreProps {
  color?: string;
  bgColor?: string;
}

interface ModelProps {
  isHovered: boolean;
  attackTrigger: number;
}

const ATTACK_ANIMATIONS = [
  "attackminiguns",
  "attackspin",
  "attackspinlonghands",
  "attackwithhand",
  "grab"
];

const Model = ({ isHovered, attackTrigger }: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/robot.glb');
  const { actions } = useAnimations(animations, group);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  
  // Responsive Logic
  const { viewport } = useThree();
  const isMobile = viewport.width < 8; // Approximate threshold for 3D viewport width
  
  // Config based on screen size
  const modelScale = isMobile ? 1.2 : 1.5;
  const modelPosition: [number, number, number] = isMobile 
    ? [0, -2.2, 0]      // Centered on mobile
    : [2.5, -2.4, 0];   // Offset on desktop

  // Mouse tracking logic - Subtle look-at
  useFrame((state) => {
    if (group.current) {
      const targetRotationX = (state.mouse.y * 0.1); 
      const targetRotationY = (state.mouse.x * 0.3); 
      
      // We apply this to the group rotation, but we must preserve the base rotation of Math.PI
      // So we lerp towards Math.PI + mouseOffset
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.PI + targetRotationY, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.1);
    }
  });

  // 1. Initial Greeting
  useEffect(() => {
    if (actions && !hasGreeted) {
      const hello = actions['hello'];
      const jump = actions['jump'];
      const idle = actions['iddle']; 

      if (hello && jump && idle) {
        // Ensure others are stopped
        actions['walking']?.stop();
        
        hello.reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1).play();
        hello.clampWhenFinished = true;

        const helloDuration = hello.getClip().duration * 1000;
        const jumpDuration = jump.getClip().duration * 1000;

        const jumpTimeout = setTimeout(() => {
           hello.fadeOut(0.3);
           jump.reset().fadeIn(0.3).setLoop(THREE.LoopOnce, 1).play();
           jump.clampWhenFinished = true;
        }, helloDuration - 300);

        const idleTimeout = setTimeout(() => {
           jump.fadeOut(0.5);
           idle.reset().fadeIn(0.5).play();
           setHasGreeted(true);
        }, helloDuration + jumpDuration - 600);

        return () => {
          clearTimeout(jumpTimeout);
          clearTimeout(idleTimeout);
        };
      }
    }
  }, [actions, hasGreeted]);

  // 2. Attack Trigger (Click)
  useEffect(() => {
    if (!actions || !hasGreeted || attackTrigger === 0) return;

    const idle = actions['iddle'];
    const walking = actions['walking'];
    const randomAttackName = ATTACK_ANIMATIONS[Math.floor(Math.random() * ATTACK_ANIMATIONS.length)];
    const attack = actions[randomAttackName];

    if (attack) {
      setIsAttacking(true);
      
      // Fade out current state (idle or walking)
      idle?.fadeOut(0.2);
      walking?.fadeOut(0.2);

      // Play attack
      attack.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1).play();
      attack.clampWhenFinished = true;

      const duration = attack.getClip().duration * 1000;
      
      const timeout = setTimeout(() => {
        attack.fadeOut(0.5);
        setIsAttacking(false);
        // Return to state will be handled by the Hover effect below
      }, duration - 200);

      return () => clearTimeout(timeout);
    }
  }, [attackTrigger, actions, hasGreeted]);

  // 3. Hover State (Walking vs Idle)
  useEffect(() => {
    if (!actions || !hasGreeted || isAttacking) return;

    const idle = actions['iddle'];
    const walking = actions['walking'];

    if (idle && walking) {
      if (isHovered) {
        idle.fadeOut(0.4);
        walking.reset().fadeIn(0.4).play();
      } else {
        walking.fadeOut(0.4);
        idle.reset().fadeIn(0.4).play();
      }
    }
  }, [isHovered, isAttacking, actions, hasGreeted]);

  // If we just finished attacking, we need to restore the correct state (Walk or Idle)
  useEffect(() => {
    if (!isAttacking && hasGreeted && actions) {
      const idle = actions['iddle'];
      const walking = actions['walking'];
      
      if (isHovered) {
        walking?.reset().fadeIn(0.5).play();
      } else {
        idle?.reset().fadeIn(0.5).play();
      }
    }
  }, [isAttacking, isHovered, hasGreeted, actions]);

  return (
    <group dispose={null}>
      {/* Group for rotation/positioning */}
      <group ref={group} position={modelPosition} rotation={[0, Math.PI, 0]}>
         <primitive object={scene} scale={modelScale} />
      </group>
      <ContactShadows position={[modelPosition[0], -2.4, 0]} opacity={0.5} scale={10} blur={2} far={4} />
    </group>
  );
};

const GyroCore = ({ color = '#00ffc0', bgColor = 'transparent' }: GyroCoreProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [attackTrigger, setAttackTrigger] = useState(0);

  return (
    <div 
      className="w-full h-full cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setAttackTrigger(Date.now())}
      title="Click for combat simulation"
    >
      <Canvas 
        camera={{ position: [0, 0.5, 11], fov: 30 }} 
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        shadows
      >
        <Environment preset="city" />
        
        <ambientLight intensity={0.6} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
        />
        <spotLight 
          position={[-5, 5, -5]} 
          intensity={3} 
          color={color}
        />

        <Suspense fallback={null}>
          <Model isHovered={isHovered} attackTrigger={attackTrigger} />
        </Suspense>
        
      </Canvas>
    </div>
  );
};

useGLTF.preload('/robot.glb');

export default GyroCore;

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useRobot } from '../../context/RobotContext';

interface GyroCoreProps {
  color?: string;
}

const ATTACK_ANIMATIONS = [
  "attackminiguns",
  "attackspin",
  "attackspinlonghands",
  "attackwithhand",
  "grab"
];

const Model = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/robot.glb');
  const { actions } = useAnimations(animations, group);
  const { mode } = useRobot();
  const { viewport } = useThree();
  
  const isMobile = viewport.width < 8;

  // Target State
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(2.5, -2.4, 0));
  const [targetRot, setTargetRot] = useState(new THREE.Euler(0, Math.PI, 0));
  
  // Animation Logic
  useEffect(() => {
    if (!actions) return;

    // Stop all current
    Object.values(actions).forEach(action => action?.fadeOut(0.5));

    let animName = 'iddle';
    
    switch (mode) {
      case 'header':
        // Logic for header is handled by initial load sequence usually, but here we enforce idle/walk
        animName = 'iddle';
        setTargetPos(new THREE.Vector3(isMobile ? 0 : 2.5, isMobile ? -2.2 : -2.4, 0));
        setTargetRot(new THREE.Euler(0, Math.PI - 0.4, 0));
        break;
      case 'about':
        animName = 'walking'; // Patrol
        setTargetPos(new THREE.Vector3(isMobile ? 0 : -3.5, -2.4, 0)); // Move Left
        setTargetRot(new THREE.Euler(0, Math.PI + 0.5, 0));
        break;
      case 'skills':
        animName = 'attackminiguns'; // Show power
        setTargetPos(new THREE.Vector3(0, -2.4, 1)); // Center and closer
        setTargetRot(new THREE.Euler(0, Math.PI, 0));
        break;
      case 'work':
        animName = 'walkingstop'; // Observing
        setTargetPos(new THREE.Vector3(isMobile ? 0 : 3.5, -2.4, 0)); // Move Right
        setTargetRot(new THREE.Euler(0, Math.PI - 0.5, 0));
        break;
      case 'contact':
        animName = 'hello'; // Greet
        setTargetPos(new THREE.Vector3(0, -1.5, 3)); // Very close up
        setTargetRot(new THREE.Euler(0, Math.PI, 0));
        break;
    }

    const action = actions[animName];
    if (action) {
      action.reset().fadeIn(0.5).play();
      if (animName === 'hello' || animName.startsWith('attack')) {
         // Loop attack/hello differently? default loop is fine for now
      }
    }

  }, [mode, actions, isMobile]);

  // Frame Loop for Smooth Movement
  useFrame((state) => {
    if (group.current) {
      // 1. Move to target position
      group.current.position.lerp(targetPos, 0.05);
      
      // 2. Rotate to target rotation (base)
      // We interpolate the rotation manually or use quaternions ideally, but simple Euler lerp for Y works here
      // actually lerping Euler is dangerous (gimbal lock), but for simple Y axis it's usually ok.
      // Let's just lerp the Y and X slightly for mouse look on top.
      
      const mouseLookX = (state.mouse.y * 0.1);
      const mouseLookY = (state.mouse.x * 0.2);

      const currentY = group.current.rotation.y;
      const targetY = targetRot.y + mouseLookY;
      
      // Simple lerp for float
      group.current.rotation.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRot.x + mouseLookX, 0.1);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
};

const GyroCore = ({ color = '#00ffc0' }: GyroCoreProps) => {
  return (
    <div className="w-full h-full fixed inset-0 pointer-events-none z-0">
      <Canvas 
        camera={{ position: [0, 0.5, 11], fov: 30 }} 
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        shadows
      >
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <spotLight position={[-5, 5, -5]} intensity={3} color={color} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>
        
        {/* Shadow needs to follow the robot roughly, or just cover the floor */}
        <ContactShadows position={[0, -2.4, 0]} opacity={0.5} scale={20} blur={2} far={4} />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/robot.glb');

export default GyroCore;

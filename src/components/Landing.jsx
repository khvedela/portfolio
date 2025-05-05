// Landing.jsx
import React, { Suspense, useState, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Grass from "./grass/Grass.jsx";
import { Perf } from "r3f-perf";
import { Sky } from "@react-three/drei";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import gsap from "gsap";
import Butterflies from "./Butterfly.jsx";
import Navigation from "./Navigation.jsx";

function CameraRotator({ active, initialQuat, targetQuat }) {
    const { camera } = useThree();
    const animating = useRef(false);

    React.useEffect(() => {
        if (active && !animating.current) {
            animating.current = true;

            // Create an object to animate
            const dummy = { t: 0 };

            gsap.to(dummy, {
                t: 1,
                duration: 2, // Animation duration in seconds
                ease: "power2.inOut", // Smooth easing function
                onUpdate: () => {
                    camera.quaternion.slerpQuaternions(
                        initialQuat,
                        targetQuat,
                        dummy.t
                    );
                },
                onComplete: () => {
                    animating.current = false;
                }
            });
        }
    }, [active, camera, initialQuat, targetQuat]);

    return null;
}


export default function Landing() {
    const [entered, setEntered] = useState(false);
    const buttonRef = useRef(null);
    const initialQuat = useRef(new THREE.Quaternion());
    const targetQuat  = useRef(new THREE.Quaternion());

    const handleCreated = ({ camera }) => {
        // 1) look straight up
        camera.lookAt(0, 100, 30);
        initialQuat.current.copy(camera.quaternion);
        // 2) look at the scene center
        camera.lookAt(0, 0, 0);
        targetQuat.current.copy(camera.quaternion);
        // 3) reset to initial (looking up)
        camera.quaternion.copy(initialQuat.current);
    };

    return (
        <div style={{width:'100%', height:'100%'}}>
            {entered && <Navigation />}
            {!entered && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                    }}
                >
                    <button
                        ref={buttonRef}
                        onClick={() => setEntered(true)}
                        style={{
                            fontSize: "1.8rem",
                            fontFamily: "Courgette",
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        enter
                    </button>
                </div>
            )}


            <Canvas
                onCreated={handleCreated}
                camera={{ position: [0, 10, 30], fov: 60 }}
            >
                <CameraRotator
                    active={entered}
                    initialQuat={initialQuat.current}
                    targetQuat={targetQuat.current}
                />

                {/*<Perf position="top-left" />*/}
                <Sky azimuth={1} inclination={0.6} distance={1000} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <Suspense fallback={null}>
                    <Butterflies count={150} width={100} />
                    <Grass />
                    <EffectComposer>
                        <Noise opacity={0.7} blendFunction={BlendFunction.OVERLAY} />
                        <Vignette eskil={false} offset={0.03} darkness={0.6} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}

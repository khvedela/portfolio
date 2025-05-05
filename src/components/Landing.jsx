// Landing.jsx
import React, {Suspense, useState, useRef, useEffect} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Grass from "./grass/Grass.jsx";
import {Html, Sky, useProgress} from "@react-three/drei";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import gsap from "gsap";
import Butterflies from "./Butterfly.jsx";
import Navigation from "./Navigation.jsx";
import Balloons from "./Baloons.jsx";

function CameraRotator({ active, initialQuat, targetQuat }) {
    const { camera } = useThree();
    const timeline = useRef(null);

    useEffect(() => {
        if (active) {
            // Create a new GSAP timeline
            timeline.current = gsap.timeline({
                onComplete: () => {
                    camera.quaternion.copy(targetQuat);
                }
            });

            // Store initial quaternion values
            const initialRotation = {
                _x: camera.quaternion.x,
                _y: camera.quaternion.y,
                _z: camera.quaternion.z,
                _w: camera.quaternion.w
            };

            // Target quaternion values
            const targetRotation = {
                _x: targetQuat.x,
                _y: targetQuat.y,
                _z: targetQuat.z,
                _w: targetQuat.w
            };

            // Animate the quaternion values
            timeline.current.to(initialRotation, {
                duration: 2.5,
                _x: targetRotation._x,
                _y: targetRotation._y,
                _z: targetRotation._z,
                _w: targetRotation._w,
                ease: "power2.inOut",
                onUpdate: () => {
                    camera.quaternion.set(
                        initialRotation._x,
                        initialRotation._y,
                        initialRotation._z,
                        initialRotation._w
                    );
                }
            });
        } else {
            // Kill the animation if active becomes false
            if (timeline.current) {
                timeline.current.kill();
            }
            camera.quaternion.copy(initialQuat);
        }

        return () => {
            if (timeline.current) {
                timeline.current.kill();
            }
        };
    }, [active, camera, initialQuat, targetQuat]);

    return null;
}



export default function Landing() {
    const [entered, setEntered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const buttonRef = useRef(null);
    const initialQuat = useRef(new THREE.Quaternion());
    const targetQuat  = useRef(new THREE.Quaternion());

    const audioRef = useRef(new Audio('/ambient_sound.mp3'));
    const [audioInitialized, setAudioInitialized] = useState(false);


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

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);


    const handleEnter = () => {
        if (!audioInitialized) {
            audioRef.current.play()
                .then(() => {
                    setAudioInitialized(true);
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        }
        setEntered(true);
    };


    return (
        <div style={{width:'100%', height:'100%'}}>
            {entered && <Navigation />}
            {!entered && isLoaded && (
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
                        onClick={handleEnter}
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
                camera={{ position: [0, 15, 50], fov: 60 }}
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

                <Suspense fallback={<Loader onLoad={() => setIsLoaded(true)} />}>
                    <Butterflies count={50} width={100} />
                    <Balloons />
                    <Grass />
                    <EffectComposer>
                        <Noise opacity={0.5} blendFunction={BlendFunction.OVERLAY} />
                        <Vignette eskil={false} offset={0.03} darkness={0.6} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}

function Loader({ onLoad }) {
    const { progress } = useProgress();

    React.useEffect(() => {
        if (progress === 100) {
            onLoad();
        }
    }, [progress, onLoad]);

    return (
        <Html center style={{ color: "white", fontSize: "1.2rem" }}>
            {Math.floor(progress)}% loading…
        </Html>
    );
}


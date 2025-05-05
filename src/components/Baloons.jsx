import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useEffect } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function Balloons() {
    const gltf = useLoader(GLTFLoader, '/baloons.glb')

    // Add some floating animation
    useFrame((state) => {
        gltf.scene.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + 5 // Hover between 4.7 and 5.3 units high
        gltf.scene.rotation.y += 0.001 // Slowly rotate
    })

    useEffect(() => {
        if (gltf.scene) {
            // Adjust the initial position
            gltf.scene.position.set(0, 5, 0) // Position above the grass
            gltf.scene.scale.set(3, 3, 3) // Adjust scale if needed

            // Make sure it receives and casts shadows
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                    // Optional: Adjust material settings if needed
                    if (child.material) {
                        child.material.roughness = 0.5
                        child.material.metalness = 0.5
                    }
                }
            })
        }
    }, [gltf])

    return <primitive object={gltf.scene} />
}
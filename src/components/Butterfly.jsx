import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const BUTTERFLY_TYPES = {
    blue: {
        foreWingScale: [0.8, 0.6, 1],
        hindWingScale: [0.6, 0.5, 1],
        speed: 0.28,
        flapSpeed: 8,
        size: 0.25,
        wingPattern: {
            primary: '#4169E1',    // Royal Blue
            secondary: '#87CEEB',   // Sky Blue
            spots: '#FFFFFF',       // White
            border: '#000080'       // Navy
        }
    },
    red: {
        foreWingScale: [0.85, 0.65, 1],
        hindWingScale: [0.65, 0.55, 1],
        speed: 0.25,
        flapSpeed: 8.5,
        size: 0.26,
        wingPattern: {
            primary: '#FF4444',
            secondary: '#FF8888',
            spots: '#FFFFFF',
            border: '#800000'
        }
    },
    yellow: {
        wingScale: [1.0, 0.85, 1],
        speed: 0.27,
        flapSpeed: 7,
        size: 0.25,
        wingPattern: {
            primary: '#FFD700',     // Gold
            secondary: '#FFF68F',   // Khaki
            spots: '#FFFFFF',       // White
            border: '#806B00'       // Dark Gold
        }
    },
    green: {
        wingScale: [0.95, 0.85, 1],
        speed: 0.3,
        flapSpeed: 7.5,
        size: 0.24,
        wingPattern: {
            primary: '#228B22',     // Forest Green
            secondary: '#98FB98',   // Pale Green
            spots: '#FFFFFF',       // White
            border: '#006400'       // Dark Green
        }
    }
}

function createWingTexture(type, isForewing = true) {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    const pattern = BUTTERFLY_TYPES[type].wingPattern

    // Fill background
    ctx.fillStyle = pattern.primary
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create gradient for wing base
    const gradient = ctx.createRadialGradient(
        256, 256, 0,
        256, 256, 400
    )
    gradient.addColorStop(0, pattern.secondary)
    gradient.addColorStop(0.7, pattern.primary)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add spots pattern
    ctx.fillStyle = pattern.spots
    for (let i = 0; i < 8; i++) {
        const x = 128 + Math.random() * 256
        const y = 128 + Math.random() * 256
        const radius = 5 + Math.random() * 15

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
    }

    // Add border pattern
    ctx.strokeStyle = pattern.border
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(canvas.width, 0)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()
    ctx.stroke()

    // Create texture
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
}

function ButterflyWing({ side = 1, type, isForewing = true }) {
    const shape = new THREE.Shape()

    if (isForewing) {
        // Forewing shape (more triangular and larger)
        shape.moveTo(0, 0)
        shape.bezierCurveTo(
            1.8 * side, 0.8,   // Control point 1
            2.2 * side, 0.4,   // Control point 2
            2.0 * side, -0.2   // End point
        )
        shape.bezierCurveTo(
            1.8 * side, -0.8,
            1.2 * side, -1.2,
            0.2 * side, -0.8
        )
        shape.bezierCurveTo(
            0.1 * side, -0.4,
            0, -0.2,
            0, 0
        )
    } else {
        // Hindwing shape (more rounded)
        shape.moveTo(0, -0.3)
        shape.bezierCurveTo(
            1.2 * side, -0.2,
            1.6 * side, -0.6,
            1.4 * side, -1.0
        )
        shape.bezierCurveTo(
            1.2 * side, -1.4,
            0.8 * side, -1.6,
            0.2 * side, -1.2
        )
        shape.bezierCurveTo(
            0.1 * side, -0.8,
            0, -0.5,
            0, -0.3
        )
    }

    const butterflyType = BUTTERFLY_TYPES[type]
    const scale = isForewing ? butterflyType.foreWingScale : butterflyType.hindWingScale
    const texture = createWingTexture(type, isForewing)

    return (
        <mesh
            position={[isForewing ? 0.08 * side : 0.05 * side, isForewing ? 0 : -0.2, 0]}
            scale={scale}
            // Remove the previous rotation here as we'll handle it in the parent group
        >
            <shapeGeometry args={[shape]} />
            <meshPhysicalMaterial
                map={texture}
                transparent={true}
                side={THREE.DoubleSide}
                opacity={0.92}
                clearcoat={0.4}
                clearcoatRoughness={0.2}
                metalness={0.05}
                roughness={0.6}
                iridescence={0.4}
                iridescenceIOR={1.3}
            />
        </mesh>
    )

}

function Butterfly({ position = [0, 0, 0], type = 'blue' }) {
    const butterflyRef = useRef()
    const leftWingRef = useRef()
    const rightWingRef = useRef()

    useFrame((state) => {
        const time = state.clock.elapsedTime
        const butterfly = butterflyRef.current
        const leftWing = leftWingRef.current
        const rightWing = rightWingRef.current

        // Flying movement
        const xMovement = Math.sin(time * BUTTERFLY_TYPES[type].speed) * 2
        const yMovement = Math.cos(time * BUTTERFLY_TYPES[type].speed * 0.5) * 0.3
        const zMovement = Math.cos(time * BUTTERFLY_TYPES[type].speed) * 2

        butterfly.position.x = position[0] + xMovement
        butterfly.position.y = position[1] + yMovement + Math.sin(time * 0.5) * 0.1
        butterfly.position.z = position[2] + zMovement

        // Wing folding animation
        const flapSpeed = BUTTERFLY_TYPES[type].flapSpeed
        const baseFlap = Math.sin(time * flapSpeed)
        // Make the flapping motion more sharp and snappy
        const flapAmount = Math.pow(Math.abs(baseFlap), 0.7) * Math.sign(baseFlap)
        // Convert to rotation (adjust multiplier to control fold amount)
        const wingRotation = flapAmount * 0.8 // adjust this value to control how much the wings fold

        // Apply rotations to wings
        if (leftWing && rightWing) {
            // Left wing folds up
            leftWing.rotation.z = wingRotation
            // Right wing folds up (opposite direction)
            rightWing.rotation.z = -wingRotation
        }

        // Rotation towards movement direction
        const targetRotationY = Math.atan2(xMovement, zMovement)
        butterfly.rotation.y = targetRotationY

        // Add slight body tilt during flight
        butterfly.rotation.x = Math.PI / 2 + Math.sin(time * flapSpeed) * 0.1
        // Add slight banking during turns
        butterfly.rotation.z = Math.sin(targetRotationY) * 0.2
    })

    return (
        <group ref={butterflyRef}>
            <group scale={BUTTERFLY_TYPES[type].size}>
                {/* Wings with separate left and right groups for folding */}
                {/* Left wing group */}
                <group ref={leftWingRef} position={[0, 0, 0]}>
                    <ButterflyWing side={1} type={type} isForewing={true} />
                    <ButterflyWing side={1} type={type} isForewing={false} />
                </group>
                {/* Right wing group */}
                <group ref={rightWingRef} position={[0, 0, 0]}>
                    <ButterflyWing side={-1} type={type} isForewing={true} />
                    <ButterflyWing side={-1} type={type} isForewing={false} />
                </group>

                {/* Body */}
                <group>
                    {/* Thorax */}
                    <mesh>
                        <capsuleGeometry args={[0.032, 0.28, 12, 8]} />
                        <meshPhongMaterial color="#1a1a1a" />
                    </mesh>

                    {/* Abdomen */}
                    <mesh position={[0, -0.15, 0]}>
                        <capsuleGeometry args={[0.025, 0.2, 8, 8]} />
                        <meshPhongMaterial color="#1a1a1a" />
                    </mesh>

                    {/* Head */}
                    <mesh position={[0, 0.18, 0]}>
                        <sphereGeometry args={[0.04, 12, 12]} />
                        <meshPhongMaterial color="#1a1a1a" />
                    </mesh>

                    {/* Antennae */}
                    <group position={[0, 0.21, 0]}>
                        <mesh position={[0.02, 0, 0]} rotation={[Math.PI * 0.18, 0.2, 0]}>
                            <cylinderGeometry args={[0.003, 0.001, 0.25, 8]} />
                            <meshPhongMaterial color="#1a1a1a" />
                        </mesh>
                        <mesh position={[-0.02, 0, 0]} rotation={[Math.PI * 0.18, -0.2, 0]}>
                            <cylinderGeometry args={[0.003, 0.001, 0.25, 8]} />
                            <meshPhongMaterial color="#1a1a1a" />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    )
}


export default function Butterflies({ count = 15, width = 100 }) {
    const types = ['blue', 'green', 'red', 'yellow']

    return (
        <group>
            {Array.from({ length: count }).map((_, i) => (
                <Butterfly
                    key={i}
                    type={types[Math.floor(Math.random() * types.length)]}
                    position={[
                        (Math.random() - 0.5) * width * 0.7,
                        2.5 + Math.random() * 2,
                        (Math.random() - 0.5) * width * 0.7
                    ]}
                />
            ))}
        </group>
    )
}

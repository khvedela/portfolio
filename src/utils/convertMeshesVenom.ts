import * as THREE from 'three'
import { venomWireVertex, venomWireFragment } from '../shaders/VenomWireShaders'

export function convertMeshesVenom(object3D: THREE.Object3D) {
  object3D.traverse((child: any) => {
    if (child.isMesh && child.geometry) {
      const geo = child.geometry;
      const count = geo.attributes.position.count;
      const randY = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        randY[i] = (Math.random() - 0.5) * 5.0;
      }
      geo.setAttribute('aRandY', new THREE.BufferAttribute(randY, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: venomWireVertex,
        fragmentShader: venomWireFragment,
        transparent: true,
        wireframe: true,
        uniforms: {
          uTime: { value: 0 },
          uRevealHeight: { value: 0 }
        }
      });

      child.material = mat;
      child.material.side = THREE.DoubleSide;

      // Optionally hide the original mesh if it has multiple materials
      // or if there's some conflict. Usually not necessary if child.material is replaced.
    }
  });
}
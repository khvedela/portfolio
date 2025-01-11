/// <reference lib="webworker" />
// ^ Ensures we get the correct types for self, postMessage, etc.

import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
// If you need DRACO compression, also import DRACOLoader, etc.

// We declare self as a DedicatedWorkerGlobalScope so TS knows the environment
declare let self: DedicatedWorkerGlobalScope;

/**
 * The message we receive from the main thread.
 */
interface WorkerInput {
  url: string;       // URL to the .glb file
  dracoPath?: string; // optional path to Draco decoders if using compression
}

/**
 * The structure we post back to the main thread.
 */
interface WorkerResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Listen for messages from main thread to load/parse the GLB.
 */
self.onmessage = async (event: MessageEvent<WorkerInput>) => {
  const { url, dracoPath } = event.data;
  
  try {
    const loader = new GLTFLoader();

    // If Draco is needed:
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath(dracoPath || '/draco/');
    // loader.setDRACOLoader(dracoLoader);

    // Fetch the .glb as ArrayBuffer
    const arrayBuffer = await fetch(url).then(r => r.arrayBuffer());

    // Parse in the worker
    const gltf: GLTF = await new Promise((resolve, reject) => {
    loader.parse(arrayBuffer, '', resolve, reject);
    });

    // Convert the gltf.scene to some serializable format
    const payload = convertSceneToPayload(gltf.scene);

    const response: WorkerResponse = {
      success: true,
      data: payload
    };
    postMessage(response);

  } catch (err: unknown) {
    console.error('Worker failed to load GLB:', err);
    const response: WorkerResponse = {
      success: false,
      error: String(err)
    };
    postMessage(response);
  }
};

/**
 * Convert a THREE.Object3D hierarchy to a simplified,
 * serializable JSON structure of geometry, transforms, and materials.
 */
function convertSceneToPayload(root: THREE.Object3D): any {
  const payload: any[] = [];

  root.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const meshData: any = {
        name:     mesh.name,
        position: mesh.position.toArray(),
        rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
        scale:    mesh.scale.toArray()
      };

      // Serialize geometry
      if (mesh.geometry) {
        meshData.geometry = {};
        const geometry = mesh.geometry;
        
        // Attributes
        for (const attrName in geometry.attributes) {
          const attr = geometry.attributes[attrName] as THREE.BufferAttribute;
          meshData.geometry[attrName] = {
            itemSize: attr.itemSize,
            array: Array.from(attr.array)  // convert typed array to normal array
          };
        }
        // Index
        if (geometry.index) {
          meshData.geometry.index = {
            array: Array.from(geometry.index.array)
          };
        }
      }

      // Basic material info
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        meshData.material = {
          color: material.color?.toArray() ?? [1, 1, 1],
          roughness: material.roughness ?? 1,
          metalness: material.metalness ?? 0,
          // add more if needed
        };
      }

      payload.push(meshData);
    }
  });

  return payload;
}

// Make sure the file is treated as a module.
export {};
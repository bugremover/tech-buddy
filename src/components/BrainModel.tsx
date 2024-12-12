import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function BrainModel() {
  const brainRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.005;
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={brainRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#9333ea"
          wireframe
          transparent
          opacity={0.7}
        />
      </Sphere>
    </group>
  );
}
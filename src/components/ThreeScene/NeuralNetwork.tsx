import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  const connections = new Float32Array(particleCount * 6);

  // Generate random positions for nodes
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 4;
    positions[i + 1] = (Math.random() - 0.5) * 4;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }

  // Create connections between nodes
  for (let i = 0; i < particleCount - 1; i++) {
    connections[i * 6] = positions[i * 3];
    connections[i * 6 + 1] = positions[i * 3 + 1];
    connections[i * 6 + 2] = positions[i * 3 + 2];
    connections[i * 6 + 3] = positions[(i + 1) * 3];
    connections[i * 6 + 4] = positions[(i + 1) * 3 + 1];
    connections[i * 6 + 5] = positions[(i + 1) * 3 + 2];
  }

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
      pointsRef.current.rotation.y += 0.002;
      linesRef.current.rotation.y += 0.002;
      
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#9333ea"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * 2}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4c1d95" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}
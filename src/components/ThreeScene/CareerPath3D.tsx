import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: string;
  position: [number, number, number];
  label: string;
}

interface Connection {
  start: [number, number, number];
  end: [number, number, number];
}

export default function CareerPath3D({ path }: { path: string[] }) {
  const linesRef = useRef<THREE.LineSegments>();
  const nodesRef = useRef<THREE.Group>();

  const { nodes, connections } = useMemo(() => {
    const nodes: Node[] = path.map((step, i) => ({
      id: `node-${i}`,
      position: [
        Math.cos((i / path.length) * Math.PI * 2) * 2,
        i * 0.5 - (path.length * 0.25),
        Math.sin((i / path.length) * Math.PI * 2) * 2
      ],
      label: step
    }));

    const connections: Connection[] = nodes.slice(0, -1).map((node, i) => ({
      start: node.position,
      end: nodes[i + 1].position
    }));

    return { nodes, connections };
  }, [path]);

  useFrame((state) => {
    if (linesRef.current && nodesRef.current) {
      const t = state.clock.getElapsedTime();
      linesRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
      nodesRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <group ref={nodesRef}>
        {nodes.map((node) => (
          <group key={node.id} position={node.position}>
            <mesh>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#9333ea" />
            </mesh>
            <Text
              position={[0.3, 0, 0]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="left"
            >
              {node.label}
            </Text>
          </group>
        ))}
      </group>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={Float32Array.from(
              connections.flatMap(({ start, end }) => [...start, ...end])
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4c1d95" />
      </lineSegments>
    </group>
  );
}
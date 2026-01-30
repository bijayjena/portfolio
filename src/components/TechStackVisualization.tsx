import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { skillsData } from '@/data/skillsData';

// Tech stack item component
function TechItem({ 
  position, 
  name, 
  category, 
  color 
}: { 
  position: [number, number, number]; 
  name: string; 
  category: string; 
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && textRef.current) {
      // Gentle floating animation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Text always faces camera
      textRef.current.lookAt(state.camera.position);
    }
  });

  const categoryColors = {
    'Frontend': '#61DAFB',
    'Backend': '#68A063',
    'AI & LLMs': '#FF6B6B',
    'DevOps & Tools': '#FFA726',
    'Architecture': '#9C27B0',
    'Data & Analytics': '#2196F3'
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Glowing sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color={categoryColors[category as keyof typeof categoryColors] || color}
            emissive={categoryColors[category as keyof typeof categoryColors] || color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Tech name text */}
        <group ref={textRef} position={[0, -0.6, 0]}>
          <Text
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
          <Text
            fontSize={0.08}
            color="#888"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.2, 0]}
          >
            {category}
          </Text>
        </group>
      </group>
    </Float>
  );
}

// Animated background particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#4A90E2" transparent opacity={0.6} />
    </points>
  );
}

// Main scene component
function TechScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create positions for tech items in a spiral pattern
  const techPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const radius = 3;
    const height = 4;
    
    if (!skillsData || skillsData.length === 0) {
      return positions;
    }
    
    skillsData.forEach((skill, index) => {
      const angle = (index / skillsData.length) * Math.PI * 2;
      const y = (index / skillsData.length - 0.5) * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, y, z]);
    });
    
    return positions;
  }, []);

  if (!skillsData || skillsData.length === 0) {
    return null;
  }

  return (
    <group ref={groupRef}>
      <BackgroundParticles />
      {skillsData.map((skill, index) => (
        <TechItem
          key={skill.name}
          position={techPositions[index]}
          name={skill.name}
          category={skill.category}
          color="#4A90E2"
        />
      ))}
    </group>
  );
}

// Main component
const TechStackVisualization = () => {
  // Safety check for skillsData
  if (!skillsData || skillsData.length === 0) {
    return (
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <p className="text-white text-sm">Loading tech stack...</p>
      </div>
    );
  }

  return (
    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        
        <TechScene />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default TechStackVisualization;
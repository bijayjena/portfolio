import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { skillsData } from '@/data/skillsData';
import ErrorBoundary from '@/components/ErrorBoundary';

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
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
      
      // Text always faces camera
      textRef.current.lookAt(state.camera.position);
    }
  });

  const categoryColors: Record<string, string> = {
    'Frontend': '#61DAFB',
    'Backend': '#68A063',
    'AI & LLMs': '#D19A66',
    'DevOps & Tools': '#E5C07B',
    'Architecture': '#4FC1FF',
    'Security & Auth': '#56B6C2',
    'Platform & Delivery': '#ABB2BF',
    'Performance': '#98C379',
    'Data & Analytics': '#4AA5F0'
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Glowing sphere - slightly larger */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.35, 20, 20]} />
          <meshStandardMaterial 
            color={categoryColors[category] || color}
            emissive={categoryColors[category] || color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.85}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        
        {/* Tech name text - better positioning */}
        <group ref={textRef} position={[0, -0.7, 0]}>
          <Text
            fontSize={0.18}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {name}
          </Text>
          <Text
            fontSize={0.1}
            color="#aaa"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.25, 0]}
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
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#4A90E2" transparent opacity={0.4} />
    </points>
  );
}

// Main scene component
function TechScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slower rotation for better visibility
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  // Create positions for tech items in a spiral pattern with better spacing
  const techPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const baseRadius = 4; // Increased from 3
    const height = 8; // Increased from 4
    const spiralTurns = 2; // Number of spiral rotations
    
    if (!skillsData || skillsData.length === 0) {
      return positions;
    }
    
    skillsData.forEach((skill, index) => {
      const progress = index / skillsData.length;
      
      // Create a spiral pattern with varying radius
      const angle = progress * Math.PI * 2 * spiralTurns;
      const radiusVariation = Math.sin(progress * Math.PI) * 0.5; // Adds wave to radius
      const currentRadius = baseRadius + radiusVariation;
      
      // Vertical position with slight wave
      const y = (progress - 0.5) * height;
      
      // Horizontal positions
      const x = Math.cos(angle) * currentRadius;
      const z = Math.sin(angle) * currentRadius;
      
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

// Loading fallback
const LoadingFallback = () => (
  <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
    <div className="text-center space-y-3">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-white text-sm">Loading tech stack...</p>
    </div>
  </div>
);

// Main component
const TechStackVisualization = () => {
  // Safety check for skillsData
  if (!skillsData || skillsData.length === 0) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary fallback={<LoadingFallback />}>
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 12], fov: 65 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
            dpr={[1, 2]} // Limit pixel ratio for performance
          >
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[15, 15, 15]} intensity={1.2} />
            <pointLight position={[-15, -15, -15]} intensity={0.6} color="#4A90E2" />
            <spotLight position={[0, 20, 0]} intensity={0.5} angle={0.3} penumbra={1} />
            
            <TechScene />
            
            <OrbitControls
              enableZoom={true}
              minDistance={8}
              maxDistance={18}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default TechStackVisualization;

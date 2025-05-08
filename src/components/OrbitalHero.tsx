"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Mock debris data
const DEBRIS_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: `debris-${i}`,
  orbit: {
    radius: 1.5 + Math.random() * 1.5,
    speed: 0.05 + Math.random() * 0.1,
    inclination: Math.random() * Math.PI * 0.5,
    phase: Math.random() * Math.PI * 2
  },
  size: 0.03 + Math.random() * 0.05,
  riskScore: Math.floor(Math.random() * 100),
  origin: ['USA', 'Russia', 'China', 'EU', 'India', 'Japan'][Math.floor(Math.random() * 6)]
}));

// Earth Component
function Earth(props: any) {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <mesh ref={earthRef} {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#1e4571" 
        emissive="#072c5e"
        roughness={1} 
        metalness={0}
      />
    </mesh>
  );
}

// Debris Component
function Debris({ debris }: { debris: any }) {
  const debrisRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (debrisRef.current) {
      const time = clock.getElapsedTime();
      const { radius, speed, inclination, phase } = debris.orbit;
      
      // Calculate position on the orbital path
      const angle = time * speed + phase;
      debrisRef.current.position.x = radius * Math.cos(angle);
      debrisRef.current.position.z = radius * Math.sin(angle) * Math.cos(inclination);
      debrisRef.current.position.y = radius * Math.sin(angle) * Math.sin(inclination);
      
      // Rotate the debris
      debrisRef.current.rotation.x += 0.01;
      debrisRef.current.rotation.y += 0.01;
    }
  });
  
  // Color based on risk score
  const getColor = () => {
    if (debris.riskScore > 70) return '#FF7F11'; // High risk - solar-orange
    if (debris.riskScore > 30) return '#FFC107'; // Medium risk - amber
    return '#00FFC6'; // Low risk - neon-cyan
  };
  
  return (
    <mesh ref={debrisRef}>
      <boxGeometry args={[debris.size, debris.size, debris.size]} />
      <meshStandardMaterial 
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={0.5}
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}

// Orbital paths
function OrbitalPaths() {
  return (
    <>
      {DEBRIS_DATA.map((debris, index) => {
        const curve = new THREE.EllipseCurve(
          0, 0,
          debris.orbit.radius, debris.orbit.radius,
          0, 2 * Math.PI,
          false,
          0
        );
        
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(
          points.map(p => 
            new THREE.Vector3(
              p.x, 
              Math.sin(debris.orbit.inclination) * Math.sin(debris.orbit.phase + index) * 0.1, 
              p.y
            )
          )
        );
        
        return (
          <line key={`path-${debris.id}`}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial 
              attach="material" 
              color={debris.riskScore > 70 ? '#FF7F11' : '#00FFC6'} 
              transparent
              opacity={0.2}
              linewidth={1}
            />
          </line>
        );
      })}
    </>
  );
}

// Main Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      
      <Earth position={[0, 0, 0]} />
      <OrbitalPaths />
      
      {DEBRIS_DATA.map((debris) => (
        <Debris key={debris.id} debris={debris} />
      ))}
      
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={8}
      />
    </>
  );
}

// Orbital Hero Component
const OrbitalHero = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: '#0B1A2F' }}
      >
        <Scene />
      </Canvas>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-space-navy/0 via-space-navy/30 to-space-navy/80">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4">
          Turn Space Junk into <span className="text-neon-cyan">Opportunity</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
          The first decentralized marketplace for tokenizing, tracking, and trading space debris liabilities.
        </p>
        <button className="btn-primary text-lg px-8 py-3">
          Get Started
        </button>
        
        <div className="absolute bottom-8 flex items-center justify-center">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitalHero;

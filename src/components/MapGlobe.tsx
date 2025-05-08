import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from '../utils/motion';

// Mock debris data for the globe
const DEBRIS_DATA = Array.from({ length: 75 }, (_, i) => ({
  id: `debris-${i + 1000}`,
  name: `Debris #${i + 1000}`,
  position: {
    lat: (Math.random() * 180) - 90,
    lon: (Math.random() * 360) - 180,
  },
  altitude: 200 + Math.random() * 800,
  size: 0.02 + Math.random() * 0.03,
  riskScore: Math.floor(Math.random() * 100),
  origin: ['USA', 'Russia', 'China', 'EU', 'India', 'Japan'][Math.floor(Math.random() * 6)],
  type: ['Defunct Satellite', 'Rocket Body', 'Fragment'][Math.floor(Math.random() * 3)],
  velocity: 7 + Math.random() * 4, // km/s
}));

// Earth Component
function Earth(props: any) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    }
  });
  
  return (
    <group {...props}>
      {/* Earth sphere */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#1e4571"
          emissive="#072c5e"
          emissiveIntensity={0.2}
          specular="#4499ff"
          shininess={10}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.01}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh scale={1.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4499ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Helper to convert lat/lon to 3D coordinates
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
}

// Debris Component
function Debris({ debris, onClick }: { debris: any; onClick: (debris: any) => void }) {
  const debrisRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Line>(null);
  const [hovered, setHovered] = useState(false);
  
  // Position based on lat/long and altitude
  const basePosition = latLongToVector3(
    debris.position.lat, 
    debris.position.lon, 
    1 + (debris.altitude / 6378) // Scale altitude (Earth radius ~6378km)
  );
  
  // Create orbit path
  useEffect(() => {
    if (orbitRef.current) {
      const orbitRadius = 1 + (debris.altitude / 6378);
      const orbitSegments = 128;
      const orbitPoints = [];
      
      // Create slightly inclined orbit based on lat/lon
      const inclination = (debris.position.lat / 90) * Math.PI * 0.3;
      
      for (let i = 0; i <= orbitSegments; i++) {
        const angle = (i / orbitSegments) * Math.PI * 2;
        const x = orbitRadius * Math.cos(angle);
        const z = orbitRadius * Math.sin(angle) * Math.cos(inclination);
        const y = orbitRadius * Math.sin(angle) * Math.sin(inclination);
        
        orbitPoints.push(new THREE.Vector3(x, y, z));
      }
      
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      orbitRef.current.geometry = orbitGeometry;
    }
  }, [debris.altitude, debris.position.lat]);
  
  // Animate the debris along its orbit
  useFrame(({ clock }) => {
    if (debrisRef.current) {
      const time = clock.getElapsedTime() * (0.1 + Math.random() * 0.05);
      const orbitRadius = 1 + (debris.altitude / 6378);
      const inclination = (debris.position.lat / 90) * Math.PI * 0.3;
      
      // Calculate position on the orbital path
      const angle = time + (debris.id.charCodeAt(debris.id.length - 1) / 10);
      debrisRef.current.position.x = orbitRadius * Math.cos(angle);
      debrisRef.current.position.z = orbitRadius * Math.sin(angle) * Math.cos(inclination);
      debrisRef.current.position.y = orbitRadius * Math.sin(angle) * Math.sin(inclination);
      
      // Rotate the debris
      debrisRef.current.rotation.x += 0.01;
      debrisRef.current.rotation.y += 0.01;
    }
  });
  
  // Color based on risk score
  const getColor = () => {
    if (debris.riskScore > 70) return '#FF7F11'; // High risk - solar-orange
    if (debris.riskScore > 40) return '#FFC107'; // Medium risk - amber
    return '#00FFC6'; // Low risk - neon-cyan
  };
  
  return (
    <>
      {/* Orbit path */}
      <group>
        <primitive object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([]),
          new THREE.LineDashedMaterial({ 
            color: getColor(), 
            opacity: hovered ? 0.4 : 0.1, 
            transparent: true,
            dashSize: 0.05,
            gapSize: 0.05,
            scale: 1
          })
        )} ref={orbitRef} />
      </group>
      
      {/* Debris object */}
      <mesh 
        ref={debrisRef}
        onClick={() => onClick(debris)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[debris.size, debris.size, debris.size]} />
        <meshStandardMaterial 
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={0.7}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
      
      {/* Label that appears on hover */}
      {hovered && (
        <Text
          position={basePosition.multiplyScalar(1.1)}
          fontSize={0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.003}
          outlineColor="black"
        >
          {debris.name}
        </Text>
      )}
    </>
  );
}

// Debris Detail Component (tooltip)
function DebrisDetail({ debris, setSelectedDebris }: { debris: any; setSelectedDebris: (debris: any) => void }) {
  return (
    <motion.div 
      className="absolute right-4 bottom-16 w-72 bg-space-navy/90 backdrop-blur-md border border-neon-cyan/30 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-neon-cyan/10 p-3 flex justify-between items-center">
        <h3 className="font-orbitron text-neon-cyan">{debris.name}</h3>
        <button 
          onClick={() => setSelectedDebris(null)} 
          className="text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-gray-400">Type</p>
            <p className="text-white">{debris.type}</p>
          </div>
          <div>
            <p className="text-gray-400">Origin</p>
            <p className="text-white">{debris.origin}</p>
          </div>
          <div>
            <p className="text-gray-400">Altitude</p>
            <p className="text-white">{Math.round(debris.altitude)} km</p>
          </div>
          <div>
            <p className="text-gray-400">Velocity</p>
            <p className="text-white">{debris.velocity.toFixed(1)} km/s</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-400 text-xs">Risk Score</p>
            <p className={`font-orbitron text-lg ${
              debris.riskScore > 70 ? 'text-solar-orange' : 
              debris.riskScore > 40 ? 'text-yellow-400' : 'text-neon-cyan'
            }`}>
              {debris.riskScore}
            </p>
          </div>
          <div className="h-10 w-10 border-2 border-gray-600 rounded-full flex items-center justify-center">
            <div 
              className={`h-7 w-7 rounded-full ${
                debris.riskScore > 70 ? 'bg-solar-orange' : 
                debris.riskScore > 40 ? 'bg-yellow-400' : 'bg-neon-cyan'
              }`}
            ></div>
          </div>
        </div>
        
        <button 
          onClick={() => console.log('View details clicked')}
          className="w-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 py-2 rounded font-orbitron text-sm hover:bg-neon-cyan/30 transition-colors"
        >
          View Full Details
        </button>
      </div>
    </motion.div>
  );
}

// Main Scene Component
function Scene({ onDebrisClick }: { onDebrisClick: (debris: any) => void }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Earth position={[0, 0, 0]} />
      
      {DEBRIS_DATA.map((debris) => (
        <Debris key={debris.id} debris={debris} onClick={onDebrisClick} />
      ))}
      
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        minDistance={1.5}
        maxDistance={5}
      />
    </>
  );
}

// MapGlobe Component
const MapGlobe = () => {
  const [selectedDebris, setSelectedDebris] = useState<any>(null);
  
  const handleDebrisClick = (debris: any) => {
    setSelectedDebris(debris);
  };
  
  return (
    <div className="w-full h-full relative">
      <Canvas 
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'linear-gradient(to bottom, #0B1A2F 0%, #061224 100%)' }}
      >
        <Scene onDebrisClick={handleDebrisClick} />
      </Canvas>
      
      {selectedDebris && (
        <DebrisDetail 
          debris={selectedDebris} 
          setSelectedDebris={setSelectedDebris} 
        />
      )}
    </div>
  );
};

export default MapGlobe;

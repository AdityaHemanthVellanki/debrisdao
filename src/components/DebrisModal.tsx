import { useRef, useEffect } from 'react';
import { motion } from '../utils/motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Mini 3D Orbit Visualizer Component
function MiniOrbiter({ debris }: { debris: any }) {
  const orbitRef = useRef<THREE.Mesh>(null);
  
  // Debris object with animated orbit
  const DebrisObject = () => {
    const debrisRef = useRef<THREE.Mesh>(null);
    
    // Animation loop
    useEffect(() => {
      let animationFrame: number;
      let time = 0;
      
      const animate = () => {
        time += 0.01;
        
        if (debrisRef.current) {
          // Use the risk score to determine orbital eccentricity
          const orbitRadius = 1.5;
          const eccentricity = 0.1 + (debris.riskScore / 200); // Higher risk = more eccentric
          
          // Calculate position on the orbital path
          const x = orbitRadius * Math.cos(time);
          const z = orbitRadius * Math.sin(time) * (1 - eccentricity);
          debrisRef.current.position.set(x, 0, z);
          
          // Add some rotation to the debris
          debrisRef.current.rotation.x += 0.01;
          debrisRef.current.rotation.y += 0.01;
        }
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }, []);
    
    // Color based on risk score
    const getColor = () => {
      if (debris.riskScore > 70) return '#FF7F11'; // High risk - solar-orange
      if (debris.riskScore > 40) return '#FFC107'; // Medium risk - amber
      return '#00FFC6'; // Low risk - neon-cyan
    };
    
    return (
      <mesh ref={debrisRef}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial 
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={0.5}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
    );
  };
  
  // Orbital path visualization
  const OrbitalPath = () => {
    const pathRef = useRef<THREE.Line>(null);
    
    useEffect(() => {
      if (pathRef.current) {
        const orbitRadius = 1.5;
        const eccentricity = 0.1 + (debris.riskScore / 200);
        const segments = 64;
        const points = [];
        
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const x = orbitRadius * Math.cos(theta);
          const z = orbitRadius * Math.sin(theta) * (1 - eccentricity);
          points.push(new THREE.Vector3(x, 0, z));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        pathRef.current.geometry = geometry;
      }
    }, []);
    
    // Color based on risk score
    const getColor = () => {
      if (debris.riskScore > 70) return '#FF7F11'; // High risk - solar-orange
      if (debris.riskScore > 40) return '#FFC107'; // Medium risk - amber
      return '#00FFC6'; // Low risk - neon-cyan
    };
    
    return (
      <group>
        <primitive object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([]),
          new THREE.LineBasicMaterial({ color: getColor(), opacity: 0.7, transparent: true })
        )} ref={pathRef} />
      </group>
    );
  };
  
  // Earth representation
  const Earth = () => {
    return (
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#1e4571" 
          emissive="#072c5e"
          roughness={1} 
          metalness={0}
        />
      </mesh>
    );
  };
  
  return (
    <Canvas 
      camera={{ position: [0, 3, 0], fov: 60 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      
      <Earth />
      <OrbitalPath />
      <DebrisObject />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}

// Main Debris Detail Modal Component
interface DebrisModalProps {
  debris: any;
  onClose: () => void;
}

const DebrisModal: React.FC<DebrisModalProps> = ({ debris, onClose }) => {
  if (!debris) return null;
  
  // Risk color calculation
  const getRiskColor = () => {
    if (debris.riskScore > 70) return 'text-solar-orange';
    if (debris.riskScore > 40) return 'text-yellow-400';
    return 'text-neon-cyan';
  };
  
  // Click outside to close
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-navy/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        ref={modalRef}
        className="w-full max-w-4xl bg-space-navy border border-neon-cyan/30 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: 'spring' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-neon-cyan/20 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-orbitron text-neon-cyan">{debris.name}</h2>
            <p className="text-gray-400">Token ID: {debris.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left column - 3D visualization */}
          <div className="h-80 bg-gradient-to-b from-space-navy/40 to-space-navy rounded-xl overflow-hidden border border-neon-cyan/10">
            <MiniOrbiter debris={debris} />
          </div>
          
          {/* Right column - Metadata table */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-orbitron mb-4">Debris Metadata</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Type</div>
                  <div className="text-white font-medium">{debris.type}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Origin</div>
                  <div className="text-white font-medium">{debris.origin}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Size</div>
                  <div className="text-white font-medium">{debris.size} m</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Mass</div>
                  <div className="text-white font-medium">{(Number(debris.size) * 100).toFixed(1)} kg</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Velocity</div>
                  <div className="text-white font-medium">{(7 + Math.random() * 4).toFixed(1)} km/s</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Altitude</div>
                  <div className="text-white font-medium">{debris.altitude} km</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Risk Score</div>
                  <div className={`font-orbitron font-medium ${getRiskColor()}`}>{debris.riskScore}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Last Updated</div>
                  <div className="text-white font-medium">{debris.lastUpdated}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Owner</div>
                  <div className="text-white font-medium">{debris.owner}</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-orbitron mb-4">Transaction Details</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Current Price</div>
                  <div className="text-white font-orbitron font-medium">{debris.price} ETH</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Insurance Premium</div>
                  <div className="text-white font-medium">{(Number(debris.price) * 0.05).toFixed(3)} ETH/month</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Cleanup Bounty</div>
                  <div className="text-white font-medium">{(Number(debris.price) * 3).toFixed(2)} ETH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-Action Footer */}
        <div className="p-6 border-t border-neon-cyan/20 bg-space-navy/60 flex flex-col sm:flex-row justify-end gap-4">
          <button 
            className="btn-secondary"
            onClick={() => console.log('Make offer clicked', debris.id)}
          >
            Make Offer
          </button>
          
          <button 
            className="btn-primary"
            onClick={() => console.log('Claim bounty clicked', debris.id)}
          >
            Claim Bounty
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DebrisModal;

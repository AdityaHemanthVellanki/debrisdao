import { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Generate mock data for the heatmap
const generateHeatmapData = () => {
  const data = [];
  // Generate 100 data points with varying altitudes and collision probabilities
  for (let i = 0; i < 100; i++) {
    // Different orbital regimes with different risk distributions
    let altitude, probability;
    
    // LEO (Low Earth Orbit) - Higher density, higher risk
    if (i < 40) {
      altitude = 200 + Math.random() * 1000;
      probability = Math.max(0.001, Math.min(0.08, 0.03 + Math.random() * 0.05));
    } 
    // MEO (Medium Earth Orbit) - Medium density
    else if (i < 70) {
      altitude = 2000 + Math.random() * 18000;
      probability = Math.max(0.001, Math.min(0.04, 0.015 + Math.random() * 0.025));
    }
    // GEO (Geostationary) - Specific altitude, medium risk
    else if (i < 85) {
      altitude = 35000 + Math.random() * 1000;
      probability = Math.max(0.001, Math.min(0.05, 0.02 + Math.random() * 0.03));
    }
    // HEO (Highly Elliptical Orbit) - Varied, lower risk
    else {
      altitude = 500 + Math.random() * 35000;
      probability = Math.max(0.001, Math.min(0.015, 0.005 + Math.random() * 0.01));
    }
    
    // Add some debris clusters
    if (i % 10 === 0) {
      const clusterSize = 3 + Math.floor(Math.random() * 5);
      const baseAltitude = altitude;
      const baseProbability = probability;
      
      for (let j = 0; j < clusterSize; j++) {
        data.push({
          altitude: baseAltitude + (Math.random() * 100) - 50,
          probability: Math.max(0.001, Math.min(0.08, baseProbability + (Math.random() * 0.01) - 0.005))
        });
      }
    }
    
    data.push({
      altitude: altitude,
      probability: probability
    });
  }
  
  return data;
};

// Custom tooltip for the heatmap
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-space-navy/90 border border-neon-cyan/30 rounded p-3 shadow-lg backdrop-blur-sm">
        <p className="text-white mb-1 font-orbitron">Orbital Parameters</p>
        <p className="text-gray-300 text-sm">
          Altitude: <span className="text-neon-cyan">{Math.round(data.altitude).toLocaleString()} km</span>
        </p>
        <p className="text-gray-300 text-sm">
          Collision Probability: <span className="text-solar-orange">{(data.probability * 100).toFixed(3)}%</span>
        </p>
        <p className="text-gray-300 text-sm">
          Risk Classification: <span className={getColorClass(data.probability)}>{getRiskLabel(data.probability)}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Get color based on probability
const getColor = (probability: number) => {
  if (probability > 0.04) return '#FF7F11'; // High risk - solar-orange
  if (probability > 0.02) return '#FFC107'; // Medium risk - amber
  return '#00FFC6'; // Low risk - neon-cyan
};

// Get color class for text
const getColorClass = (probability: number) => {
  if (probability > 0.04) return 'text-solar-orange'; // High risk
  if (probability > 0.02) return 'text-yellow-400'; // Medium risk
  return 'text-neon-cyan'; // Low risk
};

// Get risk label
const getRiskLabel = (probability: number) => {
  if (probability > 0.04) return 'High Risk';
  if (probability > 0.02) return 'Medium Risk';
  return 'Low Risk';
};

const RiskHeatmap = () => {
  const [data, setData] = useState(generateHeatmapData());
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Simulate live updates
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      // Update some random points with small changes
      setData(prevData => {
        const newData = [...prevData];
        const numPointsToUpdate = 5;
        
        for (let i = 0; i < numPointsToUpdate; i++) {
          const randomIndex = Math.floor(Math.random() * newData.length);
          newData[randomIndex] = {
            ...newData[randomIndex],
            probability: Math.max(0.001, Math.min(0.08, newData[randomIndex].probability + (Math.random() * 0.006) - 0.003))
          };
        }
        
        // Add a new point occasionally
        if (Math.random() > 0.7) {
          const altitude = 200 + Math.random() * 35000;
          const probability = Math.max(0.001, Math.min(0.08, 0.01 + Math.random() * 0.04));
          newData.push({ altitude, probability });
          
          // Keep data size reasonable
          if (newData.length > 150) {
            newData.shift();
          }
        }
        
        return newData;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 right-0 flex items-center space-x-4">
        <button 
          onClick={() => setIsAnimating(!isAnimating)}
          className="text-xs text-neon-cyan hover:text-white flex items-center"
        >
          {isAnimating ? (
            <>
              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume
            </>
          )}
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
          
          <XAxis 
            type="number" 
            dataKey="altitude" 
            name="Altitude" 
            unit=" km" 
            domain={[0, 40000]}
            tick={{ fill: '#8096b8' }} 
            axisLine={{ stroke: '#1e3a5f' }}
            label={{ value: 'Orbital Altitude (km)', position: 'insideBottom', fill: '#8096b8', offset: -10 }}
            scale="log"
          />
          
          <YAxis 
            type="number" 
            dataKey="probability" 
            name="Probability" 
            domain={[0, 0.08]}
            tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
            tick={{ fill: '#8096b8' }} 
            axisLine={{ stroke: '#1e3a5f' }}
            label={{ value: 'Collision Probability', angle: -90, position: 'insideLeft', fill: '#8096b8' }}
          />
          
          <ZAxis type="number" range={[50, 400]} />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Scatter name="Debris Data" data={data}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.probability)}
                fillOpacity={0.7 + (entry.probability * 3)} // Higher probability = more opaque
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      <div className="absolute bottom-0 w-full flex justify-center space-x-6 text-xs">
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-solar-orange mr-1"></span>
          <span className="text-gray-400">High Risk (&gt;4%)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 mr-1"></span>
          <span className="text-gray-400">Medium Risk (2-4%)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan mr-1"></span>
          <span className="text-gray-400">Low Risk (&lt;2%)</span>
        </div>
      </div>
      
      {/* Orbit annotations */}
      <div className="absolute top-16 left-24 pointer-events-none text-xs text-gray-400">LEO</div>
      <div className="absolute top-10 left-1/2 pointer-events-none text-xs text-gray-400">MEO</div>
      <div className="absolute top-4 right-24 pointer-events-none text-xs text-gray-400">GEO</div>
    </div>
  );
};

export default RiskHeatmap;

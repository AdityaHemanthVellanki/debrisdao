"use client";

import dynamic from 'next/dynamic';

// Dynamically import the chart components to avoid server-side rendering issues
const RiskChart = dynamic(() => import('./RiskChart'), { ssr: false });
const RiskHeatmap = dynamic(() => import('./RiskHeatmap'), { ssr: false });

// Generate high-risk debris data
const generateHighRiskDebris = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `DB-${i + 1000}`,
    name: `Debris-${i + 1000}`,
    size: Math.floor(Math.random() * 100) + 5,
    altitude: Math.floor(Math.random() * 1000) + 200,
    inclination: Math.floor(Math.random() * 90),
    riskScore: Math.floor(Math.random() * 40) + 60, // High risk 60-100
  }));
};

const DashboardClient = () => {
  const highRiskDebris = generateHighRiskDebris(12);
  
  return (
    <div className="py-16 px-4 md:px-8 bg-space-navy min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-orbitron text-white mb-2">Risk Dashboard</h1>
        <p className="text-gray-400 mb-10">Real-time analysis of high-risk orbital debris</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-space-navy/40 p-6 rounded-xl border border-neon-cyan/20 shadow-glow">
            <h2 className="text-2xl font-orbitron text-white mb-4">Debris Risk Scores</h2>
            <div className="h-[400px]">
              <RiskChart />
            </div>
          </div>
          
          <div className="bg-space-navy/40 p-6 rounded-xl border border-neon-cyan/20 shadow-glow">
            <h2 className="text-2xl font-orbitron text-white mb-4">High-Risk Summary</h2>
            <div className="space-y-4">
              {highRiskDebris.slice(0, 5).map((debris) => (
                <div key={debris.id} className="flex items-center justify-between p-3 border-b border-gray-700">
                  <div>
                    <p className="text-white font-medium">{debris.name}</p>
                    <p className="text-sm text-gray-400">{debris.altitude} km × {debris.inclination}°</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-bold text-black ${
                    debris.riskScore > 80 ? 'bg-red-500' : 'bg-orange-500'
                  }`}>
                    {debris.riskScore}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-3 bg-space-navy/40 p-6 rounded-xl border border-neon-cyan/20 shadow-glow">
            <h2 className="text-2xl font-orbitron text-white mb-4">Orbital Altitude Heat Map</h2>
            <div className="h-[400px]">
              <RiskHeatmap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;

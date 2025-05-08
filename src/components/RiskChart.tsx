import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Generate mock data for the last 12 months
const generateChartData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Base number that gradually increases
  let baseHighRisk = 2900;
  let baseMediumRisk = 11000;
  let baseLowRisk = 9000;
  
  return months.map((month, index) => {
    // Add some randomness but generally increasing trend for high risk
    const randomFactorHigh = Math.random() * 200 - 50;
    const randomFactorMed = Math.random() * 400 - 250;
    const randomFactorLow = Math.random() * 300 - 150;
    
    // Increase the base numbers gradually
    baseHighRisk += 80 + randomFactorHigh;
    baseMediumRisk += 20 + randomFactorMed;
    baseLowRisk += -30 + randomFactorLow;
    
    return {
      name: month,
      highRisk: Math.round(baseHighRisk),
      mediumRisk: Math.round(baseMediumRisk),
      lowRisk: Math.round(baseLowRisk),
      total: Math.round(baseHighRisk + baseMediumRisk + baseLowRisk)
    };
  });
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-space-navy/90 border border-neon-cyan/30 rounded p-3 shadow-lg backdrop-blur-sm">
        <p className="font-orbitron text-white mb-1">{label}</p>
        <p className="text-solar-orange text-sm mb-1">
          <span className="inline-block h-2 w-2 rounded-full bg-solar-orange mr-2"></span>
          High Risk: {payload[0].value.toLocaleString()}
        </p>
        <p className="text-yellow-400 text-sm mb-1">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
          Medium Risk: {payload[1].value.toLocaleString()}
        </p>
        <p className="text-neon-cyan text-sm mb-1">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan mr-2"></span>
          Low Risk: {payload[2].value.toLocaleString()}
        </p>
        <p className="text-gray-300 text-sm font-medium">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-300 mr-2"></span>
          Total: {payload[3].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const RiskChart = () => {
  const [data, setData] = useState(generateChartData());
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) return;
      
      // Update last month's data with small random changes
      setData(prevData => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;
        
        newData[lastIndex] = {
          ...newData[lastIndex],
          highRisk: newData[lastIndex].highRisk + Math.floor(Math.random() * 10) - 5,
          mediumRisk: newData[lastIndex].mediumRisk + Math.floor(Math.random() * 20) - 10,
          lowRisk: newData[lastIndex].lowRisk + Math.floor(Math.random() * 15) - 8,
        };
        
        newData[lastIndex].total = 
          newData[lastIndex].highRisk + 
          newData[lastIndex].mediumRisk + 
          newData[lastIndex].lowRisk;
        
        return newData;
      });
    }, 2000);
    
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
        <AreaChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="highRiskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7F11" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF7F11" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="mediumRiskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC107" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lowRiskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FFC6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00FFC6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
          
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#8096b8' }} 
            axisLine={{ stroke: '#1e3a5f' }}
          />
          
          <YAxis 
            tick={{ fill: '#8096b8' }} 
            axisLine={{ stroke: '#1e3a5f' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area 
            type="monotone" 
            dataKey="highRisk" 
            stackId="1"
            stroke="#FF7F11" 
            fill="url(#highRiskGradient)" 
            activeDot={{ r: 6, stroke: '#FF7F11', strokeWidth: 2, fill: '#0B1A2F' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="mediumRisk" 
            stackId="1"
            stroke="#FFC107" 
            fill="url(#mediumRiskGradient)" 
            activeDot={{ r: 6, stroke: '#FFC107', strokeWidth: 2, fill: '#0B1A2F' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="lowRisk" 
            stackId="1"
            stroke="#00FFC6" 
            fill="url(#lowRiskGradient)" 
            activeDot={{ r: 6, stroke: '#00FFC6', strokeWidth: 2, fill: '#0B1A2F' }}
          />
          
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#ffffff" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="absolute bottom-0 w-full flex justify-center space-x-6 text-xs">
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-solar-orange mr-1"></span>
          <span className="text-gray-400">High Risk</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 mr-1"></span>
          <span className="text-gray-400">Medium Risk</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan mr-1"></span>
          <span className="text-gray-400">Low Risk</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-white mr-1"></span>
          <span className="text-gray-400">Total</span>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;

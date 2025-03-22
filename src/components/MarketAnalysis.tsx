
import React from 'react';
import AnimatedCard from './AnimatedCard';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Landmark,
  PieChart
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MarketAnalysis: React.FC = () => {
  const marketStats = [
    {
      title: "Market Value",
      value: "R5.8 trillion",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Total value of South African property market",
      growth: "+3.2% YoY"
    },
    {
      title: "Registered Properties",
      value: "6.5 million",
      icon: <Building2 className="w-5 h-5" />,
      description: "Residential properties across South Africa",
      growth: "+1.5% YoY"
    },
    {
      title: "Digital Adoption",
      value: "15% annual growth",
      icon: <PieChart className="w-5 h-5" />,
      description: "Growth rate of online property searches",
      growth: "+15% YoY"
    },
    {
      title: "Target Market",
      value: "25-45 years",
      icon: <Users className="w-5 h-5" />,
      description: "Primary age demographic of property seekers",
      growth: "62% market share"
    }
  ];

  const targetMarkets = [
    {
      name: "Primary Buyers/Renters",
      description: "25-45 year-old professionals seeking properties in urban and suburban areas",
      percentage: 45,
      color: "bg-propradar-600"
    },
    {
      name: "Property Investors",
      description: "Individuals and small companies looking for investment opportunities",
      percentage: 25,
      color: "bg-propradar-500"
    },
    {
      name: "Real Estate Agents",
      description: "Professionals seeking a modern platform to list properties and connect with leads",
      percentage: 15,
      color: "bg-propradar-400"
    },
    {
      name: "Property Developers",
      description: "Companies looking to market new developments to targeted audiences",
      percentage: 8,
      color: "bg-propradar-300"
    },
    {
      name: "Financial Institutions",
      description: "Banks and mortgage providers seeking qualified borrowers",
      percentage: 7,
      color: "bg-propradar-200"
    }
  ];

  return (
    <section id="market" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedCard>
            <div className="inline-block px-4 py-1.5 rounded-full bg-propradar-100 text-propradar-800 font-medium text-sm mb-4">
              Market Opportunity
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              South African Property Market Analysis
            </h2>
          </AnimatedCard>
          
          <AnimatedCard delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              A comprehensive overview of the market opportunity and target audience for PropRadar.
            </p>
          </AnimatedCard>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {marketStats.map((stat, index) => (
            <AnimatedCard 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              delay={100 * (index + 1)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-propradar-100 flex items-center justify-center">
                  <div className="text-propradar-700">{stat.icon}</div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-800">
                  {stat.growth}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-lg font-medium text-gray-700 mb-3">{stat.title}</p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </AnimatedCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <AnimatedCard className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Landmark className="w-6 h-6 mr-3 text-propradar-600" />
              <span>Competitive Landscape</span>
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Property24.co.za</h4>
                  <span className="text-sm text-gray-500">Market Leader</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 mr-4">
                    <Progress value={85} className="h-2 bg-gray-200" />
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-xs bg-red-50 text-red-700 py-1 px-2 rounded">
                    Limited AI capability
                  </div>
                  <div className="text-xs bg-red-50 text-red-700 py-1 px-2 rounded">
                    Basic neighborhood data
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Private Property</h4>
                  <span className="text-sm text-gray-500">Secondary Player</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 mr-4">
                    <Progress value={40} className="h-2 bg-gray-200" />
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-xs bg-red-50 text-red-700 py-1 px-2 rounded">
                    Limited innovation
                  </div>
                  <div className="text-xs bg-red-50 text-red-700 py-1 px-2 rounded">
                    No SA-specific features
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">RE/MAX & Seeff</h4>
                  <span className="text-sm text-gray-500">Traditional Agencies</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 mr-4">
                    <Progress value={30} className="h-2 bg-gray-200" />
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-xs bg-red-50 text-red-700 py-1 px-2 rounded">
                    Basic online presence
                  </div>
                  <div className="text-xs bg-red-50 text-red-700 py-1 px-2 rounded">
                    Limited tech integration
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
          
          <AnimatedCard className="bg-white rounded-xl p-8 shadow-sm border border-gray-100" delay={200}>
            <h3 className="text-2xl font-bold mb-6">Target Market Segments</h3>
            <div className="space-y-5">
              {targetMarkets.map((market, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div>
                      <h4 className="font-medium">{market.name}</h4>
                      <p className="text-sm text-gray-500">{market.description}</p>
                    </div>
                    <span className="text-sm font-medium">{market.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`${market.color} h-2.5 rounded-full`} 
                      style={{ width: `${market.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
        
        <AnimatedCard className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mt-12">
          <h3 className="text-2xl font-bold mb-6">Market Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-propradar-50 rounded-xl p-6">
              <h4 className="font-medium mb-3">Increasing Digital Demand</h4>
              <p className="text-gray-600 text-sm">
                Rising demand for comprehensive digital property solutions, accelerated by the COVID-19 pandemic.
              </p>
            </div>
            <div className="bg-propradar-50 rounded-xl p-6">
              <h4 className="font-medium mb-3">Safety & Neighborhood Focus</h4>
              <p className="text-gray-600 text-sm">
                Growing interest in neighborhood safety metrics and detailed amenity information.
              </p>
            </div>
            <div className="bg-propradar-50 rounded-xl p-6">
              <h4 className="font-medium mb-3">Remote Work Capabilities</h4>
              <p className="text-gray-600 text-sm">
                Increased importance of internet connectivity and dedicated home office spaces.
              </p>
            </div>
            <div className="bg-propradar-50 rounded-xl p-6">
              <h4 className="font-medium mb-3">Utilities Reliability</h4>
              <p className="text-gray-600 text-sm">
                Heightened concern about electricity and water reliability in potential properties.
              </p>
            </div>
            <div className="bg-propradar-50 rounded-xl p-6">
              <h4 className="font-medium mb-3">Sustainable Properties</h4>
              <p className="text-gray-600 text-sm">
                Shift toward environmentally sustainable and self-sufficient properties.
              </p>
            </div>
            <div className="bg-propradar-50 rounded-xl p-6">
              <h4 className="font-medium mb-3">Data-Driven Decisions</h4>
              <p className="text-gray-600 text-sm">
                Increasing reliance on comprehensive data for making property investment decisions.
              </p>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
};

export default MarketAnalysis;

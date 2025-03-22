
import React from 'react';
import AnimatedCard from './AnimatedCard';
import { 
  Map, 
  LineChart, 
  Lightbulb, 
  Layers, 
  ShieldCheck, 
  BarChart4, 
  Home, 
  Zap, 
  Wifi, 
  Droplets 
} from 'lucide-react';

const Features: React.FC = () => {
  const featuresData = [
    {
      title: "Neighborhood Intelligence",
      description: "Detailed safety scores, school ratings, amenity proximity analysis, and verified resident reviews.",
      icon: <Map size={24} className="text-propradar-600" />,
      details: [
        "Safety scores with crime type breakdown",
        "School quality ratings and catchment areas",
        "Amenity proximity analysis",
        "Community reviews from verified residents"
      ]
    },
    {
      title: "AI-Powered Price Insights",
      description: "Intelligent price estimation, investment potential analysis, and historical trends visualization.",
      icon: <LineChart size={24} className="text-propradar-600" />,
      details: [
        "Estimated value ranges based on comparable properties",
        "Price prediction models",
        "Investment potential analysis",
        "Historical price trends visualization"
      ]
    },
    {
      title: "South Africa-Specific Features",
      description: "Unique features addressing local concerns like load shedding, water security, and internet connectivity.",
      icon: <Lightbulb size={24} className="text-propradar-600" />,
      details: [
        "Load shedding impact analysis",
        "Water security assessment",
        "Security feature highlighting",
        "Fiber/internet connectivity mapping"
      ]
    },
    {
      title: "Enhanced User Experience",
      description: "Personalized property recommendations, lifestyle matching, and interactive tools to streamline your search.",
      icon: <Layers size={24} className="text-propradar-600" />,
      details: [
        "Lifestyle matching",
        "Commute calculator",
        "AR property viewing",
        "WhatsApp integration for alerts"
      ]
    }
  ];

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-propradar-50/30 -z-10"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-propradar-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-propradar-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedCard>
            <div className="inline-block px-4 py-1.5 rounded-full bg-propradar-100 text-propradar-800 font-medium text-sm mb-4">
              Key Features
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transforming Property Search
            </h2>
          </AnimatedCard>
          
          <AnimatedCard delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              PropRadar delivers revolutionary features that address South Africa's unique property market challenges.
            </p>
          </AnimatedCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              delay={100 * (index + 1)}
            >
              <div className="w-12 h-12 rounded-lg bg-propradar-100 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-5">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-propradar-500 mt-1.5 mr-2.5 flex-shrink-0"></span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
        
        {/* South Africa Specific Features Detail Section */}
        <div className="mt-24">
          <AnimatedCard>
            <h2 className="text-3xl font-bold text-center mb-16">
              Unique South African Market Solutions
            </h2>
          </AnimatedCard>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatedCard 
              className="bg-gradient-to-br from-white to-propradar-50 p-8 rounded-2xl shadow-sm border border-gray-100"
              animation="fade-in-up"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="p-3 bg-propradar-100 rounded-lg inline-flex">
                    <ShieldCheck className="w-6 h-6 text-propradar-700" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Security Analysis</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive security feature assessment, crime statistics visualization, 
                  and security system recommendations based on neighborhood data.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="flex items-center bg-white/80 p-3 rounded-lg shadow-sm">
                    <div className="mr-3 p-2 bg-propradar-100 rounded-md">
                      <Home className="w-4 h-4 text-propradar-700" />
                    </div>
                    <span className="text-sm font-medium">Security Features</span>
                  </div>
                  <div className="flex items-center bg-white/80 p-3 rounded-lg shadow-sm">
                    <div className="mr-3 p-2 bg-propradar-100 rounded-md">
                      <BarChart4 className="w-4 h-4 text-propradar-700" />
                    </div>
                    <span className="text-sm font-medium">Crime Statistics</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard 
              className="bg-gradient-to-br from-white to-propradar-50 p-8 rounded-2xl shadow-sm border border-gray-100"
              animation="fade-in-up"
              delay={100}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="p-3 bg-propradar-100 rounded-lg inline-flex">
                    <Zap className="w-6 h-6 text-propradar-700" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Load Shedding Impact</h3>
                <p className="text-gray-600 mb-6">
                  Detailed analysis of load shedding schedules for specific areas, 
                  backup power solutions, and impact on daily life and property value.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="flex items-center bg-white/80 p-3 rounded-lg shadow-sm">
                    <div className="mr-3 p-2 bg-propradar-100 rounded-md">
                      <Droplets className="w-4 h-4 text-propradar-700" />
                    </div>
                    <span className="text-sm font-medium">Water Security</span>
                  </div>
                  <div className="flex items-center bg-white/80 p-3 rounded-lg shadow-sm">
                    <div className="mr-3 p-2 bg-propradar-100 rounded-md">
                      <Wifi className="w-4 h-4 text-propradar-700" />
                    </div>
                    <span className="text-sm font-medium">Internet Access</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;


import React from 'react';
import AnimatedCard from './AnimatedCard';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2,
  ListChecks,
  BarChart2,
  Sprout,
  Crown 
} from 'lucide-react';

const Roadmap: React.FC = () => {
  const phases = [
    {
      title: "Phase 1: MVP Launch",
      timeline: "Months 1-3",
      description: "Launch core functionality and establish market presence",
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      features: [
        "Core property listing functionality",
        "Basic user accounts and saved searches",
        "Neighborhood intelligence (safety, schools, amenities)",
        "Property price insights",
        "Location-based search filters",
        "Mobile-responsive design"
      ],
      status: "Completed",
      color: "bg-green-100 border-green-200 text-green-800"
    },
    {
      title: "Phase 2: Enhanced Features",
      timeline: "Months 4-6",
      description: "Expand functionality with South Africa-specific features",
      icon: <ListChecks className="w-6 h-6 text-propradar-600" />,
      features: [
        "Load shedding impact analysis",
        "Transfer cost calculator",
        "Personalized property matching",
        "Lifestyle search filters",
        "Commute calculator",
        "User authentication improvements"
      ],
      status: "Current Phase",
      color: "bg-propradar-100 border-propradar-200 text-propradar-800"
    },
    {
      title: "Phase 3: Advanced Features",
      timeline: "Months 7-12",
      description: "Introduce advanced AI-powered capabilities",
      icon: <BarChart2 className="w-6 h-6 text-blue-600" />,
      features: [
        "Water security assessment",
        "Smart alerts",
        "Verified resident reviews",
        "Community Q&A",
        "WhatsApp integration",
        "Progressive web app capabilities"
      ],
      status: "Upcoming",
      color: "bg-blue-50 border-blue-100 text-blue-700"
    },
    {
      title: "Phase 4: Premium Features",
      timeline: "Months 13-18",
      description: "Roll out premium features to increase monetization",
      icon: <Crown className="w-6 h-6 text-amber-600" />,
      features: [
        "Security feature highlighting",
        "Fiber/internet connectivity map",
        "AR property viewing",
        "Bank integration for mortgage pre-approval",
        "Virtual property staging",
        "Renovation potential analysis"
      ],
      status: "Planned",
      color: "bg-amber-50 border-amber-100 text-amber-700"
    }
  ];

  return (
    <section id="roadmap" className="py-24 px-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-propradar-50 rounded-full blur-3xl opacity-40 -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedCard>
            <div className="inline-block px-4 py-1.5 rounded-full bg-propradar-100 text-propradar-800 font-medium text-sm mb-4">
              Implementation Plan
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Roadmap
            </h2>
          </AnimatedCard>
          
          <AnimatedCard delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Our strategic plan for developing and launching PropRadar
            </p>
          </AnimatedCard>
        </div>

        <div className="relative">
          {/* Timeline Connector */}
          <div className="absolute top-0 bottom-0 left-16 md:left-1/2 w-0.5 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
          
          {phases.map((phase, index) => (
            <div key={index} className="mb-12 md:mb-24 relative">
              <AnimatedCard 
                className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                delay={100 * (index + 1)}
              >
                {/* Timeline Dot */}
                <div className="absolute top-0 left-16 md:left-1/2 w-6 h-6 rounded-full bg-white border-2 border-propradar-500 transform -translate-x-1/2 hidden md:block z-10"></div>
                
                {/* Timeline Date Flag */}
                <div className={`absolute top-0 ${index % 2 === 0 ? 'md:left-[52%]' : 'md:right-[52%] md:text-right'} hidden md:block`}>
                  <span className="inline-block px-3 py-1 bg-propradar-100 text-propradar-800 text-sm font-medium rounded-md">
                    {phase.timeline}
                  </span>
                </div>
                
                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className={`p-6 rounded-xl border ${phase.color} md:shadow-sm`}>
                    <div className="flex items-center mb-4">
                      <div className="mr-3 md:hidden">{phase.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold">{phase.title}</h3>
                        <div className="md:hidden text-xs font-medium mt-1">
                          {phase.timeline}
                        </div>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-gray-700">{phase.description}</p>
                    
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-4 ${
                      phase.status === "Current Phase" 
                        ? "bg-propradar-100 text-propradar-800" 
                        : phase.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}>
                      {phase.status}
                    </div>
                    
                    <ul className={`space-y-2 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                      {phase.features.map((feature, i) => (
                        <li key={i} className={`flex items-start text-sm ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-propradar-500 mt-1.5 mr-2.5 flex-shrink-0 ${index % 2 === 1 ? 'md:order-2 md:ml-2.5 md:mr-0' : ''}`}></span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <AnimatedCard className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-propradar-600 to-propradar-700 text-white shadow-lg">
            <Sprout className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Join Our Growth Journey</h3>
            <p className="text-propradar-100 mb-8 max-w-xl mx-auto">
              We're seeking strategic partners and investors to accelerate our development roadmap and bring PropRadar to market faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-propradar-800 hover:bg-propradar-50">
                Request Investment Info
              </Button>
              <Button variant="outline" className="text-white border-white/30 hover:bg-propradar-500 hover:border-transparent">
                Partner With Us
              </Button>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

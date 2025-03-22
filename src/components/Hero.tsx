
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedText from './AnimatedText';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-0 w-3/5 h-3/5 bg-propradar-100 rounded-l-full opacity-60 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-propradar-50 rounded-tr-full opacity-60 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-propradar-100 text-propradar-800 font-medium text-sm mb-2 animate-fade-in-down">
                <span>Transforming Property Search in South Africa</span>
              </div>
              
              <AnimatedText
                text="AI-Powered Property Intelligence"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                delay={100}
              />
              
              <AnimatedText
                text="PropRadar combines comprehensive property listings with hyper-local data analytics, providing unprecedented insights into neighborhoods, property values, and investment potential in South Africa."
                className="text-lg text-gray-600 max-w-xl text-balance"
                delay={300}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <Button className="bg-propradar-600 hover:bg-propradar-700 text-white px-8 py-6 text-lg">
                  Get Early Access
                </Button>
                <Button variant="outline" className="border-propradar-300 text-propradar-700 hover:bg-propradar-50 px-8 py-6 text-lg">
                  Learn More
                </Button>
              </div>
              
              <div className="pt-8 flex items-center gap-6 animate-fade-in" style={{ animationDelay: "700ms" }}>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium",
                        i === 1 ? "bg-purple-500 text-white" : "",
                        i === 2 ? "bg-blue-500 text-white" : "",
                        i === 3 ? "bg-green-500 text-white" : "",
                        i === 4 ? "bg-amber-500 text-white" : ""
                      )}
                    >
                      {i === 1 && "JD"}
                      {i === 2 && "TM"}
                      {i === 3 && "KP"}
                      {i === 4 && "SR"}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">100+</span> early adopters already joined
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-propradar-100 to-propradar-200 animate-pulse-slow"></div>
              
              <div className="absolute inset-4 bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="w-40 h-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="w-3/4 h-6 bg-propradar-100 rounded"></div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-100 rounded"></div>
                      <div className="w-5/6 h-4 bg-gray-100 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="aspect-video bg-propradar-50 rounded flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-propradar-200"></div>
                      </div>
                      <div className="aspect-video bg-propradar-50 rounded flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-propradar-200"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="h-20 bg-propradar-50 rounded flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-200"></div>
                      </div>
                      <div className="h-20 bg-propradar-50 rounded flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-200"></div>
                      </div>
                      <div className="h-20 bg-propradar-50 rounded flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-5 right-5">
                  <div className="w-14 h-14 bg-propradar-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

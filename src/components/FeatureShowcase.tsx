
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  MapPin, 
  Lightbulb, 
  Shield, 
  Zap, 
  Droplets, 
  Wifi 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import PriceInsights from './PriceInsights';
import NeighborhoodIntelligence from './NeighborhoodIntelligence';

interface FeatureShowcaseProps {
  className?: string;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ 
  className 
}) => {
  return (
    <section className={cn("py-24 px-4 bg-gradient-to-b from-white to-gray-50", className)}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-3 py-1 bg-propradar-100 text-propradar-800 hover:bg-propradar-200 transition-colors">
            What Makes PropRadar Different
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Property Insights</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            PropRadar gives you unprecedented insights into property values and neighborhoods 
            to help you make better property decisions
          </p>
        </div>

        <Tabs defaultValue="pricing" className="mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="pricing" className="text-sm md:text-base">
                <LineChart className="w-4 h-4 mr-2" />
                Price Insights
              </TabsTrigger>
              <TabsTrigger value="neighborhood" className="text-sm md:text-base">
                <MapPin className="w-4 h-4 mr-2" />
                Neighborhood Intelligence
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="max-w-5xl mx-auto">
            <TabsContent 
              value="pricing" 
              className="bg-white border rounded-xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-propradar-100 text-propradar-800 px-4 py-1 rounded-bl-lg text-sm font-medium">
                AI-Powered
              </div>
              
              <div className="p-6 pt-10">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <LineChart className="mr-2 h-5 w-5 text-propradar-600" />
                      Price Insights
                    </h3>
                    <p className="text-gray-600 mb-4">
                      See beyond the listing price with AI-powered valuation metrics, historical trends, and future price forecasts.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[
                        "AI-powered price estimation",
                        "Historical price trends",
                        "Future value prediction",
                        "Comparative market analysis",
                        "Investment potential rating"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="inline-block w-1.5 h-1.5 bg-propradar-600 rounded-full mr-2"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="bg-propradar-600 hover:bg-propradar-700">
                      Explore Property Pricing
                    </Button>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-sm">
                      <Card className="shadow-lg border-0">
                        <CardContent className="p-0">
                          <PriceInsights compact={true} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent 
              value="neighborhood" 
              className="bg-white border rounded-xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-propradar-100 text-propradar-800 px-4 py-1 rounded-bl-lg text-sm font-medium">
                South Africa Specific
              </div>
              
              <div className="p-6 pt-10">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-propradar-600" />
                      Neighborhood Intelligence
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get comprehensive insights about neighborhoods, including safety scores, amenities, schools, and South Africa-specific features.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[
                        "Detailed safety statistics",
                        "School quality ratings",
                        "Amenity proximity analysis",
                        "Commute time calculations"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="inline-block w-1.5 h-1.5 bg-propradar-600 rounded-full mr-2"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-semibold text-propradar-800 mb-2">South Africa Specific Insights:</h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-100 flex items-center justify-center mr-2">
                          <Shield className="h-4 w-4 text-propradar-600" />
                        </div>
                        <span className="text-sm">Security Assessment</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-100 flex items-center justify-center mr-2">
                          <Zap className="h-4 w-4 text-propradar-600" />
                        </div>
                        <span className="text-sm">Load Shedding Impact</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-100 flex items-center justify-center mr-2">
                          <Droplets className="h-4 w-4 text-propradar-600" />
                        </div>
                        <span className="text-sm">Water Security</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-propradar-100 flex items-center justify-center mr-2">
                          <Wifi className="h-4 w-4 text-propradar-600" />
                        </div>
                        <span className="text-sm">Internet Connectivity</span>
                      </div>
                    </div>
                    
                    <Button className="bg-propradar-600 hover:bg-propradar-700">
                      Explore Neighborhoods
                    </Button>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-sm">
                      <Card className="shadow-lg border-0">
                        <CardContent className="p-0">
                          <NeighborhoodIntelligence compact={true} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FeatureShowcase;

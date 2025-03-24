
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { MapPin, Shield, Wifi, School, Navigation, Zap, BusFront, ShoppingCart, Utensils, Hospital, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NeighborhoodIntelligenceProps {
  className?: string;
  compact?: boolean;
}

const securityData = [
  { category: 'Crime Rate', value: 28, fill: '#10b981' },
  { category: 'Police Response', value: 85, fill: '#10b981' },
  { category: 'Private Security', value: 92, fill: '#10b981' },
  { category: 'Community Involvement', value: 75, fill: '#10b981' }
];

const amenitiesData = [
  { name: 'Schools', value: 12, fill: '#8b5cf6' },
  { name: 'Restaurants', value: 38, fill: '#ec4899' },
  { name: 'Shopping Centers', value: 8, fill: '#f97316' },
  { name: 'Parks', value: 6, fill: '#10b981' },
  { name: 'Medical Facilities', value: 5, fill: '#0ea5e9' },
];

const schoolsData = [
  { name: 'Primary Schools', count: 8, quality: 4.2 },
  { name: 'High Schools', count: 4, quality: 4.5 },
  { name: 'Private Schools', count: 6, quality: 4.8 },
  { name: 'Universities', count: 1, quality: 4.3 },
];

const infrastructureData = [
  { name: 'Internet', score: 92 },
  { name: 'Water', score: 80 },
  { name: 'Electricity', score: 65 },
  { name: 'Roads', score: 78 },
];

// Transport commute times in minutes
const commuteData = [
  { name: 'CBD', time: 25 },
  { name: 'Airport', time: 35 },
  { name: 'Shopping Mall', time: 10 },
  { name: 'Schools', time: 8 },
];

const COLORS = ['#8b5cf6', '#ec4899', '#f97316', '#10b981', '#0ea5e9'];

const NeighborhoodIntelligence: React.FC<NeighborhoodIntelligenceProps> = ({ 
  className,
  compact = false 
}) => {
  const renderSecurityScore = (score: number) => {
    let color = 'bg-red-500';
    let label = 'Poor';
    
    if (score >= 90) {
      color = 'bg-green-500';
      label = 'Excellent';
    } else if (score >= 70) {
      color = 'bg-green-400';
      label = 'Very Good';
    } else if (score >= 50) {
      color = 'bg-yellow-400';
      label = 'Good';
    } else if (score >= 30) {
      color = 'bg-orange-400';
      label = 'Fair';
    }
    
    return (
      <div className="flex items-center gap-2">
        <Progress value={score} className={`${color}`} />
        <span className="text-sm font-medium">{score}% - {label}</span>
      </div>
    );
  };

  const overallSecurityScore = 
    securityData.reduce((acc, item) => acc + item.value, 0) / securityData.length;

  // If compact version is requested, show a simplified view
  if (compact) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="bg-propradar-50 py-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-propradar-500" />
                Sandton, Johannesburg
              </CardTitle>
              <CardDescription>Neighborhood Intelligence</CardDescription>
            </div>
            <Badge variant="outline" className="bg-propradar-100 text-propradar-800 border-none">
              Premium Insight
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium flex items-center mb-2">
                <Shield className="h-4 w-4 mr-1 text-propradar-500" /> 
                Security Score
              </h3>
              <div className="flex items-center gap-2">
                <Progress value={Math.round(overallSecurityScore)} className="bg-green-500" />
                <span className="text-sm font-medium">{Math.round(overallSecurityScore)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-propradar-50 rounded-md">
                <h4 className="text-xs font-medium flex items-center mb-1">
                  <Zap className="h-3 w-3 mr-1 text-propradar-500" /> 
                  Load Shedding
                </h4>
                <p className="text-sm">Stage 1 (Low)</p>
              </div>
              
              <div className="p-2 bg-propradar-50 rounded-md">
                <h4 className="text-xs font-medium flex items-center mb-1">
                  <Wifi className="h-3 w-3 mr-1 text-propradar-500" /> 
                  Internet
                </h4>
                <p className="text-sm">Fiber Available</p>
              </div>
            </div>

            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={commuteData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip 
                    formatter={(value) => [`${value} min`, 'Commute Time']}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar 
                    dataKey="time" 
                    fill="#8884d8"
                    label={{ position: 'right' }}
                  >
                    {commuteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-lg", className)}>
      <CardHeader className="bg-propradar-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-propradar-600" />
              Sandton, Johannesburg
            </CardTitle>
            <CardDescription>Comprehensive Neighborhood Analysis</CardDescription>
          </div>
          <Badge className="bg-propradar-100 text-propradar-800 hover:bg-propradar-200">
            Premium Insight
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Metrics */}
          <div>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <Shield className="h-5 w-5 mr-2 text-propradar-600" /> 
              Security Analysis
            </h3>
            
            <div className="space-y-3 mb-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Security Score</span>
                  <span className="text-sm font-medium">{Math.round(overallSecurityScore)}%</span>
                </div>
                {renderSecurityScore(Math.round(overallSecurityScore))}
              </div>
              
              {securityData.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.category}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.value >= 70 ? 'bg-green-500' : item.value >= 40 ? 'bg-yellow-500' : 'bg-red-500'} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Amenities */}
          <div>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <ShoppingCart className="h-5 w-5 mr-2 text-propradar-600" /> 
              Local Amenities
            </h3>
            
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={amenitiesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {amenitiesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} locations`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* South Africa Specific Insights */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">
              South Africa Specific Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Load Shedding Impact */}
              <Card className="border border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Zap className="h-5 w-5 mr-2 text-amber-600" /> 
                    Load Shedding Impact
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium block mb-1">Current Status: Stage 1</span>
                      <Progress value={20} className="bg-amber-400" />
                    </div>
                    <p className="text-sm">
                      This area experiences minimal disruption during load shedding. Most properties have backup power solutions, and the area is prioritized for restoration.
                    </p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <Badge variant="outline" className="bg-white">Backup Generator</Badge>
                      <Badge variant="outline" className="bg-white">Inverter Common</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Water Security */}
              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Droplets className="h-5 w-5 mr-2 text-blue-600" /> 
                    Water Security
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium block mb-1">Reliability Score: 92%</span>
                      <Progress value={92} className="bg-green-500" />
                    </div>
                    <p className="text-sm">
                      The area has reliable water supply with minimal disruptions. Water quality meets all safety standards, and infrastructure is well maintained.
                    </p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <Badge variant="outline" className="bg-white">Reliable Supply</Badge>
                      <Badge variant="outline" className="bg-white">High Quality</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Internet Connectivity */}
              <Card className="border border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Wifi className="h-5 w-5 mr-2 text-purple-600" /> 
                    Internet Connectivity
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium block mb-1">Fiber Coverage: 95%</span>
                      <Progress value={95} className="bg-purple-500" />
                    </div>
                    <p className="text-sm">
                      This neighborhood has excellent internet infrastructure with multiple fiber providers. Average speeds of 100-200Mbps are common, with options up to 1Gbps.
                    </p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <Badge variant="outline" className="bg-white">Fiber Available</Badge>
                      <Badge variant="outline" className="bg-white">Multiple ISPs</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Schools */}
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <School className="h-5 w-5 mr-2 text-green-600" /> 
                    Education Facilities
                  </h4>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={schoolsData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" scale="band" fontSize={10} />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" fontSize={10} />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={10} />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Number" />
                        <Bar yAxisId="right" dataKey="quality" fill="#82ca9d" name="Quality (0-5)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Commute Times */}
          <div>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <Navigation className="h-5 w-5 mr-2 text-propradar-600" /> 
              Average Commute Times
            </h3>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={commuteData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" unit=" min" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`${value} minutes`, 'Travel Time']} />
                  <Bar 
                    dataKey="time"
                    label={{ position: 'right' }}
                  >
                    {commuteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Infrastructure Quality */}
          <div>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <BusFront className="h-5 w-5 mr-2 text-propradar-600" /> 
              Infrastructure Quality
            </h3>
            
            <div className="space-y-3">
              {infrastructureData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-medium">{item.score}/100</span>
                  </div>
                  <Progress 
                    value={item.score} 
                    className={
                      item.score >= 80 ? 'bg-green-500' : 
                      item.score >= 60 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    } 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeighborhoodIntelligence;

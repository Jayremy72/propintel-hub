
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, School, Coffee, ShoppingBag, Train, Bus, Car, Bike, Shield, AlertTriangle, Info, ArrowRight } from 'lucide-react';

// Sample safety data
const safetyData = {
  score: 85,
  crimeRates: [
    { name: 'Property', value: 12 },
    { name: 'Violent', value: 5 },
    { name: 'Theft', value: 18 }
  ]
};

// Sample amenities data
const amenitiesData = {
  restaurants: { count: 28, nearest: 0.3 },
  cafes: { count: 14, nearest: 0.2 },
  supermarkets: { count: 5, nearest: 0.5 },
  gyms: { count: 3, nearest: 0.8 },
  parks: { count: 4, nearest: 0.4 },
  schools: { count: 6, nearest: 0.7 }
};

// Sample schools data
const schoolsData = [
  { name: 'Camps Bay Primary', type: 'Primary', distance: 0.5, rating: 8.5 },
  { name: 'Camps Bay High', type: 'Secondary', distance: 0.6, rating: 8.2 },
  { name: 'International School', type: 'Combined', distance: 1.2, rating: 9.1 }
];

// Sample transport data
const transportData = [
  { name: 'Bus Stops', count: 8, nearest: 0.2, icon: <Bus className="h-4 w-4" /> },
  { name: 'Train Station', count: 1, nearest: 2.5, icon: <Train className="h-4 w-4" /> },
  { name: 'Bicycle Lanes', miles: 4.5, icon: <Bike className="h-4 w-4" /> },
  { name: 'Major Roads', count: 3, nearest: 0.8, icon: <Car className="h-4 w-4" /> }
];

// Colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface NeighborhoodIntelligenceProps {
  neighborhoodName?: string;
  compact?: boolean;
}

const NeighborhoodIntelligence: React.FC<NeighborhoodIntelligenceProps> = ({
  neighborhoodName = 'Camps Bay, Cape Town',
  compact = false
}) => {
  if (compact) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            Neighborhood Insights
            <Button variant="link" size="sm" className="ml-auto p-0 h-auto">
              <span className="text-sm">Full Analysis</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">{neighborhoodName}</span>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Safety Score</span>
                <span className="text-sm font-medium">{safetyData.score}/100</span>
              </div>
              <Progress value={safetyData.score} className="h-2" />
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Very Safe
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Nearby Cafes</div>
                <div className="font-medium">{amenitiesData.cafes.count}</div>
                <div className="text-xs">Nearest: {amenitiesData.cafes.nearest}km</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Nearby Schools</div>
                <div className="font-medium">{schoolsData.length}</div>
                <div className="text-xs">Nearest: {schoolsData[0].distance}km</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-propradar-600" />
        <h2 className="text-2xl font-bold">{neighborhoodName}</h2>
      </div>
      
      <Tabs defaultValue="safety" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>
        
        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Safety Score</CardTitle>
                <CardDescription>Overall neighborhood safety rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-propradar-600"
                        strokeWidth="10"
                        strokeDasharray={`${safetyData.score * 2.51} 251`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{safetyData.score}</span>
                      <span className="text-sm text-muted-foreground">out of 100</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="h-3.5 w-3.5 mr-1" />
                      Very Safe
                    </Badge>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This area is safer than 85% of neighborhoods in Cape Town
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Crime Breakdown</CardTitle>
                <CardDescription>Incidents per 1,000 residents per year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={safetyData.crimeRates}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {safetyData.crimeRates.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} per 1,000`, 'Incidents']}
                          contentStyle={{ fontSize: '12px' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm flex items-center">
                          <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[0] }} />
                          Property Crime
                        </span>
                        <span className="text-sm font-medium">12 per 1,000</span>
                      </div>
                      <Progress value={35} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">35% below city average</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm flex items-center">
                          <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[1] }} />
                          Violent Crime
                        </span>
                        <span className="text-sm font-medium">5 per 1,000</span>
                      </div>
                      <Progress value={20} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">20% below city average</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm flex items-center">
                          <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[2] }} />
                          Theft
                        </span>
                        <span className="text-sm font-medium">18 per 1,000</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">45% below city average</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Safety Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Secure Neighborhood</h4>
                    <p className="text-sm text-muted-foreground">
                      This area has active neighborhood watch programs and private security patrols.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-3 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Police Presence</h4>
                    <p className="text-sm text-muted-foreground">
                      Police station within 3km and regular patrol units in the area.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Minor Concerns</h4>
                    <p className="text-sm text-muted-foreground">
                      Some reports of petty theft in tourist areas during peak season.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="amenities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dining & Shopping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Coffee className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Coffee Shops & Cafes</h4>
                      <p className="text-sm text-muted-foreground">
                        {amenitiesData.cafes.count} within 1km
                      </p>
                    </div>
                  </div>
                  <Badge>{amenitiesData.cafes.nearest}km</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <ShoppingBag className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Supermarkets</h4>
                      <p className="text-sm text-muted-foreground">
                        {amenitiesData.supermarkets.count} within 1km
                      </p>
                    </div>
                  </div>
                  <Badge>{amenitiesData.supermarkets.nearest}km</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Coffee className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Restaurants</h4>
                      <p className="text-sm text-muted-foreground">
                        {amenitiesData.restaurants.count} within 1km
                      </p>
                    </div>
                  </div>
                  <Badge>{amenitiesData.restaurants.nearest}km</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recreation & Lifestyle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Parks', count: amenitiesData.parks.count, fill: '#10b981' },
                        { name: 'Gyms', count: amenitiesData.gyms.count, fill: '#6366f1' },
                        { name: 'Restaurants', count: amenitiesData.restaurants.count, fill: '#f59e0b' },
                        { name: 'Cafes', count: amenitiesData.cafes.count, fill: '#ef4444' },
                        { name: 'Supermarkets', count: amenitiesData.supermarkets.count, fill: '#8b5cf6' }
                      ]}
                      margin={{ top: 20, right: 30, left: 75, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" nameKey="name" label={{ position: 'right' }}>
                        {[
                          { name: 'Parks', count: amenitiesData.parks.count, fill: '#10b981' },
                          { name: 'Gyms', count: amenitiesData.gyms.count, fill: '#6366f1' },
                          { name: 'Restaurants', count: amenitiesData.restaurants.count, fill: '#f59e0b' },
                          { name: 'Cafes', count: amenitiesData.cafes.count, fill: '#ef4444' },
                          { name: 'Supermarkets', count: amenitiesData.supermarkets.count, fill: '#8b5cf6' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <Badge className="bg-green-100 text-green-800">Excellent Amenities</Badge>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This area ranks in the top 10% for amenities in Cape Town
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lifestyle Score</CardTitle>
              <CardDescription>Quality of life indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Dining Options</h4>
                  <Progress value={92} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">9.2/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Outdoor Activities</h4>
                  <Progress value={95} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">9.5/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Shopping Convenience</h4>
                  <Progress value={88} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">8.8/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Entertainment</h4>
                  <Progress value={90} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">9.0/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schools in the Area</CardTitle>
              <CardDescription>Educational facilities near this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {schoolsData.map((school, index) => (
                  <div key={index} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <School className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{school.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {school.type} School • {school.distance}km away
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(school.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        ))}
                        <span className="ml-2 text-sm font-medium">{school.rating}/10</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        Top {100 - Math.floor(school.rating * 10)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">School Ratings Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { rating: '9-10', count: 1, fill: '#10b981' },
                        { rating: '8-9', count: 2, fill: '#6366f1' },
                        { rating: '7-8', count: 0, fill: '#f59e0b' },
                        { rating: '6-7', count: 0, fill: '#ef4444' },
                        { rating: 'Below 6', count: 0, fill: '#8b5cf6' }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rating" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8">
                        {[
                          { rating: '9-10', count: 1, fill: '#10b981' },
                          { rating: '8-9', count: 2, fill: '#6366f1' },
                          { rating: '7-8', count: 0, fill: '#f59e0b' },
                          { rating: '6-7', count: 0, fill: '#ef4444' },
                          { rating: 'Below 6', count: 0, fill: '#8b5cf6' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Educational Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <School className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Excellent School District</h4>
                      <p className="text-sm text-muted-foreground">
                        This property is located in one of the top-rated school districts in Cape Town, with strong academic performance and extracurricular programs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Info className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Private School Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Several highly-rated private and international schools are within a 3km radius, offering alternative educational opportunities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">School Transportation</h4>
                      <p className="text-sm text-muted-foreground">
                        School bus routes serve this area, with pickup points located within walking distance of this property.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transport" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Public Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transportData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.count ? `${item.count} in the area` : `${item.miles} km of lanes`}
                          </p>
                        </div>
                      </div>
                      {item.nearest && (
                        <Badge>{item.nearest}km</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Commute Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cape Town CBD</span>
                      <span className="text-sm font-medium">15 min</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">By car</span>
                      <span className="text-xs text-muted-foreground">7.5 km</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">V&A Waterfront</span>
                      <span className="text-sm font-medium">20 min</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">By car</span>
                      <span className="text-xs text-muted-foreground">10 km</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cape Town International Airport</span>
                      <span className="text-sm font-medium">30 min</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">By car</span>
                      <span className="text-xs text-muted-foreground">22 km</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">University of Cape Town</span>
                      <span className="text-sm font-medium">15 min</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">By car</span>
                      <span className="text-xs text-muted-foreground">7 km</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transportation Score</CardTitle>
              <CardDescription>Mobility and accessibility ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Public Transit</h4>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">7.5/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Walkability</h4>
                  <Progress value={82} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">8.2/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Bike-Friendly</h4>
                  <Progress value={70} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">7.0/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Car Accessibility</h4>
                  <Progress value={95} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-xs font-medium">9.5/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeighborhoodIntelligence;

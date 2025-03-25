
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle, Info, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for price history
const priceHistoryData = [
  { month: 'Jan', value: 2100000 },
  { month: 'Feb', value: 2150000 },
  { month: 'Mar', value: 2200000 },
  { month: 'Apr', value: 2180000 },
  { month: 'May', value: 2250000 },
  { month: 'Jun', value: 2300000 },
  { month: 'Jul', value: 2350000 },
  { month: 'Aug', value: 2400000 },
  { month: 'Sep', value: 2450000 },
  { month: 'Oct', value: 2500000 },
  { month: 'Nov', value: 2550000 },
  { month: 'Dec', value: 2600000 },
];

// Sample data for price forecast
const priceForecastData = [
  { month: 'Jan', historical: 2600000, forecast: 2600000 },
  { month: 'Feb', historical: null, forecast: 2650000 },
  { month: 'Mar', historical: null, forecast: 2700000 },
  { month: 'Apr', historical: null, forecast: 2750000 },
  { month: 'May', historical: null, forecast: 2800000 },
  { month: 'Jun', historical: null, forecast: 2850000 },
];

// Sample comparable properties data
const comparableProperties = [
  { address: '45 Ocean View Drive, Camps Bay', price: 4800000, size: 220, bedrooms: 4, distance: 0.3 },
  { address: '18 Clifton Road, Camps Bay', price: 5200000, size: 250, bedrooms: 4, distance: 0.5 },
  { address: '72 Victoria Road, Bantry Bay', price: 4500000, size: 210, bedrooms: 3, distance: 0.8 },
];

interface PriceInsightsProps {
  propertyPrice?: number;
  propertyArea?: number;
  propertyType?: string;
  propertyLocation?: string;
  compact?: boolean;
}

const PriceInsights: React.FC<PriceInsightsProps> = ({
  propertyPrice = 4800000,
  propertyArea = 220,
  propertyType = 'House',
  propertyLocation = 'Camps Bay, Cape Town',
  compact = false
}) => {
  const pricePerSqm = propertyPrice / propertyArea;
  const areaAverage = 4700000; // Sample area average price
  const priceComparison = ((propertyPrice - areaAverage) / areaAverage) * 100;
  const isAboveAverage = priceComparison > 0;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(price);
  };
  
  if (compact) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            Price Insights
            <Button variant="link" size="sm" className="ml-auto p-0 h-auto">
              <span className="text-sm">Full Analysis</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-xl font-bold">{formatPrice(propertyPrice)}</p>
              </div>
              <Badge className={isAboveAverage ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                {isAboveAverage ? (
                  <TrendingUp className="mr-1 h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="mr-1 h-3.5 w-3.5" />
                )}
                {Math.abs(priceComparison).toFixed(1)}% {isAboveAverage ? 'above' : 'below'} average
              </Badge>
            </div>
            
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={priceHistoryData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    interval={1}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatPrice(value), 'Price']}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Valuation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{formatPrice(propertyPrice)}</span>
              <div className="flex items-center mt-2">
                <Badge className={isAboveAverage ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                  {isAboveAverage ? (
                    <TrendingUp className="mr-1 h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="mr-1 h-3.5 w-3.5" />
                  )}
                  {Math.abs(priceComparison).toFixed(1)}% {isAboveAverage ? 'above' : 'below'} average
                </Badge>
                <Button variant="ghost" size="sm" className="ml-1 h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground mt-3">
                Property value based on latest market data, property features, and location analytics
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Price per m²</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{formatPrice(pricePerSqm)}</span>
              <span className="text-sm text-muted-foreground mt-2">
                Area average: {formatPrice(areaAverage / 200)} per m²
              </span>
              <span className="text-sm text-muted-foreground mt-3">
                This metric helps compare property values regardless of size differences
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Investment Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-3xl font-bold">A-</span>
                <Button variant="ghost" size="sm" className="ml-1 h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground mt-2">
                Strong investment potential
              </span>
              <span className="text-sm text-muted-foreground mt-3">
                Based on historical appreciation, rental yield, and economic forecasts
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Historical Price Trends</CardTitle>
            <CardDescription>
              Property value over the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ChartContainer config={{ historical: { color: '#8884d8' } }}>
                <LineChart
                  data={priceHistoryData}
                  margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `R${value / 1000000}M`} 
                    domain={['dataMin - 200000', 'dataMax + 200000']}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium">Month</div>
                              <div>{payload[0].payload.month}</div>
                              <div className="font-medium">Price</div>
                              <div>{formatPrice(payload[0].value as number)}</div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Historical"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Forecast</CardTitle>
            <CardDescription>
              Projected value for the next 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ChartContainer 
                config={{ 
                  historical: { color: '#8884d8' },
                  forecast: { color: '#82ca9d' } 
                }}
              >
                <LineChart
                  data={priceForecastData}
                  margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `R${value / 1000000}M`}
                    domain={['dataMin - 100000', 'dataMax + 100000']}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const month = payload[0].payload.month;
                        const historical = payload[0].payload.historical;
                        const forecast = payload[0].payload.forecast;
                        
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium">Month</div>
                              <div>{month}</div>
                              {historical && (
                                <>
                                  <div className="font-medium">Historical</div>
                                  <div>{formatPrice(historical)}</div>
                                </>
                              )}
                              {forecast && (
                                <>
                                  <div className="font-medium">Forecast</div>
                                  <div>{formatPrice(forecast)}</div>
                                </>
                              )}
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparable Properties</CardTitle>
          <CardDescription>
            Similar properties in {propertyLocation}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Address</th>
                  <th className="text-right py-3 px-4 font-medium">Price</th>
                  <th className="text-right py-3 px-4 font-medium">Size (m²)</th>
                  <th className="text-right py-3 px-4 font-medium">Beds</th>
                  <th className="text-right py-3 px-4 font-medium">Price/m²</th>
                  <th className="text-right py-3 px-4 font-medium">Distance</th>
                </tr>
              </thead>
              <tbody>
                {comparableProperties.map((property, index) => (
                  <tr 
                    key={index} 
                    className={index !== comparableProperties.length - 1 ? "border-b" : ""}
                  >
                    <td className="py-3 px-4">{property.address}</td>
                    <td className="text-right py-3 px-4">{formatPrice(property.price)}</td>
                    <td className="text-right py-3 px-4">{property.size} m²</td>
                    <td className="text-right py-3 px-4">{property.bedrooms}</td>
                    <td className="text-right py-3 px-4">{formatPrice(property.price / property.size)}</td>
                    <td className="text-right py-3 px-4">{property.distance} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceInsights;

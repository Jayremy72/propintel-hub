
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Bath, Square, MapPin, Camera, Home, Share2, Printer, Heart, ChevronLeft, Info } from 'lucide-react';
import PriceInsights from '@/components/PriceInsights';
import NeighborhoodIntelligence from '@/components/NeighborhoodIntelligence';

// Mock property data (in a real app, this would come from an API)
const propertyData = {
  id: 2,
  title: 'Family Home in Cape Town',
  description: 'This beautiful family home is located in the heart of Camps Bay, offering stunning ocean views and modern finishes throughout. The property features an open-plan living area, gourmet kitchen, and a spacious outdoor entertainment area with a private pool.',
  price: 4800000,
  bedrooms: 4,
  bathrooms: 3,
  area: 220,
  garages: 2,
  address: '45 Ocean View Drive, Camps Bay, Cape Town',
  type: 'House',
  yearBuilt: 2015,
  features: [
    'Ocean View', 
    'Swimming Pool', 
    'Garden', 
    'Security System', 
    'Garage',
    'Walk-in Closet',
    'Fireplace',
    'High Ceilings',
    'Open Plan Kitchen',
    'Granite Countertops',
    'Air Conditioning',
    'Solar Panels'
  ],
  images: [
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  ],
  coordinates: { lat: -33.955050, lng: 18.387241 },
  agent: {
    name: 'Sarah Johnson',
    phone: '+27 82 123 4567',
    email: 'sarah.johnson@propradar.co.za',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(price);
  };

  // Make sure property is always defined with safe defaults
  const property = {
    id: propertyData.id || 0,
    title: propertyData.title || '',
    description: propertyData.description || '',
    price: propertyData.price || 0,
    bedrooms: propertyData.bedrooms || 0,
    bathrooms: propertyData.bathrooms || 0,
    area: propertyData.area || 0,
    address: propertyData.address || '',
    type: propertyData.type || '',
    features: Array.isArray(propertyData.features) ? propertyData.features : [],
    images: Array.isArray(propertyData.images) ? propertyData.images : [],
    coordinates: propertyData.coordinates || { lat: 0, lng: 0 },
    agent: propertyData.agent || {
      name: '',
      phone: '',
      email: '',
      avatar: ''
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Back to results */}
        <div className="container mx-auto px-4 mb-6">
          <Button variant="ghost" className="flex items-center text-gray-600" asChild>
            <a href="/properties">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to search results
            </a>
          </Button>
        </div>
        
        {/* Property Images Gallery */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
            <div className="col-span-2 row-span-2 rounded-l-lg overflow-hidden">
              <img 
                src={property.images[0] || ''} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-tr-lg overflow-hidden">
              <img 
                src={property.images[1] || ''} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src={property.images[2] || ''} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src={property.images[3] || ''} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-br-lg overflow-hidden group">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <Camera className="h-4 w-4 mr-2" />
                  View All Photos
                </Button>
              </div>
              <img 
                src={property.images[4] || ''} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={18} className="mr-1" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-3xl font-bold text-propradar-600">{formatPrice(property.price)}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b">
                  <div className="flex items-center">
                    <Bed size={20} className="mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Bath size={20} className="mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Square size={20} className="mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-semibold">{property.area} m²</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Home size={20} className="mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-semibold">{property.type}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  </div>
                  
                  <div>
                    <Button variant="outline" size="sm" className="flex items-center text-blue-600">
                      <Info className="h-4 w-4 mr-1" />
                      Report Issue
                    </Button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-propradar-600 rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* AI Insights Tabs */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <Tabs defaultValue="price">
                  <TabsList className="mb-6">
                    <TabsTrigger value="price">Price Insights</TabsTrigger>
                    <TabsTrigger value="neighborhood">Neighborhood Intelligence</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="price">
                    <PriceInsights 
                      propertyPrice={property.price}
                      propertyArea={property.area} 
                      propertyType={property.type}
                      propertyLocation="Camps Bay, Cape Town"
                    />
                  </TabsContent>
                  
                  <TabsContent value="neighborhood">
                    <NeighborhoodIntelligence neighborhoodName="Camps Bay, Cape Town" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Contact Agent Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img 
                        src={property.agent.avatar} 
                        alt={property.agent.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{property.agent.name}</h3>
                      <p className="text-sm text-gray-500">Property Agent</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 text-gray-500">Phone:</div>
                      <a href={`tel:${property.agent.phone}`} className="text-propradar-600 hover:underline">
                        {property.agent.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 text-gray-500">Email:</div>
                      <a href={`mailto:${property.agent.email}`} className="text-propradar-600 hover:underline">
                        {property.agent.email}
                      </a>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-propradar-600 hover:bg-propradar-700 mb-3">
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Viewing
                  </Button>
                </CardContent>
              </Card>
              
              {/* Map Preview */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+f44336(${property.coordinates.lng},${property.coordinates.lat})/${property.coordinates.lng},${property.coordinates.lat},13,0/600x300@2x?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xjcHJ0NG9jMDlkdjNvcGVydHktbWFwLWtleSJ9.gzXbxED-Jm1P-8Gs9-u2MQ`}
                      alt="Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button className="bg-white text-gray-900 hover:bg-gray-100">
                        View Full Map
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Schools</span>
                        <span>0.7 km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Supermarket</span>
                        <span>0.5 km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bus Stop</span>
                        <span>0.2 km</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Similar Properties */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Similar Properties</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-3">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={`https://images.unsplash.com/photo-159921520${item}-abcd${item}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=240&q=80`}
                            alt="Similar property" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {item === 1 ? 'Modern Villa in Clifton' : item === 2 ? 'Luxury Apartment in Camps Bay' : 'Penthouse with Ocean View'}
                          </h4>
                          <p className="text-sm text-gray-500 mb-1">
                            {item === 1 ? 'Clifton, Cape Town' : item === 2 ? 'Camps Bay, Cape Town' : 'Bantry Bay, Cape Town'}
                          </p>
                          <p className="text-propradar-600 font-medium text-sm">
                            {formatPrice(item === 1 ? 5200000 : item === 2 ? 4500000 : 6100000)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;

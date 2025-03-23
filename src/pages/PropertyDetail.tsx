
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bed, Bath, Square, Home, MapPin, Calendar, Phone, Mail, 
  Share2, Heart, PenSquare, ArrowLeft, Info, FileText, MapIcon, 
  Maximize, Tag, AlertTriangle
} from 'lucide-react';

// Sample property data
const sampleProperties = [
  {
    id: 1,
    title: 'Modern Apartment in Sandton',
    price: 2500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    address: '123 Central Ave, Sandton, Johannesburg',
    type: 'Apartment',
    description: 'This luxurious apartment in the heart of Sandton offers modern living with high-end finishes. Featuring an open-plan layout, the home includes a designer kitchen with marble countertops, spacious living areas with floor-to-ceiling windows, and a private balcony with city views. The building offers 24-hour security, a rooftop pool, and a fitness center.',
    features: [
      'Balcony with city views', 'Modern kitchen', 'Built-in wardrobes',
      'Air conditioning', 'Secure parking', '24-hour security',
      'Swimming pool', 'Fitness center', 'Elevator'
    ],
    yearBuilt: 2018,
    parkingSpaces: 1,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2358&q=80'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '+27 83 123 4567',
      email: 'sarah.j@propradar.co.za',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    coordinates: { lat: -26.107567, lng: 28.056702 }
  },
  {
    id: 2,
    title: 'Family Home in Cape Town',
    price: 4800000,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    address: '45 Ocean View Drive, Camps Bay, Cape Town',
    type: 'House',
    description: 'This spectacular family home in Camps Bay offers breathtaking ocean views and luxury living. The open-plan design features a gourmet kitchen, spacious living areas, and a deck with an infinity pool overlooking the Atlantic. The master suite includes a spa-like bathroom and walk-in closet. Additional features include a wine cellar, home theater, and automated smart home systems.',
    features: [
      'Ocean views', 'Infinity pool', 'Home theater',
      'Wine cellar', 'Smart home system', 'Double garage',
      'Garden', 'Outdoor entertainment area', 'Security system'
    ],
    yearBuilt: 2015,
    parkingSpaces: 2,
    images: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
    ],
    agent: {
      name: 'Michael Thomas',
      phone: '+27 82 987 6543',
      email: 'michael.t@propradar.co.za',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    coordinates: { lat: -33.955050, lng: 18.387241 }
  },
  // More properties...
];

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Find the property based on the ID parameter
  const property = sampleProperties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <a href="/properties">View All Properties</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1 text-gray-600 hover:text-propradar-600"
            asChild
          >
            <a href="/properties">
              <ArrowLeft size={16} />
              Back to Listings
            </a>
          </Button>
          
          {/* Property Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{property.address}</span>
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-propradar-600">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>
          
          {/* Property Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-3 aspect-[16/9] overflow-hidden rounded-lg relative">
              <img 
                src={property.images[activeImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="bg-white/80 hover:bg-white text-gray-700"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="bg-white/80 hover:bg-white text-gray-700"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-4">
              {property.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-[4/3] overflow-hidden rounded-lg cursor-pointer ${
                    index === activeImageIndex ? 'ring-2 ring-propradar-500' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${property.title} - image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Property Details and Agent Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Key Features */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 text-propradar-600 mb-2" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="text-lg font-semibold">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-propradar-600 mb-2" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="text-lg font-semibold">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 text-propradar-600 mb-2" />
                    <span className="text-sm text-gray-500">Area</span>
                    <span className="text-lg font-semibold">{property.area} m²</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Home className="h-6 w-6 text-propradar-600 mb-2" />
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="text-lg font-semibold">{property.type}</span>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <Tabs defaultValue="details">
                  <TabsList className="w-full border-b">
                    <TabsTrigger value="details" className="flex-1">
                      <Info size={16} className="mr-2" /> Details
                    </TabsTrigger>
                    <TabsTrigger value="features" className="flex-1">
                      <FileText size={16} className="mr-2" /> Features
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex-1">
                      <MapIcon size={16} className="mr-2" /> Map
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Property Description</h3>
                    <p className="text-gray-700 mb-6">{property.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Tag size={16} className="mr-2 text-propradar-600" />
                        <span className="text-sm text-gray-600">Property Type:</span>
                        <span className="text-sm font-medium ml-2">{property.type}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-propradar-600" />
                        <span className="text-sm text-gray-600">Year Built:</span>
                        <span className="text-sm font-medium ml-2">{property.yearBuilt}</span>
                      </div>
                      <div className="flex items-center">
                        <Square size={16} className="mr-2 text-propradar-600" />
                        <span className="text-sm text-gray-600">Property Size:</span>
                        <span className="text-sm font-medium ml-2">{property.area} m²</span>
                      </div>
                      <div className="flex items-center">
                        <Maximize size={16} className="mr-2 text-propradar-600" />
                        <span className="text-sm text-gray-600">Parking Spaces:</span>
                        <span className="text-sm font-medium ml-2">{property.parkingSpaces}</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Property Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-propradar-500 mr-2"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="map" className="aspect-video">
                    <div className="h-full bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-600">Map will be loaded here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Property Agent</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={property.agent.image} 
                      alt={property.agent.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{property.agent.name}</h4>
                    <p className="text-sm text-gray-600">PropRadar Agent</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Phone size={16} className="text-propradar-600 mr-2" />
                    <a href={`tel:${property.agent.phone}`} className="text-gray-800 hover:text-propradar-600">
                      {property.agent.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-propradar-600 mr-2" />
                    <a href={`mailto:${property.agent.email}`} className="text-gray-800 hover:text-propradar-600">
                      {property.agent.email}
                    </a>
                  </div>
                </div>
                
                <Button className="w-full">Contact Agent</Button>
              </div>
              
              {/* Mortgage Calculator */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Mortgage Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Price
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      value={formatPrice(property.price)}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Down Payment (20%)
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      value={formatPrice(property.price * 0.2)}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Amount
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      value={formatPrice(property.price * 0.8)}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Monthly Payment
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md font-semibold text-propradar-600" 
                      value={formatPrice((property.price * 0.8 * 0.008) + (property.price * 0.8 / 240))}
                      disabled
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    * Based on 20% down payment, 20-year term, and 8% interest rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;

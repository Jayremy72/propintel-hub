
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { SearchIcon, MapPin, SlidersHorizontal, X } from 'lucide-react';
import PropertyMap from '@/components/PropertyMap';

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
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -33.955050, lng: 18.387241 }
  },
  {
    id: 3,
    title: 'Beachfront Villa in Ballito',
    price: 7500000,
    bedrooms: 5,
    bathrooms: 4.5,
    area: 350,
    address: '8 Beachfront Road, Ballito, KwaZulu-Natal',
    type: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -29.539320, lng: 31.214684 }
  },
  {
    id: 4,
    title: 'Luxury Penthouse in Umhlanga',
    price: 9200000,
    bedrooms: 3,
    bathrooms: 3.5,
    area: 200,
    address: '120 Lighthouse Road, Umhlanga, Durban',
    type: 'Penthouse',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -29.726980, lng: 31.085409 }
  },
  {
    id: 5,
    title: 'Modern Townhouse in Pretoria',
    price: 1850000,
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    address: '75 Jacaranda Street, Waterkloof, Pretoria',
    type: 'Townhouse',
    imageUrl: 'https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -25.770050, lng: 28.237390 }
  },
  {
    id: 6,
    title: 'Suburban Home in Bloemfontein',
    price: 1550000,
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    address: '22 Willow Road, Universitas, Bloemfontein',
    type: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -29.108990, lng: 26.175129 }
  }
];

const PropertyListing: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [propertyType, setPropertyType] = useState<string>('');

  // Filter properties based on search criteria
  const filteredProperties = sampleProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms === 0 || property.bedrooms >= bedrooms;
    const matchesType = propertyType === '' || property.type === propertyType;
    
    return matchesSearch && matchesPrice && matchesBedrooms && matchesType;
  });

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
          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search for properties by location, name, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                Filters
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  className="px-4"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  className="px-4"
                  onClick={() => setViewMode('map')}
                >
                  Map
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={10000000}
                    step={100000}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Bedrooms</label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <Button 
                        key={num}
                        variant={bedrooms === num ? 'default' : 'outline'} 
                        className="flex-1 p-0 h-10"
                        onClick={() => setBedrooms(num)}
                      >
                        {num === 0 ? 'Any' : num}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['', 'House', 'Apartment', 'Townhouse', 'Villa', 'Penthouse'].map((type) => (
                      <Button 
                        key={type}
                        variant={propertyType === type ? 'default' : 'outline'} 
                        className="px-3"
                        onClick={() => setPropertyType(type)}
                      >
                        {type === '' ? 'Any' : type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
            </h2>
            <div className="text-sm text-gray-500">
              <Button variant="link" onClick={() => {
                setSearchQuery('');
                setPriceRange([0, 10000000]);
                setBedrooms(0);
                setPropertyType('');
              }}>
                <X size={14} className="mr-1" /> Clear All Filters
              </Button>
            </div>
          </div>
          
          {/* Property Listings or Map */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
              <PropertyMap properties={filteredProperties} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyListing;

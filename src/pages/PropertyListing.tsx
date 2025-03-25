import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { SearchIcon, MapPin, SlidersHorizontal, X } from 'lucide-react';
import PropertyMap from '@/components/PropertyMap';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const locations = [
  "Cape Town",
  "Johannesburg",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Kimberley",
  "Nelspruit",
  "Polokwane",
  "Stellenbosch",
  "Sandton",
  "Camps Bay",
  "Ballito",
  "Umhlanga",
  "Centurion",
  "Somerset West",
  "Midrand",
];

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
  },
  {
    id: 7,
    title: 'Luxury Villa with Ocean View',
    price: 12500000,
    bedrooms: 6,
    bathrooms: 5,
    area: 450,
    address: '15 Clifton Beach Road, Cape Town',
    type: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -33.932910, lng: 18.377050 }
  },
  {
    id: 8,
    title: 'Modern Apartment in Sandton CBD',
    price: 3200000,
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    address: '56 Rivonia Road, Sandton, Johannesburg',
    type: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -26.106860, lng: 28.052550 }
  },
  {
    id: 9,
    title: 'Family Home with Garden',
    price: 3800000,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    address: '23 Maple Avenue, Houghton, Johannesburg',
    type: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -26.144660, lng: 28.047440 }
  },
  {
    id: 10,
    title: 'Waterfront Apartment',
    price: 5500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    address: '10 Victoria Wharf, V&A Waterfront, Cape Town',
    type: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1551361415-69c87624334f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coordinates: { lat: -33.903830, lng: 18.418990 }
  }
];

type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'bedrooms' | 'area';

const PropertyListing: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [openLocationCombobox, setOpenLocationCombobox] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [propertyType, setPropertyType] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [filteredLocations, setFilteredLocations] = useState<string[]>(locations);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    if (params.has('location')) setSearchQuery(params.get('location') || '');
    if (params.has('propertyType')) setPropertyType(params.get('propertyType') || '');
    if (params.has('bedrooms')) setBedrooms(Number(params.get('bedrooms')) || 0);
    if (params.has('bathrooms')) setBathrooms(Number(params.get('bathrooms')) || 0);
    if (params.has('minPrice') && params.has('maxPrice')) {
      setPriceRange([
        Number(params.get('minPrice')) || 0,
        Number(params.get('maxPrice')) || 10000000
      ]);
    }
    
    if (location.search) {
      setShowFilters(true);
      toast({
        title: "Search Filters Applied",
        description: "Showing properties matching your search criteria.",
      });
    }
  }, [location.search, toast]);

  useEffect(() => {
    try {
      if (!searchQuery) {
        setFilteredLocations(locations);
      } else {
        const filtered = locations.filter(location => 
          location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLocations(filtered || []);
      }
    } catch (error) {
      console.error('Error filtering locations:', error);
      setFilteredLocations([]);
    }
  }, [searchQuery]);

  const getFilteredLocationsArray = () => {
    return Array.isArray(filteredLocations) ? filteredLocations : [];
  };

  const sortProperties = (properties: typeof sampleProperties) => {
    switch (sortBy) {
      case 'price-asc':
        return [...properties].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...properties].sort((a, b) => b.price - a.price);
      case 'bedrooms':
        return [...properties].sort((a, b) => b.bedrooms - a.bedrooms);
      case 'area':
        return [...properties].sort((a, b) => b.area - a.area);
      case 'newest':
        return [...properties]; // In a real app, we'd sort by date
      default:
        return properties;
    }
  };

  const filteredProperties = sortProperties(sampleProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms === 0 || property.bedrooms >= bedrooms;
    const matchesBathrooms = bathrooms === 0 || property.bathrooms >= bathrooms;
    const matchesType = propertyType === '' || property.type === propertyType;
    
    return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms && matchesType;
  }));

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
          <div className="mb-8 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Popover open={openLocationCombobox} onOpenChange={setOpenLocationCombobox}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        placeholder="Search for properties by location, name, etc."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        onClick={() => setOpenLocationCombobox(true)}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-full min-w-[300px]" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search location..." 
                        className="h-9"
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {getFilteredLocationsArray().map((location) => (
                          <CommandItem
                            key={location}
                            value={location}
                            onSelect={(value) => {
                              setSearchQuery(value);
                              setOpenLocationCombobox(false);
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            {location}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                  <label className="text-sm font-medium">Min Bathrooms</label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((num) => (
                      <Button 
                        key={num}
                        variant={bathrooms === num ? 'default' : 'outline'} 
                        className="flex-1 p-0 h-10"
                        onClick={() => setBathrooms(num)}
                      >
                        {num === 0 ? 'Any' : num}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['any', 'House', 'Apartment', 'Townhouse', 'Villa', 'Penthouse'].map((type) => (
                      <Button 
                        key={type}
                        variant={propertyType === (type === 'any' ? '' : type) ? 'default' : 'outline'} 
                        className="px-3"
                        onClick={() => setPropertyType(type === 'any' ? '' : type)}
                      >
                        {type === 'any' ? 'Any' : type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h2>
              {(searchQuery || propertyType || bedrooms > 0 || bathrooms > 0 || priceRange[0] > 0 || priceRange[1] < 10000000) && (
                <Button variant="link" className="ml-2" onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 10000000]);
                  setBedrooms(0);
                  setBathrooms(0);
                  setPropertyType('');
                }}>
                  <X size={14} className="mr-1" /> Clear Filters
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select 
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                  <SelectItem value="area">Largest Area</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
              {filteredProperties.length === 0 && (
                <div className="col-span-1 md:col-span-3 py-12 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No properties found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results</p>
                </div>
              )}
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


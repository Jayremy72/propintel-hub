
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Property {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  type: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Link to={`/property/${property.id}`}>
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-propradar-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-semibold text-xl">{formatPrice(property.price)}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/property/${property.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-propradar-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{property.address}</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center text-gray-700">
            <Bed size={18} className="mr-1" />
            <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bath size={18} className="mr-1" />
            <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Square size={18} className="mr-1" />
            <span className="text-sm">{property.area} m²</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 border-t flex justify-between">
        <Button variant="outline" size="sm">
          Contact Agent
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link to={`/property/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

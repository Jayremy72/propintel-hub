import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Building, BarChart3, Shield, ChevronRight } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import FeatureShowcase from '@/components/FeatureShowcase';
import PropertySearchForm from '@/components/PropertySearchForm';

// Sample featured properties
const featuredProperties = [
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
  }
];

// Sample property search locations
const popularLocations = [
  { name: 'Cape Town', count: 243, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000&auto=format&fit=crop' },
  { name: 'Johannesburg', count: 185, image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2000&auto=format&fit=crop' },
  { name: 'Durban', count: 124, image: 'https://images.unsplash.com/photo-1595818981973-9042fd27c5d0?q=80&w=2000&auto=format&fit=crop' },
  { name: 'Pretoria', count: 98, image: 'https://images.unsplash.com/photo-1648838632554-ed2e27cf5b12?q=80&w=2000&auto=format&fit=crop' }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Enhanced Search */}
        <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-propradar-900 to-propradar-800 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-full w-full bg-gradient-to-b from-black/40 to-black/10"></div>
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Find Your Perfect Home in South Africa
              </h1>
              <p className="text-xl text-white/90 mb-8">
                PropRadar combines AI-powered insights with comprehensive property listings to help you make better property decisions.
              </p>
            </div>
            
            {/* Enhanced Property Search Form */}
            <PropertySearchForm />
          </div>
        </section>
        
        {/* Feature Showcase */}
        <FeatureShowcase />
        
        {/* Featured Properties */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
              <Button variant="outline" asChild>
                <Link to="/properties" className="flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Locations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Properties by Location</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover properties in South Africa's most sought-after locations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularLocations.map((location, index) => (
                <Link 
                  to="/properties" 
                  key={index}
                  className="group relative h-64 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
                    <p className="text-white/80 flex items-center">
                      <Building size={16} className="mr-1" />
                      {location.count} Properties
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-propradar-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PropRadar</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform offers unique insights that help you make informed property decisions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-14 h-14 bg-propradar-100 rounded-lg flex items-center justify-center mb-5">
                  <MapPin className="h-7 w-7 text-propradar-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Neighborhood Insights</h3>
                <p className="text-gray-600">
                  Get detailed information about neighborhoods, including safety ratings, amenities, schools, and more.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-14 h-14 bg-propradar-100 rounded-lg flex items-center justify-center mb-5">
                  <BarChart3 className="h-7 w-7 text-propradar-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
                <p className="text-gray-600">
                  Access historical price trends, future projections, and investment potential for any property.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-14 h-14 bg-propradar-100 rounded-lg flex items-center justify-center mb-5">
                  <Shield className="h-7 w-7 text-propradar-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
                <p className="text-gray-600">
                  All our listings are verified to ensure you're getting accurate and up-to-date information.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-propradar-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to find your dream property?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect home with PropRadar
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-propradar-700 hover:bg-gray-100" size="lg" asChild>
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-propradar-700" size="lg">
                Create an Account
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

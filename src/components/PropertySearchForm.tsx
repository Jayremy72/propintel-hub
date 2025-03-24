
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from '@/components/ui/slider';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the schema for form validation
const searchFormSchema = z.object({
  location: z.string().optional(),
  propertyType: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().default(0),
  maxPrice: z.number().default(10000000),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  features: z.array(z.string()).default([]),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const PropertySearchForm = () => {
  const navigate = useNavigate();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  // Initialize form
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      location: '',
      propertyType: '',
      category: 'Residential',
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: '',
      bathrooms: '',
      features: [],
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    // Update with price range values
    data.minPrice = priceRange[0];
    data.maxPrice = priceRange[1];
    
    // Convert form data to query parameters
    const params = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          value.forEach(val => params.append(key, val));
        } else {
          params.append(key, String(value));
        }
      }
    });
    
    // Navigate to properties page with search filters
    navigate(`/properties?${params.toString()}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Location Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder="Search by location, neighborhood or address..." 
                        className="pl-10 h-12"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Property Type */}
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="md:w-1/4">
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="any">Any Type</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Search Button */}
            <Button 
              type="submit" 
              className="bg-propradar-600 hover:bg-propradar-700 h-12 md:px-8"
            >
              Search
            </Button>
          </div>

          {/* Advanced Search Collapsible */}
          <Collapsible
            open={isAdvancedOpen}
            onOpenChange={setIsAdvancedOpen}
            className="mt-2"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center justify-center w-full text-propradar-600 p-1"
              >
                <span>Advanced Search</span>
                <ChevronDown 
                  className={`ml-2 h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} 
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Category - Residential/Commercial */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Bedrooms */}
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Bathrooms */}
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Price Range */}
                <FormItem>
                  <FormLabel>Price Range</FormLabel>
                  <div className="pt-4 px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={10000000}
                      step={100000}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </FormItem>
              </div>
              
              {/* Property Features */}
              <div>
                <FormLabel className="block mb-3">Features</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Garden', 'Pool', 'Garage', 'Security', 'Sea View', 'Pet Friendly', 'Furnished', 'Air Conditioning'].map((feature) => (
                    <Button
                      key={feature}
                      type="button"
                      variant="outline"
                      className={`
                        text-sm justify-start h-auto py-2
                        ${form.watch('features').includes(feature) 
                          ? 'bg-propradar-100 border-propradar-300 text-propradar-800' 
                          : ''}
                      `}
                      onClick={() => {
                        const currentFeatures = form.watch('features');
                        if (currentFeatures.includes(feature)) {
                          form.setValue('features', currentFeatures.filter(f => f !== feature));
                        } else {
                          form.setValue('features', [...currentFeatures, feature]);
                        }
                      }}
                    >
                      {feature}
                    </Button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Popular Searches */}
          <div className="flex flex-wrap gap-2 mt-2">
            <p className="text-sm text-gray-500 mr-1">Popular:</p>
            {['Cape Town', 'Johannesburg', 'Durban', 'Sandton', 'Pretoria'].map((location) => (
              <Button 
                key={location} 
                variant="link"
                type="button"
                onClick={() => {
                  form.setValue('location', location);
                  form.handleSubmit(onSubmit)();
                }}
                className="text-sm text-propradar-600 hover:text-propradar-800 hover:underline p-0 h-auto"
              >
                {location}
              </Button>
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PropertySearchForm;

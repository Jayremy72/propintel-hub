
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
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

// Sample locations for autocomplete
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

// Define the schema for form validation
const searchFormSchema = z.object({
  location: z.string().optional().default(""),
  propertyType: z.string().optional().default(""),
  category: z.string().default("Residential"),
  minPrice: z.number().default(0),
  maxPrice: z.number().default(10000000),
  bedrooms: z.string().optional().default(""),
  bathrooms: z.string().optional().default(""),
  features: z.array(z.string()).default([]),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const PropertySearchForm = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [openLocationCombobox, setOpenLocationCombobox] = useState(false);

  // Initialize form with default values
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

  // This function ensures we're only filtering locations when search has input
  const getFilteredLocations = () => {
    const searchValue = form.watch('location') || '';
    if (!searchValue) return locations;
    return locations.filter(location => 
      location.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Top Section with Location Search and Property Type */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Location Search with Autocomplete */}
            <div className="relative flex-grow">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Popover 
                      open={openLocationCombobox} 
                      onOpenChange={setOpenLocationCombobox}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                              placeholder="Search by location, neighborhood or address..."
                              className="pl-10 h-12"
                              {...field}
                              onClick={() => setOpenLocationCombobox(true)}
                            />
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-full min-w-[300px]" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search location..." 
                            className="h-9"
                            value={field.value || ''}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {getFilteredLocations().map((location) => (
                              <CommandItem
                                key={location}
                                value={location}
                                onSelect={(value) => {
                                  form.setValue('location', value);
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
                    defaultValue={field.value || undefined}
                    value={field.value || undefined}
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

          {/* All filter options (always visible) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
                    value={field.value}
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
                    defaultValue={field.value || undefined}
                    value={field.value || undefined}
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
                    defaultValue={field.value || undefined}
                    value={field.value || undefined}
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
              <div className="pt-2 px-2">
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
                    ${(form.watch('features') || []).includes(feature) 
                      ? 'bg-propradar-100 border-propradar-300 text-propradar-800' 
                      : ''}
                  `}
                  onClick={() => {
                    const currentFeatures = form.watch('features') || [];
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
        </form>
      </Form>
    </div>
  );
};

export default PropertySearchForm;

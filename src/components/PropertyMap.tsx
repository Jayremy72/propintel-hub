
import React, { useEffect, useRef } from 'react';
import { Property } from './PropertyCard';

interface PropertyMapProps {
  properties: Property[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // This function will be called once the Google Maps script is loaded
    window.initMap = () => {
      if (!mapRef.current) return;

      // Calculate the center of the map based on property coordinates
      const getMapCenter = () => {
        if (properties.length === 0) {
          // Default to South Africa center if no properties
          return { lat: -30.5595, lng: 22.9375 };
        } else if (properties.length === 1) {
          // Use the single property's coordinates
          return properties[0].coordinates;
        } else {
          // Calculate the average of all property coordinates
          const sumLat = properties.reduce((sum, prop) => sum + prop.coordinates.lat, 0);
          const sumLng = properties.reduce((sum, prop) => sum + prop.coordinates.lng, 0);
          return {
            lat: sumLat / properties.length,
            lng: sumLng / properties.length
          };
        }
      };

      // Initialize the map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: getMapCenter(),
        zoom: properties.length === 1 ? 15 : 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Add markers for each property
      addMarkers();
    };

    // Function to add markers to the map
    const addMarkers = () => {
      if (!mapInstanceRef.current) return;

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      properties.forEach((property, index) => {
        const marker = new window.google.maps.Marker({
          position: property.coordinates,
          map: mapInstanceRef.current,
          title: property.title,
          label: {
            text: `${index + 1}`,
            color: 'white',
            fontWeight: 'bold'
          },
          animation: window.google.maps.Animation.DROP
        });

        // Create info window for the marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="width: 220px; padding: 5px;">
              <img src="${property.imageUrl}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px;">
              <h3 style="margin: 8px 0 4px; font-weight: bold;">${property.title}</h3>
              <p style="margin: 4px 0; color: #2563eb; font-weight: bold;">R${property.price.toLocaleString()}</p>
              <p style="margin: 4px 0; font-size: 0.875rem;">${property.bedrooms} Bed, ${property.bathrooms} Bath, ${property.area}m²</p>
              <a href="/property/${property.id}" style="display: block; text-align: center; background-color: #2563eb; color: white; padding: 6px; margin-top: 8px; border-radius: 4px; text-decoration: none;">View Details</a>
            </div>
          `
        });

        // Add click event to show info window
        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      });

      // If only one property, open its info window automatically
      if (properties.length === 1 && markersRef.current.length === 1) {
        new window.google.maps.event.trigger(markersRef.current[0], 'click');
      }
    };

    // Load Google Maps script if it's not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        // Remove the script when component unmounts
        document.head.removeChild(script);
        delete window.initMap;
      };
    } else if (mapInstanceRef.current) {
      // If map already initialized, just add/update markers
      addMarkers();
    } else {
      // Initialize map if Google Maps is loaded but map isn't initialized yet
      window.initMap();
    }
  }, [properties]);

  return (
    <div ref={mapRef} className="w-full h-full">
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p>Loading map...</p>
      </div>
    </div>
  );
};

export default PropertyMap;

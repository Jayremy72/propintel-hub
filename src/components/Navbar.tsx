
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-propradar-500 rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-lg">P</span>
            </div>
            <span className={cn(
              "font-semibold text-xl transition-colors duration-300",
              isScrolled ? "text-propradar-800" : "text-propradar-800"
            )}>
              PropRadar
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm font-medium text-gray-700 hover:text-propradar-600 transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#market"
            className="text-sm font-medium text-gray-700 hover:text-propradar-600 transition-colors duration-200"
          >
            Market Analysis
          </a>
          <a
            href="#roadmap"
            className="text-sm font-medium text-gray-700 hover:text-propradar-600 transition-colors duration-200"
          >
            Roadmap
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 hover:text-propradar-600 transition-colors duration-200"
          >
            Contact
          </a>
          <Button className="bg-propradar-600 hover:bg-propradar-700 text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in-down">
          <div className="flex flex-col p-4">
            <a
              href="#features"
              className="py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-propradar-600 transition-all duration-200 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#market"
              className="py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-propradar-600 transition-all duration-200 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Market Analysis
            </a>
            <a
              href="#roadmap"
              className="py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-propradar-600 transition-all duration-200 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a
              href="#contact"
              className="py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-propradar-600 transition-all duration-200 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button className="mt-3 bg-propradar-600 hover:bg-propradar-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

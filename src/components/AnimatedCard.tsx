
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-up' | 'scale-in' | 'blur-in';
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  delay = 0,
  animation = 'fade-in-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // No need for hasAnimated state since we want content to always be visible
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect(); // Always disconnect once animated
            }
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
          }
        );
        
        observer.observe(cardRef.current);
        
        return () => {
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        };
      }
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  // Simplified animation classes - only apply when isVisible is true
  const animationClass = isVisible ? {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'scale-in': 'animate-scale-in',
    'blur-in': 'animate-blur-in'
  }[animation] : '';

  return (
    <div
      ref={cardRef}
      className={cn(
        'opacity-100', // Always start visible
        'transition-all duration-700 ease-out',
        isVisible ? animationClass : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;

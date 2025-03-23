
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className, 
  once = true,
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(true); // Always start with true to ensure content is visible by default
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a timer to handle delayed animation
    const timer = setTimeout(() => {
      // Check if element exists and if it's in viewport
      if (textRef.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              setIsVisible(true);
              setHasAnimated(true);
              
              if (once) {
                observer.disconnect();
              }
            } else if (!once) {
              setIsVisible(false);
            }
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
          }
        );
        
        observer.observe(textRef.current);
        
        return () => {
          if (textRef.current) {
            observer.unobserve(textRef.current);
          }
        };
      }
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [once, delay]);

  // Always render content, apply animation class only when in viewport
  return (
    <div
      ref={textRef}
      className={cn(
        'transition-opacity duration-700 ease-in-out',
        isVisible ? 'opacity-100' : 'opacity-100', // Always visible regardless of animation state
        className
      )}
    >
      {text}
    </div>
  );
};

export default AnimatedText;

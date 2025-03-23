
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set hasAnimated to true immediately if once is true
    // This ensures content is visible even before the intersection happens
    if (once) {
      setTimeout(() => {
        setHasAnimated(true);
      }, delay);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) {
              setHasAnimated(true);
            }
          }, delay);
          
          if (once) {
            observer.disconnect();
          }
        } else if (!once && !hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [once, delay, hasAnimated]);

  return (
    <div
      ref={textRef}
      className={cn(
        'transition-opacity duration-700 ease-in-out',
        (isVisible || hasAnimated) ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {text}
    </div>
  );
};

export default AnimatedText;


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
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const animationClasses = {
    'fade-in': 'opacity-0 animate-fade-in',
    'fade-in-up': 'opacity-0 translate-y-5 animate-fade-in-up',
    'scale-in': 'opacity-0 scale-95 animate-scale-in',
    'blur-in': 'opacity-0 blur-sm animate-blur-in'
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? animationClasses[animation] : (hasAnimated ? 'opacity-100' : 'opacity-0'),
        animation === 'fade-in-up' && isVisible ? 'translate-y-0' : '',
        animation === 'scale-in' && isVisible ? 'scale-100' : '',
        animation === 'blur-in' && isVisible ? 'blur-0' : '',
        hasAnimated && !isVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;

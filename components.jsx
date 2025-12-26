// components/MagneticButton.jsx
'use client';

import { useRef, useEffect } from 'react';

export function MagneticButton({ children, className = '' }) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    
    if (!button || !text) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
      button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      text.style.transform = `translate(${deltaX * 0.5}px, ${deltaY * 0.5}px)`;
    };
    
    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)';
      text.style.transform = 'translate(0, 0)';
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button 
      ref={buttonRef}
      className={`transition-transform duration-200 ${className}`}
    >
      <span ref={textRef} className="inline-block transition-transform duration-200">
        {children}
      </span>
    </button>
  );
}

// components/ScrollProgress.jsx
'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// components/ParallaxText.jsx
'use client';

import { useEffect, useRef } from 'react';

export function ParallaxText({ children, speed = 0.5, className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = rect.top + scrolled;
      const viewportCenter = window.innerHeight / 2;
      
      const distance = (scrolled + viewportCenter - offset) * speed;
      element.style.transform = `translateY(${distance}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={elementRef} className={`transition-transform duration-150 ${className}`}>
      {children}
    </div>
  );
}

// components/SplitText.jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function SplitText({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);
  
  const words = children.split(' ');
  
  return (
    <div ref={elementRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.6s ease ${i * 0.05}s`
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

// components/HoverDistortion.jsx
'use client';

import { useRef } from 'react';

export function HoverDistortion({ children, className = '' }) {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * 20;

    container.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`transition-transform duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

// components/GlowCard.jsx
'use client';

import { useRef, useState } from 'react';

export function GlowCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setGlowPosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute w-96 h-96 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,170,0.15) 0%, transparent 70%)',
          left: glowPosition.x - 192,
          top: glowPosition.y - 192,
        }}
      />
      {children}
    </div>
  );
}

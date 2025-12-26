'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ==================== 3D Components ====================

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#00ffaa"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FloatingTechIcon({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// ==================== Custom Cursor ====================

function CustomCursor() {
  const cursorRef = useRef();
  const cursorDotRef = useRef();
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    const onMouseMove = (e) => {
      if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 mix-blend-difference"
        style={{ left: -100, top: -100 }}
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}

// ==================== Hero Section ====================

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00ffaa" intensity={0.5} />
          <AnimatedSphere />
        </Canvas>
      </div>
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 170, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 170, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(60deg) translateY(${mousePosition.y * 20}px) translateX(${mousePosition.x * 20}px)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="space-y-6 animate-fadeInUp">
          <h1 className="text-7xl md:text-9xl font-bold text-white leading-tight tracking-tighter">
            We engineer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 animate-gradientShift">
              digital products
            </span>
            <br />
            that scale.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
            Elite development studio crafting premium software for ambitious companies.
          </p>
          
          <div className="pt-8">
            <button className="group relative px-12 py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Start a Project
              </span>
              <div className="absolute inset-0 bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-scrollDot" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== Philosophy Section ====================

function PhilosophySection() {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-zinc-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`space-y-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Title */}
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              Engineering
              <span className="text-cyan-400"> First.</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
          </div>
          
          {/* Philosophy Grid */}
          <div className="grid md:grid-cols-3 gap-12 mt-24">
            {[
              {
                title: "Architecture",
                desc: "We build systems, not websites. Scalable, maintainable, production-grade code that stands the test of time."
              },
              {
                title: "Performance",
                desc: "Every millisecond matters. Optimized bundles, lazy loading, edge caching. Speed isn't optional."
              },
              {
                title: "Craftsmanship",
                desc: "Code is read more than written. We obsess over clarity, simplicity, and elegance in every line."
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="group relative p-8 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition-all duration-300"
                style={{ 
                  transitionDelay: `${i * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Statement */}
          <div className="mt-24 text-center">
            <p className="text-3xl md:text-5xl font-light text-gray-300 leading-relaxed max-w-5xl mx-auto">
              We don't do marketing fluff.
              <br />
              <span className="text-cyan-400 font-normal">We build serious software.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== Services Section ====================

function ServicesSection() {
  const services = [
    { 
      title: "Web Applications", 
      tech: "React • Next.js • TypeScript",
      desc: "High-performance SPAs and full-stack applications built for scale."
    },
    { 
      title: "Mobile Apps", 
      tech: "React Native • Flutter",
      desc: "Native iOS and Android experiences with shared business logic."
    },
    { 
      title: "UI/UX Systems", 
      tech: "Figma • Design Tokens • Storybook",
      desc: "Cohesive design systems that scale across platforms and teams."
    },
    { 
      title: "Backend & APIs", 
      tech: "Node.js • Python • PostgreSQL",
      desc: "RESTful and GraphQL APIs with robust authentication and caching."
    },
    { 
      title: "AI Integrations", 
      tech: "OpenAI • LangChain • Vector DBs",
      desc: "Intelligent features powered by LLMs and machine learning."
    },
    { 
      title: "Cloud Infrastructure", 
      tech: "AWS • Vercel • Docker",
      desc: "DevOps, CI/CD, monitoring, and automated deployment pipelines."
    }
  ];

  return (
    <section className="relative bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">
            What We <span className="text-cyan-400">Build</span>
          </h2>
          <p className="text-xl text-gray-400">Full-stack expertise across the modern development landscape.</p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative p-8 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition-all duration-500 overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Number */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors">
                0{i + 1}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-cyan-400 font-mono mb-4">{service.tech}</p>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
              
              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== Process Section ====================

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Discover",
      desc: "Deep technical discovery. We analyze your requirements, constraints, and success metrics.",
      icon: "🔍"
    },
    {
      title: "Design",
      desc: "System architecture and UI/UX design. We map data flows, APIs, and user journeys.",
      icon: "✏️"
    },
    {
      title: "Build",
      desc: "Agile development with continuous integration. Weekly demos, code reviews, QA testing.",
      icon: "⚡"
    },
    {
      title: "Scale",
      desc: "Performance optimization, monitoring, and infrastructure. We ensure your product grows with you.",
      icon: "🚀"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('process-section');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.bottom / window.innerHeight)));
      const step = Math.floor(scrollProgress * steps.length);
      setActiveStep(Math.min(step, steps.length - 1));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process-section" className="relative min-h-[200vh] bg-zinc-950">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full">
          {/* Title */}
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-20 text-center">
            Our <span className="text-cyan-400">Process</span>
          </h2>
          
          {/* Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-800 transform -translate-x-1/2">
              <div 
                className="w-full bg-gradient-to-b from-cyan-400 to-emerald-400 transition-all duration-500"
                style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
            
            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, i) => (
                <div 
                  key={i}
                  className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`transition-all duration-700 ${activeStep >= i ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10'}`}>
                      <div className="text-5xl mb-4">{step.icon}</div>
                      <h3 className="text-4xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-xl text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full border-4 transition-all duration-500 ${
                      activeStep >= i 
                        ? 'bg-cyan-400 border-cyan-400 scale-125' 
                        : 'bg-zinc-900 border-zinc-700'
                    }`} />
                  </div>
                  
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== Work Section ====================

function WorkSection() {
  const projects = [
    {
      title: "FinTech Platform",
      category: "Web Application",
      tech: "Next.js, PostgreSQL, Stripe",
      result: "3M+ transactions processed monthly"
    },
    {
      title: "Healthcare Portal",
      category: "Mobile & Web",
      tech: "React Native, Node.js, HIPAA",
      result: "50K+ active patients"
    },
    {
      title: "E-commerce Engine",
      category: "Full-Stack",
      tech: "Next.js, Shopify, Algolia",
      result: "2x conversion rate improvement"
    }
  ];

  return (
    <section className="relative bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Selected <span className="text-cyan-400">Work</span>
          </h2>
          <p className="text-xl text-gray-400">Results-driven projects for forward-thinking companies.</p>
        </div>
        
        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative p-10 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition-all duration-500 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="text-sm text-cyan-400 font-mono mb-2">{project.category}</div>
                  <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 font-mono text-sm">{project.tech}</p>
                </div>
                
                <div className="md:text-right">
                  <div className="text-3xl font-bold text-cyan-400">{project.result}</div>
                  <div className="text-sm text-gray-500 mt-2">Impact</div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== Tech Stack Section ====================

function TechStackSection() {
  const techStacks = [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#000000" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Node.js", color: "#339933" },
    { name: "Python", color: "#3776AB" },
    { name: "PostgreSQL", color: "#4169E1" },
    { name: "AWS", color: "#FF9900" },
    { name: "Docker", color: "#2496ED" },
    { name: "GraphQL", color: "#E10098" },
    { name: "Flutter", color: "#02569B" },
    { name: "FastAPI", color: "#009688" },
    { name: "Redis", color: "#DC382D" }
  ];

  return (
    <section className="relative bg-zinc-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-20 text-center">
          Tech <span className="text-cyan-400">Stack</span>
        </h2>
        
        <div className="relative h-96">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {techStacks.map((tech, i) => {
              const angle = (i / techStacks.length) * Math.PI * 2;
              const radius = 3;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              return (
                <FloatingTechIcon 
                  key={i}
                  position={[x, 0, z]} 
                  color={tech.color}
                  speed={0.5 + Math.random()}
                />
              );
            })}
          </Canvas>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
          {techStacks.map((tech, i) => (
            <div
              key={i}
              className="group p-6 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition-all duration-300 text-center"
            >
              <div 
                className="w-3 h-3 rounded-full mx-auto mb-3 transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: tech.color }}
              />
              <div className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== CTA Section ====================

function CTASection() {
  return (
    <section className="relative bg-black py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
          Let's build
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            something serious.
          </span>
        </h2>
        
        <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Premium software for companies that value engineering excellence.
        </p>
        
        <button className="group relative px-16 py-6 bg-cyan-400 text-black text-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50">
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </button>
        
        <p className="mt-8 text-gray-500 text-sm">
          info@agency.dev • Schedule a technical consultation
        </p>
      </div>
    </section>
  );
}

// ==================== Footer ====================

function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-white mb-2">AGENCY</div>
            <p className="text-gray-500 text-sm">Engineering digital excellence since 2020</p>
          </div>
          
          <div className="flex gap-8">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-semibold"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-600 text-sm">
          © 2025 Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ==================== Main App ====================

export default function AgencyWebsite() {
  return (
    <div className="bg-black text-white overflow-x-hidden cursor-none">
      <CustomCursor />
      <HeroSection />
      <PhilosophySection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <TechStackSection />
      <CTASection />
      <Footer />
      
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes scrollDot {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        .animate-scrollDot {
          animation: scrollDot 2s ease-in-out infinite;
        }
        
        @font-face {
          font-family: 'SpaceGrotesk';
          src: local('Space Grotesk');
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'SpaceGrotesk', 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}

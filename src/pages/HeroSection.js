import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  FaCheckCircle
} from 'react-icons/fa';

const AgentHeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x111827, 0.5);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const connections = [];
    const nodePositions = [];

    const nodeCount = 30;
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30;
      nodePositions.push({ x, y, z });
    }

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      if (i < nodeCount) {
        posArray[i3] = nodePositions[i].x;
        posArray[i3 + 1] = nodePositions[i].y;
        posArray[i3 + 2] = nodePositions[i].z;
      } else {
        posArray[i3] = (Math.random() - 0.5) * 80;
        posArray[i3 + 1] = (Math.random() - 0.5) * 80;
        posArray[i3 + 2] = (Math.random() - 0.5) * 60;
      }
      
      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.85) {
          connections.push({
            from: i,
            to: j,
            pulseSpeed: 0.5 + Math.random() * 2,
            pulseProgress: Math.random()
          });
        }
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: new THREE.Color('rgb(139, 92, 246)'),
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('rgb(139, 92, 246)'),
      transparent: true,
      opacity: 0.3
    });

    const lineGeometries = [];
    const lines = [];
    
    connections.forEach((connection) => {
      const geometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(6);
      
      linePositions[0] = nodePositions[connection.from].x;
      linePositions[1] = nodePositions[connection.from].y;
      linePositions[2] = nodePositions[connection.from].z;
      linePositions[3] = nodePositions[connection.to].x;
      linePositions[4] = nodePositions[connection.to].y;
      linePositions[5] = nodePositions[connection.to].z;
      
      geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
      
      lineGeometries.push(geometry);
      lines.push(line);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      
      const positions = particles.geometry.attributes.position.array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        if (i >= nodeCount) {
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
          
          if (Math.abs(positions[i3]) > 40) velocities[i3] *= -1;
          if (Math.abs(positions[i3 + 1]) > 40) velocities[i3 + 1] *= -1;
          if (Math.abs(positions[i3 + 2]) > 30) velocities[i3 + 2] *= -1;
        }
      }
      
      connections.forEach((connection, idx) => {
        connection.pulseProgress += 0.01 * connection.pulseSpeed;
        if (connection.pulseProgress > 1) connection.pulseProgress = 0;
        
        const pulseFactor = Math.sin(connection.pulseProgress * Math.PI);
        lines[idx].material.opacity = 0.1 + pulseFactor * 0.3;
        
        const positions = lineGeometries[idx].attributes.position.array;
        positions[0] = nodePositions[connection.from].x;
        positions[1] = nodePositions[connection.from].y;
        positions[2] = nodePositions[connection.from].z;
        positions[3] = nodePositions[connection.to].x;
        positions[4] = nodePositions[connection.to].y;
        positions[5] = nodePositions[connection.to].z;
        lineGeometries[idx].attributes.position.needsUpdate = true;
      });
      
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.remove(particles);
      lines.forEach(line => scene.remove(line));
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometries.forEach(geo => geo.dispose());
    };
  }, []);

  const evolutionStages = [
    {
      title: "Manual Testing",
      description: "Time-intensive, human-dependent quality processes",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      gradient: "from-gray-700 to-gray-800",
      isActive: true
    },
    {
      title: "Tool-Based Testing",
      description: "Script-driven frameworks with high maintenance",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
      gradient: "from-blue-700 to-blue-800",
      isActive: true
    },
    {
      title: "AI-Assisted Testing",
      description: "Machine learning augmentation and pattern recognition",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      gradient: "from-cyan-700 to-cyan-800",
      isActive: true
    },
    {
      title: "Agentic AI Testing",
      description: "Autonomous intelligent agents with cognitive reasoning",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80",
      gradient: "from-purple-600 to-purple-700",
      isActive: true
    }
  ];

  return (
    <section className="relative bg-gray-900 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/90 z-[1]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-5">
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-2.5">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">The Testing Revolution</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            The Evolution of <span className="text-purple-500">Quality Engineering</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Witness three decades of quality engineering evolution—from human-driven testing to intelligent AI agents that think, learn, and adapt
          </p>
        </div>

        {/* Evolution Timeline with Images */}
        <div className="relative">
          
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line with gradient */}
              <div className="absolute top-[210px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-gray-600 via-cyan-500/60 to-purple-500 rounded-full z-0" />
              
              <div className="grid grid-cols-4 gap-6 relative">
                {evolutionStages.map((stage, index) => (
                  <div key={index} className="relative group">
                    
                    {/* Timeline Dot - positioned at top of card */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        stage.isActive 
                          ? 'bg-purple-500 ring-4 ring-purple-500/30 shadow-lg shadow-purple-500/50' 
                          : 'bg-gray-600 ring-4 ring-gray-800/80'
                      }`}>
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Vertical connector from dot to card */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-gray-600 to-transparent z-10" />
                    
                    {/* Content Card */}
                    <div className={`relative mt-16 bg-gradient-to-br ${stage.gradient} rounded-2xl overflow-hidden border ${
                      stage.isActive ? 'border-purple-500/50 shadow-xl shadow-purple-500/20' : 'border-gray-700/50'
                    } transition-all duration-300 hover:scale-105 hover:shadow-2xl group-hover:border-purple-500/40`}>
                      
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={stage.image} 
                          alt={stage.title}
                          className="w-full h-full object-cover opacity-100 group-hover:opacity-120 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${stage.gradient} opacity-70`} />
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h3 className={`text-lg font-bold mb-2 ${
                          stage.isActive ? 'text-white' : 'text-gray-200'
                        }`}>
                          {stage.title}
                        </h3>
                        
                        <p className={`text-sm leading-relaxed ${
                          stage.isActive ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {stage.description}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile & Tablet: Vertical Timeline */}
          <div className="lg:hidden space-y-6">
            {evolutionStages.map((stage, index) => (
              <div key={index} className="relative flex gap-4 items-start">
                {/* Timeline Line */}
                {index < evolutionStages.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-purple-500/50" />
                )}
                
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0 mt-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    stage.isActive 
                      ? 'bg-purple-500 ring-4 ring-purple-500/30 shadow-lg shadow-purple-500/50' 
                      : 'bg-gray-600 ring-4 ring-gray-700'
                  }`}>
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content Card */}
                <div className={`flex-1 bg-gradient-to-br ${stage.gradient} rounded-xl overflow-hidden border ${
                  stage.isActive ? 'border-purple-500/50 shadow-xl shadow-purple-500/20' : 'border-gray-700/50'
                }`}>
                  
                  {/* Image */}
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img 
                      src={stage.image} 
                      alt={stage.title}
                      className="w-full h-full object-cover opacity-100"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${stage.gradient} opacity-60`} />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className={`text-base sm:text-lg font-bold mb-2 ${
                      stage.isActive ? 'text-white' : 'text-gray-200'
                    }`}>
                      {stage.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed ${
                      stage.isActive ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      {stage.description}
                    </p>
                    
                    {stage.isActive && (
                      <div className="mt-3 pt-3 border-t border-purple-500/30">
                        <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
                          <FaCheckCircle />
                          <span>Our Technology</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AgentHeroSection;
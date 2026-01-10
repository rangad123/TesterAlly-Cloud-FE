
// import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FaRobot, FaBrain, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

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

  return (
    <section className="relative bg-gray-900 py-16 mt-[3rem]">
      <div ref={containerRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="text-purple-500">Testerally</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            The Complete Agentic AI Testing Platform
          </p>
          <div className="inline-block bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-2">
            <p className="text-purple-300 text-sm font-medium">
              Two Powerful Testing Solutions | One Unified Platform
            </p>
          </div>
        </div>

        {/* Split Hero Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          
          {/* Agentic AI Testing */}
          <div className="group relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer flex flex-col">
            
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/20 p-4 rounded-xl">
                <FaRobot className="text-4xl text-blue-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">Agentic AI Testing</h2>
                <p className="text-blue-300 text-sm">AI Tests Your Applications</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
              Deploy AI agents to autonomously test your web applications, mobile apps, and APIs. 
              Our intelligent platform creates, executes, and maintains tests while adapting to your application's evolution.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">Cross-platform web and mobile testing</span>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">RESTful and GraphQL API validation</span>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">Self-healing test automation</span>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">Automated root cause analysis</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 mt-auto">
              Learn More <FaArrowRight className="ml-2" />
            </button>
          </div>

          {/* Testing AI Systems */}
          <div className="group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer flex flex-col">
            
            <div className="flex items-center mb-6">
              <div className="bg-purple-500/20 p-4 rounded-xl">
                <FaBrain className="text-4xl text-purple-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">Testing AI Systems</h2>
                <p className="text-purple-300 text-sm">Test AI Models & Agents</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
              Comprehensive validation framework for AI models, LLMs, and intelligent agents. 
              Ensure accuracy, safety, and reliability of your AI systems before production deployment.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <FaCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">LLM output validation and benchmarking</span>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">Multi-agent system behavior testing</span>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">Hallucination and bias detection</span>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">Security and safety compliance testing</span>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 mt-auto">
              Learn More <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentHeroSection;



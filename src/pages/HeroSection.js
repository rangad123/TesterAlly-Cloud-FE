
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FaRobot, FaBrain, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const AgentHeroSection = () => {
  const containerRef = useRef(null);
  let navigate = useNavigate();

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
          <div className="group relative overflow-hidden border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer flex flex-col hover:scale-[1.02]">
            
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/20 p-4 rounded-2xl border border-blue-400/30 shadow-lg shadow-blue-500/20">
                  <FaRobot className="text-4xl text-blue-400" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">Agentic AI Testing</h2>
                  <p className="text-blue-300 text-sm font-medium">AI Tests Your Applications</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-base">
                Deploy AI agents to autonomously test your web applications, mobile apps, and APIs. 
                Our intelligent platform creates, executes, and maintains tests while adapting to your application's evolution.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Cross-platform web and mobile testing</span>
                </div>
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">RESTful and GraphQL API validation</span>
                </div>
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Self-healing test automation</span>
                </div>
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Automated root cause analysis</span>
                </div>
              </div>

              <button 
              onClick={() => navigate("/studio")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] mt-auto">
                Learn More <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          {/* Testing AI Systems */}
          <div className="group relative overflow-hidden border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer flex flex-col hover:scale-[1.02]">
            
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/20 p-4 rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
                  <FaBrain className="text-4xl text-purple-400" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">Testing AI Systems</h2>
                  <p className="text-purple-300 text-sm font-medium">Test AI Models & Agents</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-base">
                Comprehensive validation framework for AI models, LLMs, and intelligent agents. 
                Ensure accuracy, safety, and reliability of your AI systems before production deployment.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">LLM output validation and benchmarking</span>
                </div>
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Multi-agent system behavior testing</span>
                </div>
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Hallucination and bias detection</span>
                </div>
                <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/40 transition-all duration-300">
                  <FaCheckCircle className="text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Security and safety compliance testing</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] mt-auto">
                Learn More <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentHeroSection;



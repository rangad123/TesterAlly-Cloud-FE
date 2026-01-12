import React, { useState } from 'react';
import "./Style2.css";
import { FaCheckCircle, FaGithub, FaLinkedin, FaEnvelope, FaLightbulb, FaShieldAlt, FaChartLine, FaCode, FaCogs, FaFlask, FaSearch, FaBolt, FaLayerGroup } from 'react-icons/fa';
import { FaRobot, FaBrain, FaArrowRight, FaNetworkWired } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import CookieConsent from "./CookieConsent";
import AgentHeroSection from "./HeroSection";

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState('vertical1');
  const navigate = useNavigate()

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <CookieConsent />
      
      {/* Hero Section */}
      <section className="hero">
        <AgentHeroSection />
      </section>

      <section className="relative bg-gray-900 py-16">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-2">
              <p className="text-purple-300 text-sm font-medium">
                Two Powerful Testing Solutions | One Unified Platform
              </p>
            </div>
          </div>

          {/* Split Hero Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* Agentic AI Testing */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/90 via-blue-900/40 to-gray-800/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer flex flex-col hover:scale-[1.02]">
              
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/20 p-4 rounded-2xl border border-blue-400/30 shadow-lg shadow-blue-500/20">
                    <FaRobot className="text-4xl text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">Agentic AI in Quality Engineering</h2>
                    <p className="text-blue-300 text-sm font-medium">Autonomous Quality Assurance by AI Agents</p>
                  </div>
                </div>
  
                <p className="text-gray-300 mb-6 leading-relaxed text-base">
                  Transform quality engineering with autonomous AI agents that think, learn, and adapt. 
                  Our intelligent agents independently explore applications, identify issues, and ensure quality across web, mobile, and API platforms with human-like reasoning.
                </p>
  
                <div className="space-y-3 mb-8">
                  <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                    <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-200">Intelligent web and mobile experience validation</span>
                  </div>
                  <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                    <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-200">Autonomous API behavior assurance</span>
                  </div>
                  <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                    <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-200">Self-healing quality logic that evolves with your product</span>
                  </div>
                  <div className="flex items-start bg-gray-800/40 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                    <FaCheckCircle className="text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-200">Intelligent failure understanding and actionable insights</span>
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
            <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/90 via-purple-900/40 to-gray-800/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer flex flex-col hover:scale-[1.02]">
              
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

      {/* Platform Benefits */}
      <section className="py-16 lg:py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Leading Teams Choose <span className="text-purple-500">Testerally</span>
            </h2>
            <p className="text-gray-300 text-base lg:text-lg max-w-3xl mx-auto">
              The only unified platform for testing both traditional applications and AI-powered systems
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 lg:p-8 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="bg-purple-500/20 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <FaLightbulb className="text-2xl lg:text-3xl text-purple-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Future-Ready Architecture</h3>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                Built for the AI era with support for both traditional software testing and cutting-edge AI system validation in a single unified platform
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 lg:p-8 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="bg-purple-500/20 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <FaShieldAlt className="text-2xl lg:text-3xl text-purple-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Enterprise-Grade Security</h3>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                Bank-level security with SOC 2 compliance, role-based access control, and comprehensive audit logging for regulated industries
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 lg:p-8 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="bg-purple-500/20 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <FaChartLine className="text-2xl lg:text-3xl text-purple-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Intelligent Insights</h3>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                AI-powered analytics deliver actionable recommendations, trend analysis, and predictive quality metrics to drive continuous improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Explore Our <span className="text-purple-500">Quality Solutions</span>
            </h2>
            <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto">
              Choose the intelligent solution that transforms your quality engineering
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-10 lg:mb-12">
            <div className="inline-flex bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50 shadow-xl">
              <button
                onClick={() => setActiveTab('vertical1')}
                className={`px-6 sm:px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${
                  activeTab === 'vertical1'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="hidden sm:inline">Agentic AI Quality Engineering</span>
                <span className="sm:hidden">AI Quality</span>
              </button>
              <button
                onClick={() => setActiveTab('vertical2')}
                className={`px-6 sm:px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${
                  activeTab === 'vertical2'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="hidden sm:inline">Testing AI Systems</span>
                <span className="sm:hidden">AI Systems</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {activeTab === 'vertical1' ? (
                <div className="space-y-8 lg:space-y-10">
                  {/* What We Validate */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-3 rounded-xl flex-shrink-0 border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                        <FaCode className="text-xl text-blue-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        What We Validate
                      </h3>
                    </div>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed pl-0 sm:pl-16">
                      Web experiences (React, Angular, Vue), native mobile applications (iOS/Android), 
                      API behaviors (REST, GraphQL), microservices ecosystems, serverless architectures, 
                      complex user journeys, and end-to-end business workflows.
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                  {/* Ideal For */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-3 rounded-xl flex-shrink-0 border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                        <FaCogs className="text-xl text-blue-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        Ideal For
                      </h3>
                    </div>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed pl-0 sm:pl-16">
                      Quality Engineering teams, Platform Engineering organizations, DevOps and continuous delivery teams, 
                      Product-focused companies, and high-velocity teams scaling quality without scaling headcount.
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                  {/* Core Capabilities */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-3 rounded-xl flex-shrink-0 border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                        <FaBolt className="text-xl text-blue-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        Core Capabilities
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 pl-0 sm:pl-16">
                      {[
                        'Intent-based quality validation',
                        'Intelligent visual behavior detection',
                        'Adaptive reasoning for dynamic applications',
                        'Autonomous exploration and edge case discovery',
                        'Cognitive failure analysis and insights',
                        'Cross-platform experience consistency',
                        'Self-evolving quality logic',
                        'Continuous quality orchestration'
                      ].map((capability, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                          <span className="text-sm text-gray-200">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 lg:space-y-10">
                  {/* What We Validate */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-3 rounded-xl flex-shrink-0 border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                        <FaFlask className="text-xl text-purple-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        What We Validate
                      </h3>
                    </div>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed pl-0 sm:pl-16">
                      Large Language Models (GPT, Claude, Gemini), conversational AI systems, 
                      multi-agent orchestration platforms, RAG (Retrieval-Augmented Generation) pipelines, 
                      fine-tuned models, prompt templates, and AI-powered features.
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                  {/* Ideal For */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-3 rounded-xl flex-shrink-0 border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                        <FaLayerGroup className="text-xl text-purple-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        Ideal For
                      </h3>
                    </div>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed pl-0 sm:pl-16">
                      AI/ML Engineering teams, LLMOps specialists, Product teams building AI-native applications, 
                      AI Safety and Research teams, and organizations deploying production AI systems.
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                  {/* Core Capabilities */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-3 rounded-xl flex-shrink-0 border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                        <FaSearch className="text-xl text-purple-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        Core Capabilities
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 pl-0 sm:pl-16">
                      {[
                        'Response accuracy validation',
                        'Model version comparison',
                        'Hallucination detection',
                        'Bias and toxicity screening',
                        'Prompt injection defense',
                        'Context retrieval accuracy',
                        'Agent behavior validation',
                        'Performance benchmarking'
                      ].map((capability, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                          <span className="text-sm text-gray-200">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AI Stack Section */}
      <section className="py-16 lg:py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="text-purple-500">AI Stack</span>
            </h2>
            <p className="text-gray-300 text-base lg:text-lg max-w-3xl mx-auto">
              Leveraging the latest advancements in large language models, AI frameworks, and intelligent protocols
            </p>
          </div>

          {/* LLM Models */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 text-center">
              Supported AI Models
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { name: 'GPT-4 Turbo', provider: 'OpenAI', icon: '🤖', color: 'from-blue-600 to-blue-700' },
                { name: 'Claude Sonnet 4', provider: 'Anthropic', icon: '🧠', color: 'from-purple-600 to-purple-700' },
                { name: 'Gemini Pro', provider: 'Google', icon: '✨', color: 'from-cyan-600 to-cyan-700' },
                { name: 'Llama 3.1', provider: 'Meta', icon: '🦙', color: 'from-blue-700 to-purple-700' }
              ].map((model, index) => (
                <div key={index} className={`bg-gradient-to-br ${model.color} rounded-xl p-6 border border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-${model.color.split('-')[1]}-500/20`}>
                  <div className="text-4xl mb-3">{model.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-1">{model.name}</h4>
                  <p className="text-sm text-gray-200 opacity-80">{model.provider}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Frameworks & Protocols */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Frameworks */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/20 p-3 rounded-xl border border-blue-400/30 shadow-lg shadow-blue-500/20">
                  <FaCogs className="text-2xl text-blue-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white ml-4">
                  AI Frameworks
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'LangChain', desc: 'Advanced agent orchestration', icon: '🔗' },
                  { name: 'LlamaIndex', desc: 'RAG & knowledge retrieval', icon: '📚' },
                  { name: 'AutoGen', desc: 'Multi-agent conversations', icon: '🤝' },
                  { name: 'CrewAI', desc: 'Role-based AI agents', icon: '👥' },
                ].map((framework, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/40 transition-all duration-300">
                    <span className="text-2xl">{framework.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white">{framework.name}</h4>
                      <p className="text-sm text-gray-400">{framework.desc}</p>
                    </div>
                    <FaCheckCircle className="text-blue-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Protocols */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/20 p-3 rounded-xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
                  <FaNetworkWired className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white ml-4">
                  Intelligence Protocols
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'Model Context Protocol', short: 'MCP', desc: 'Anthropic\'s standardized context sharing', highlight: true },
                  { name: 'Function Calling API', short: 'Functions', desc: 'Structured tool integration', highlight: false },
                  { name: 'OpenAI Assistants', short: 'Assistants', desc: 'Stateful AI conversations', highlight: false },
                  { name: 'Prompt Engineering', short: 'PE', desc: 'Advanced prompt optimization', highlight: false }
                ].map((protocol, index) => (
                  <div key={index} className={`flex items-center gap-4 bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border ${
                    protocol.highlight ? 'border-purple-500/40 bg-purple-900/20' : 'border-gray-700/50'
                  } hover:border-purple-500/40 transition-all duration-300`}>
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      protocol.highlight ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' : 'bg-gray-700/50 text-gray-300'
                    }`}>
                      {protocol.short}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white">{protocol.name}</h4>
                      <p className="text-sm text-gray-400">{protocol.desc}</p>
                    </div>
                    {protocol.highlight && (
                      <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">NEW</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Real-World <span className="text-purple-500">Applications</span>
            </h2>
            <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto">
              See how organizations leverage Testerally across different scenarios
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-blue-500/40 rounded-xl p-6 lg:p-8 hover:border-blue-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-semibold mr-3 border border-blue-500/30">
                  Agentic AI Testing
                </div>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">E-Commerce Platform Testing</h3>
              <p className="text-sm lg:text-base text-gray-300 mb-4 leading-relaxed">
                A global retailer needed comprehensive testing for their checkout flow, payment gateway integration, 
                inventory management system, and mobile shopping experience across iOS and Android platforms.
              </p>
              <p className="text-blue-400 font-semibold text-sm lg:text-base flex items-start">
                <FaCheckCircle className="mt-1 mr-2 flex-shrink-0" />
                <span>Achieved 95% test automation coverage with zero-maintenance self-healing tests and 60% reduction in QA cycle time</span>
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-purple-500/40 rounded-xl p-6 lg:p-8 hover:border-purple-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500/20 px-4 py-1.5 rounded-full text-purple-400 text-xs font-semibold mr-3 border border-purple-500/30">
                  Testing AI Systems
                </div>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">AI Customer Support Validation</h3>
              <p className="text-sm lg:text-base text-gray-300 mb-4 leading-relaxed">
                A SaaS company deployed an LLM-powered customer support chatbot and required validation of response accuracy, 
                handling of edge cases, safety compliance, and multilingual support before production release.
              </p>
              <p className="text-purple-400 font-semibold text-sm lg:text-base flex items-start">
                <FaCheckCircle className="mt-1 mr-2 flex-shrink-0" />
                <span>Detected and prevented 47 potential hallucinations, ensuring 99.2% safety compliance with zero critical incidents post-launch</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Testing?
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Join the future of testing with Testerally's dual-service platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={() => navigate("/dashboard/register")}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/50">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 font-semibold rounded-lg transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-wrap justify-between gap-12 mb-12">
            
            <div className="min-w-[200px]">
              <h3 className="text-xl font-bold text-purple-400 mb-6">About</h3>
              <div className="flex flex-col space-y-3">
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Our Story</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Team</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Careers</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Press</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Contact Us</Link>
              </div>
            </div>

            <div className="min-w-[200px]">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Solutions</h3>
              <div className="flex flex-col space-y-3">
                <a href="#vertical1" className="text-gray-300 hover:text-purple-300 transition-colors">Agentic AI Testing</a>
                <a href="#vertical2" className="text-gray-300 hover:text-purple-300 transition-colors">Testing AI Systems</a>
                <a href="#features" className="text-gray-300 hover:text-purple-300 transition-colors">Platform Features</a>
                <a href="#use-cases" className="text-gray-300 hover:text-purple-300 transition-colors">Use Cases</a>
              </div>
            </div>

            <div className="min-w-[200px]">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Pricing</h3>
              <div className="flex flex-col space-y-3">
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Free Trial</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Starter Plan</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Professional</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Enterprise</Link>
              </div>
            </div>

            <div className="min-w-[200px]">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Resources</h3>
              <div className="flex flex-col space-y-3">
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Documentation</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Blog</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Tutorials</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">API Reference</Link>
                <Link to="resources" className="text-gray-300 hover:text-purple-300 transition-colors">Support Center</Link>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Testerally</h3>
            <p className="text-gray-300 text-lg">Agentic AI Testing Services</p>
          </div>

          <hr className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">© 2024 Testerally. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <FaLinkedin className="text-purple-600" /> LinkedIn
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <FaGithub className="text-purple-600" /> GitHub
              </a>
              <a 
                href="mailto:support@testerally.com"
                className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <FaEnvelope className="text-purple-600" /> Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
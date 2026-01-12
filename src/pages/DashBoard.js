import React, { useState } from 'react';
import "./Style2.css";
import { FaCheckCircle, FaGithub, FaLinkedin, FaEnvelope, FaLightbulb, FaShieldAlt, FaChartLine, FaCode, FaCogs, FaFlask, FaSearch, FaBolt, FaLayerGroup } from 'react-icons/fa';
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

      {/* Use Cases */}
      <section className="py-16 lg:py-24 bg-gray-800/50">
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
                <a href="#vertical1" className="text-gray-300 hover:text-purple-300 transition-colors">AI-Assisted Testing</a>
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
            <p className="text-gray-300 text-lg">Agentic AI Testing Service</p>
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
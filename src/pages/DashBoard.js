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
              Explore Our <span className="text-purple-500">Testing Services</span>
            </h2>
            <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto">
              Choose the solution that fits your testing requirements
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-10 lg:mb-12">
            <div className="inline-flex bg-gray-800 rounded-xl p-1.5 border border-gray-700 shadow-lg">
              <button
                onClick={() => setActiveTab('vertical1')}
                className={`px-4 sm:px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 text-sm lg:text-base ${
                  activeTab === 'vertical1'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Agentic AI Testing</span>
                <span className="sm:hidden">AI Testing</span>
              </button>
              <button
                onClick={() => setActiveTab('vertical2')}
                className={`px-4 sm:px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 text-sm lg:text-base ${
                  activeTab === 'vertical2'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Testing AI Systems</span>
                <span className="sm:hidden">AI Systems</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-10 shadow-2xl">
            {activeTab === 'vertical1' ? (
              <div className="space-y-8 lg:space-y-10">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-blue-500/20 p-3 lg:p-4 rounded-xl flex-shrink-0">
                    <FaCode className="text-xl lg:text-2xl text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">What We Test</h3>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      Web applications (React, Angular, Vue), native mobile apps (iOS/Android), 
                      REST and GraphQL APIs, microservices architectures, serverless functions, 
                      complex user workflows, and end-to-end business processes.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-blue-500/20 p-3 lg:p-4 rounded-xl flex-shrink-0">
                    <FaCogs className="text-xl lg:text-2xl text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Ideal For</h3>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      QA Engineering teams, Software Development Engineers in Test (SDETs), DevOps and CI/CD teams, 
                      Product organizations, and startups scaling their quality assurance operations.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-blue-500/20 p-3 lg:p-4 rounded-xl flex-shrink-0">
                    <FaBolt className="text-xl lg:text-2xl text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Core Capabilities</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm lg:text-base text-gray-300">
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Natural language test authoring</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Visual regression detection</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Self-healing element locators</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Parallel test execution</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>AI-powered failure diagnosis</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Cross-browser compatibility</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Automated regression suites</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>CI/CD pipeline integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 lg:space-y-10">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-purple-500/20 p-3 lg:p-4 rounded-xl flex-shrink-0">
                    <FaFlask className="text-xl lg:text-2xl text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">What We Test</h3>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      Large Language Models (GPT, Claude, Gemini), conversational AI systems, 
                      multi-agent orchestration platforms, RAG (Retrieval-Augmented Generation) pipelines, 
                      fine-tuned models, prompt templates, and AI-powered features.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-purple-500/20 p-3 lg:p-4 rounded-xl flex-shrink-0">
                    <FaLayerGroup className="text-xl lg:text-2xl text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Ideal For</h3>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      AI/ML Engineering teams, LLMOps specialists, Product teams building AI-native applications, 
                      AI Safety and Research teams, and organizations deploying production AI systems.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-purple-500/20 p-3 lg:p-4 rounded-xl flex-shrink-0">
                    <FaSearch className="text-xl lg:text-2xl text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Core Capabilities</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm lg:text-base text-gray-300">
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Response accuracy validation</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Model version comparison</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Hallucination detection</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Bias and toxicity screening</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Prompt injection defense</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Context retrieval accuracy</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Agent behavior validation</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Performance benchmarking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

          {/* Combined Use Case */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-purple-500/30 rounded-xl p-6 lg:p-8 hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 rounded-full text-white text-xs font-semibold mr-3">
                Both Services Combined
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white">AI-Powered SaaS Application</h3>
            </div>
            <p className="text-sm lg:text-base text-gray-300 mb-4 leading-relaxed">
              A SaaS company built an application with AI-powered features (smart recommendations, predictive analytics) 
              alongside traditional features (user management, billing, dashboards, reporting).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <p className="text-blue-400 font-semibold text-sm lg:text-base flex items-start">
                <FaCheckCircle className="mt-1 mr-2 flex-shrink-0" />
                <span>Agentic AI Testing validates UI/UX, workflows, and traditional application features</span>
              </p>
              <p className="text-purple-400 font-semibold text-sm lg:text-base flex items-start">
                <FaCheckCircle className="mt-1 mr-2 flex-shrink-0" />
                <span>Testing AI Systems ensures recommendation engine accuracy, prevents bias, and validates safety</span>
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
            <p className="text-gray-300 text-lg">Agentic AI Testing Platform</p>
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
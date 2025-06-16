import React from "react";
import "./Style2.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import CookieConsent from "./CookieConsent";
import { Link } from "react-router-dom";
import AgentHeroSection from "./HeroSection";

export default function Dashboard() {
  const FeatureCard = ({ title, description, icon }) => (
    <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="feature-icon text-purple-400 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-purple-200 mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );

  const StepCard = ({ step, title, description }) => (
    <div className="step-card bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="step-number bg-purple-600 text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
        {step}
      </div>
      <h4 className="step-title text-xl font-bold text-purple-200 mb-2">{title}</h4>
      <p className="step-description text-gray-300">{description}</p>
    </div>
  );

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <CookieConsent />
      
      {/* Hero Section */}
      <section className="hero">
        <AgentHeroSection />
      </section>

      {/* Marquee Section - Dark theme with purple accent */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 my-8 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl rounded-lg border border-purple-600/30 shadow-md">
        <p className="text-purple-300 text-sm md:text-base lg:text-lg font-semibold text-center animate-pulse">
          🚀 Unlock the power of AI in testing | 🌟 Seamless automate web, mobile, and API testing | 📈 Scale your testing with TesterAlly today!
        </p>
      </div>

      {/* Features Section */}
      <section id="features" className="features max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-3xl font-bold text-center mb-12 text-white">
          <span className="text-purple-400">Advanced</span> <span className="text-blue-300">AI-Driven Web Testing</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Intelligent Test Automation"
            description="Leverage advanced AI to generate and maintain test cases in simple, human-readable language. Streamline testing workflows by automating repetitive tasks, reducing manual effort, and ensuring higher accuracy in testing."
            icon="⚙️"
            
          />
          <FeatureCard
            title="Comprehensive Analytics"
            description="Get real-time insights into testing performance with detailed analytics and reporting tools. Identify bottlenecks, track progress, and make informed decisions to enhance the quality of your testing processes."
            icon="📊"
          />
          <FeatureCard
            title="Reliable Test Coverage"
            description="Perform robust testing with dynamic datasets to simulate real-world scenarios. Validate application behavior under various conditions to achieve higher reliability and enhanced test coverage."
            icon="🔒"
          />
          <FeatureCard
            title="AI-Driven Workflows"
            description="Accelerate testing with automated workflows powered by cutting-edge AI technology."
            icon="🤖"
          />
          <FeatureCard
            title="Smart Element Recognition"
            description="Identify and interact with UI elements through intelligent visual detection and precise coordinate mapping."
            icon="👁"
          />
          <FeatureCard
            title="Efficient Interaction Testing"
            description="Automate complex testing tasks, such as form interactions and multi-step operations, with precision and ease."
            icon="⚡"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-850">
        <h2 className="section-title text-3xl font-bold text-center mb-12 text-white">
          How Our <span className="text-purple-400">AI</span> <span className="text-blue-300">Testing Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StepCard
          step="1"
          title="Codeless Test Creation"
          description="Empower anyone to create test cases in simple, natural language, speeding up the test authoring process without the need for coding expertise."
        />
        <StepCard
          step="2"
          title="Test Execution Scheduling"
          description="Set up tests to run as frequently as needed, whenever you choose, using the flexible Execution Planner to automate your testing cycles."
        />
        <StepCard
          step="3"
          title="Comprehensive Test Reporting"
          description="Gather detailed insights from your test results, along with AI-generated suggestions to diagnose why a test may have failed, helping teams pinpoint issues efficiently."
        />
        </div>
      </section>

      {/* About Agent Section */}
      <section id="about-us" className="about-us max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-3xl font-bold text-center mb-8 text-white">
          About Us
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
        <p>
        TesterAlly is leading the charge in AI-powered test automation solutions. 
        Our mission is to empower development and QA teams to achieve impeccable software quality with unparalleled speed and accuracy. 
        Driven by innovation and a commitment to excellence, we are revolutionizing the testing process. With our cutting-edge platform, 
        we combine AI’s power with intuitive, codeless interfaces to simplify and accelerate testing across web, mobile, and API applications. 
        TesterAlly is your trusted partner for automating and enhancing the testing lifecycle, ensuring seamless delivery of high-quality software at scale.
        </p>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section id="blog" className="blog-highlights max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">From Our Blog</h2>
        <div className="blog-grid">
          <div className="blog-card">
            <h4>Crowd Intelligence – Its impact on the training of AI</h4>
            <p>
              Explore how AI is transforming the landscape of test automation
              and what it means for the future of software development. Discover
              the latest trends in AI and how they are revolutionizing software
              testing.
            </p>
            <button className="btn primary-btn" onClick={() => window.location.href = "https://www.crowd4test.com/blog/artificial-intelligence/crowd-intelligence-its-impact-on-the-training-of-ai/"} >Read More</button>
          </div>
          <div className="blog-card">
            <h4>Artificial Intelligence AI and Software Testing – The Scope</h4>
            <p>
              Learn essential strategies to ensure your application performs
              flawlessly across all browsers and devices. Learn how AI can help
              QA teams achieve faster and more accurate results.
            </p>
            <button className="btn primary-btn" onClick={() => window.location.href = "https://www.crowd4test.com/blog/software-testing/artificial-intelligence-ai-and-software-testing-the-scope/"} >Read More</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>
              "This platform has completely transformed our testing workflow.
              The AI capabilities are top-notch!"
            </p>
            <h4>- Jane Doe, Software Engineer</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Detailed reporting and secure testing have made our development
              process much smoother."
            </p>
            <h4>- John Smith, QA Lead</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">TesterAlly <span className="text-purple-400">AI Agent</span></h3>
              <p className="text-gray-300">Next-generation test automation with artificial intelligence</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/resources" className="text-gray-300 hover:text-purple-300 transition-colors">Resources</Link>
              <a href="#features" className="text-gray-300 hover:text-purple-300 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-purple-300 transition-colors">How it Works</a>
              <a href="#about-us" className="text-gray-300 hover:text-purple-300 transition-colors">About</a>
              <a href="#resources" className="text-gray-300 hover:text-purple-300 transition-colors">Resources</a>
            </div>
          </div>
          <hr className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">© 2024 TesterAlly AI Agent v2.0.1. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a 
                href="https://github.com/rangad123/TesterAlly-FE/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <FaGithub /> GitHub
              </a>
              <a 
                href="mailto:ai-support@testerally.com"
                className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <FaEnvelope /> Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React from "react";
import { useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUsers, FaRocket, FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-purple-400">TesterAlly</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Pioneering the future of AI-powered test automation to help teams deliver flawless software faster than ever before.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              At TesterAlly, we believe that exceptional software quality shouldn't come at the cost of speed or complexity. 
              Our mission is to democratize test automation through AI, making it accessible to every team member regardless 
              of their technical background.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're committed to revolutionizing how teams approach software testing by combining cutting-edge artificial 
              intelligence with intuitive, human-friendly interfaces that empower everyone to contribute to quality assurance.
            </p>
          </div>
          <div className="bg-gray-800 border border-purple-600/30 rounded-lg p-8">
            <div className="text-4xl text-purple-400 mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-4">Vision Statement</h3>
            <p className="text-gray-300">
              To become the world's leading AI-powered testing platform that enables every software team to achieve 
              perfect quality with zero compromise on delivery speed.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:transform hover:scale-105 hover:border-purple-500/50 transition-all duration-300">
              <FaBrain className="text-4xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-gray-300">Constantly pushing the boundaries of what's possible in AI-driven testing</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:transform hover:scale-105 hover:border-purple-500/50 transition-all duration-300">
              <FaUsers className="text-4xl text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Collaboration</h3>
              <p className="text-gray-300">Building tools that bring teams together and amplify collective intelligence</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:transform hover:scale-105 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-4xl text-emerald-400 mx-auto mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-3">Reliability</h3>
              <p className="text-gray-300">Ensuring every test is accurate, consistent, and trustworthy</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:transform hover:scale-105 hover:border-purple-500/50 transition-all duration-300">
              <FaRocket className="text-4xl text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Speed</h3>
              <p className="text-gray-300">Accelerating development cycles without compromising on quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
              JS
            </div>
            <h3 className="text-xl font-bold text-white mb-2">John Smith</h3>
            <p className="text-purple-400 mb-3">CEO & Founder</p>
            <p className="text-gray-300 text-sm">Former QA lead with 10+ years in test automation and AI</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
              AD
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Alice Davis</h3>
            <p className="text-purple-400 mb-3">CTO</p>
            <p className="text-gray-300 text-sm">AI researcher and engineer specializing in machine learning applications</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
              MJ
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Mike Johnson</h3>
            <p className="text-purple-400 mb-3">Head of Product</p>
            <p className="text-gray-300 text-sm">Product strategist with expertise in developer tools and UX design</p>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Join Our Team</h2>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and quality. 
              Join us in revolutionizing the future of software testing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">Senior AI Engineer</h3>
              <p className="text-purple-400 mb-3">Full-time • Remote</p>
              <p className="text-gray-300 mb-4">Build the next generation of AI-powered testing tools.</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                Apply Now
              </button>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">Frontend Developer</h3>
              <p className="text-purple-400 mb-3">Full-time • Hybrid</p>
              <p className="text-gray-300 mb-4">Create intuitive user experiences for our testing platform.</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                Apply Now
              </button>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">Product Manager</h3>
              <p className="text-purple-400 mb-3">Full-time • San Francisco</p>
              <p className="text-gray-300 mb-4">Drive product strategy and roadmap for our AI testing suite.</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section id="press" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">In the News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-2">TechCrunch Features TesterAlly</h3>
            <p className="text-purple-400 mb-3">December 2024</p>
            <p className="text-gray-300 mb-4">"Revolutionary AI testing platform changes how teams approach quality assurance."</p>
            <a href="about" className="text-purple-400 hover:text-purple-300 transition-colors">Read Article →</a>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-2">VentureBeat Interview</h3>
            <p className="text-purple-400 mb-3">November 2024</p>
            <p className="text-gray-300 mb-4">"CEO discusses the future of AI in software testing and development workflows."</p>
            <a href="about" className="text-purple-400 hover:text-purple-300 transition-colors">Read Article →</a>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-2">Forbes Technology Council</h3>
            <p className="text-purple-400 mb-3">October 2024</p>
            <p className="text-gray-300 mb-4">"Expert insights on democratizing test automation through artificial intelligence."</p>
            <a href="about" className="text-purple-400 hover:text-purple-300 transition-colors">Read Article →</a>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="bg-gray-900/50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="flex justify-center items-center text-center">
                <div className="flex items-center gap-3 mr-3">
                  <FaEnvelope className="text-purple-400" />
                  <span className="text-gray-300">ai-support@testerally.com</span>
                </div>
                <div className="flex items-center gap-3 mr-3">
                  <FaLinkedin className="text-purple-400" />
                  <span className="text-gray-300">linkedin.com/company/testerally</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaGithub className="text-purple-400" />
                  <span className="text-gray-300">github.com/testerally</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Ready to Transform Your Testing?</h4>
                <p className="text-gray-300 mb-6">
                  Join thousands of teams already using TesterAlly to deliver better software faster.
                </p>
                
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Send us a Message</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none resize-none"
                    placeholder="Tell us about your testing challenges..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">By the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
            <p className="text-gray-300">Tests Automated</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-300 mb-2">500+</div>
            <p className="text-gray-300">Happy Customers</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-emerald-400 mb-2">99.9%</div>
            <p className="text-gray-300">Uptime</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-amber-400 mb-2">75%</div>
            <p className="text-gray-300">Time Saved</p>
          </div>
        </div>
      </section>

      {/* Footer - Matching Dashboard Style with 3 Columns */}
      <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content - 3 Column Layout */}
          <div className="flex flex-wrap justify-between gap-12 mb-12">
            
            {/* About Section */}
            <div className="min-w-[250px] flex-1">
              <h3 className="text-xl font-bold text-purple-400 mb-6">About</h3>
              <div className="flex flex-col space-y-3">
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Our Story</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Team</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Careers</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Press</Link>
                <Link to="about-page" className="text-gray-300 hover:text-purple-300 transition-colors">Contact Us</Link>
              </div>
            </div>

            {/* Features Section */}
            <div className="min-w-[250px] flex-1">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Features</h3>
              <div className="flex flex-col space-y-3">
                <a href="features" className="text-gray-300 hover:text-purple-300 transition-colors">AI Test Automation</a>
                <a href="features" className="text-gray-300 hover:text-purple-300 transition-colors">Analytics & Reporting</a>
                <a href="features" className="text-gray-300 hover:text-purple-300 transition-colors">Test Coverage</a>
                <a href="features" className="text-gray-300 hover:text-purple-300 transition-colors">Smart Recognition</a>
                <a href="how-it-works" className="text-gray-300 hover:text-purple-300 transition-colors">How It Works</a>
              </div>
            </div>

            {/* Resources Section */}
            <div className="min-w-[250px] flex-1">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Resources</h3>
              <div className="flex flex-col space-y-3">
                <a href="blog" className="text-gray-300 hover:text-purple-300 transition-colors">Documentation</a>
                <a href="blog" className="text-gray-300 hover:text-purple-300 transition-colors">Blog</a>
                <a href="blog" className="text-gray-300 hover:text-purple-300 transition-colors">Tutorials</a>
                <a href="blog" className="text-gray-300 hover:text-purple-300 transition-colors">API Reference</a>
                <a href="blog" className="text-gray-300 hover:text-purple-300 transition-colors">Support Center</a>
              </div>
            </div>
          </div>

          {/* Brand Section */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">TesterAlly <span className="text-purple-400">AI Agent</span></h3>
            <p className="text-gray-300 text-lg">Next-generation test automation with artificial intelligence</p>
          </div>

          {/* Footer Bottom */}
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
};

export default AboutPage;
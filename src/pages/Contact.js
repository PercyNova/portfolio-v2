import React, { useState } from 'react';

function Contact() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      id: 'github',
      title: 'GitHub',
      subtitle: 'Check out my repositories',
      icon: '🐙',
      link: 'https://github.com/PercyNova',
      color: 'from-green-500 to-emerald-500',
      description: 'Explore my latest projects and contributions'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      subtitle: 'Professional network',
      icon: '💼',
      link: 'https://www.linkedin.com/in/percy-mkhabela-443445240/',
      color: 'from-emerald-500 to-teal-500',
      description: 'Connect with me professionally'
    },
    {
      id: 'email',
      title: 'Email',
      subtitle: 'Direct communication',
      icon: '✉️',
      link: 'cwengapercymkhabela@gmail.com',
      color: 'from-teal-500 to-cyan-500',
      description: 'Send me a message anytime'
    }
  ];

  const cardStyle = (isHovered, colorClass) => ({
    background: isHovered 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
    boxShadow: isHovered 
      ? '0 20px 40px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
      : '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    overflow: 'hidden',
    position: 'relative'
  });

  const formStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'white',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
          Let's <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Connect</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8 text-white">Get in Touch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method) => (
                <a
                  key={method.id}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="block group"
                  onMouseEnter={() => setHoveredCard(method.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={cardStyle(hoveredCard === method.id, method.color)}
                >
                  {/* Background gradient overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl mb-2">{method.icon}</div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 group-hover:text-gray-200 transition-colors">
                      {method.subtitle}
                    </p>
                    <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
                      {method.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-8 text-white">Send a Message</h2>
            <div style={formStyle}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-20"></div>
              
              <div onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    style={inputStyle}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                    required
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Send Message ✨
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Reply Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to start a conversation?</h3>
          <p className="text-gray-300 mb-6">Whether it's about a potential collaboration, a question about my work, or just to say hello.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">Open to opportunities</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">Remote friendly</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">Quick responder</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
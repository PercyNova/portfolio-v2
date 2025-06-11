import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PlaylistCard from '../components/molecules/PlaylistCard';
import SpotifyStyleProjectCard from '../components/SpotifyStyleProjectCard';
import githubService from '../services/githubService';
import '../styles/Home.css';

function Home() {
  const [projects, setProjects] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('recent');
  const [highlightedProject, setHighlightedProject] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Define categories
  const categories = [
    { id: 'recent', name: 'All', color: 'bg-spotify-green' },
    { id: 'web-dev', name: 'Web', color: 'bg-dark-navy' },
    { id: 'data-science', name: 'Data', color: 'bg-dark-navy' },
    { id: 'ai-ml', name: 'AI', color: 'bg-dark-navy' }
  ];

  useEffect(() => {
    const setGreetingMessage = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    setGreetingMessage();

    const fetchData = async () => {
      const response = await fetch('/data/projects.json');
      const data = await response.json();
      setProjects(data);

      const githubData = await githubService.getRepos();
      setCurrentProjects(githubData.slice(0, 8));
      
      const params = new URLSearchParams(location.search);
      const categoryParam = params.get('category');
      const projectParam = params.get('project');
      
      if (categoryParam) {
        let mappedCategory = 'recent';
        if (categoryParam === 'webdev') mappedCategory = 'web-dev';
        else if (categoryParam === 'dataAnalytics') mappedCategory = 'data-science';
        else if (categoryParam === 'cybersecurity') mappedCategory = 'ai-ml';
        
        setSelectedCategory(mappedCategory);
        
        if (projectParam && data) {
          const category = data.find(c => c.id === mappedCategory);
          if (category) {
            const project = category.projects.find(p => p.id === projectParam);
            if (project) {
              setHighlightedProject(project);
              setTimeout(() => {
                const element = document.getElementById(`project-${projectParam}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 500);
            }
          }
        }
      }
    };

    fetchData();
  }, [location]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setHighlightedProject(null);
    setDropdownOpen(false);
  };

  const filteredProjects = projects.reduce((acc, category) => {
    if (category.id === selectedCategory) {
      return acc.concat(category.projects);
    }
    return acc;
  }, []);

  const glossyCardStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    position: 'relative'
  };

  const highlightedStyle = {
    ...glossyCardStyle,
    boxShadow: '0 12px 48px 0 rgba(29, 185, 84, 0.4)',
    border: '2px solid #1DB954',
    transform: 'scale(1.03)'
  };

  // Custom dropdown styles for better mobile support
  const customDropdownStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '200px',
    marginBottom: '1.5rem'
  };

  const dropdownButtonStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: '#2a2a2a',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#2a2a2a',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    marginTop: '4px',
    zIndex: 1000,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  };

  const dropdownItemStyle = {
    padding: '12px 16px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontSize: '16px'
  };

  const activeItemStyle = {
    ...dropdownItemStyle,
    backgroundColor: '#1DB954',
    fontWeight: '600'
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 mx-4 sm:mx-6 my-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">{greeting}, Visitor</h1>
        
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Categories</h2>
          
          {/* Custom dropdown for better mobile support */}
          <div style={customDropdownStyle}>
            <button
              style={dropdownButtonStyle}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            >
              <span>{categories.find(cat => cat.id === selectedCategory)?.name || 'All'}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            {dropdownOpen && (
              <div style={dropdownMenuStyle}>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    style={selectedCategory === category.id ? activeItemStyle : dropdownItemStyle}
                    onClick={() => handleCategorySelect(category.id)}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.id) {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.id) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              id={`project-${project.id}`}
              className={`card p-4 hover:shadow-xl ${highlightedProject?.id === project.id ? 'animate-pulse-gentle' : ''}`}
              style={highlightedProject?.id === project.id ? highlightedStyle : glossyCardStyle}
            >
              {highlightedProject?.id === project.id ? (
                <SpotifyStyleProjectCard project={project} />
              ) : (
                <PlaylistCard
                  title={project.title}
                  description={project.description}
                  imageUrl={`src/assets/images/${project.id}.png`}
                />
              )}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
                  opacity: 0.5
                }}
              ></div>
            </div>
          ))}
        </div>
        </section>
        
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Current Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentProjects.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 sm:p-6 hover:shadow-xl hover:bg-white/20 group"
                style={glossyCardStyle}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-white">{repo.name}</h2>
                <p className="text-gray-200 text-sm sm:text-base">{repo.description}</p>
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
                    opacity: 0.5
                  }}
                ></div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
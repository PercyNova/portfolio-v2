import React, { useEffect, useState } from 'react';
import SpotifyStyleProjectCard from '../components/SpotifyStyleProjectCard';
import '../styles/SpotifyAnimations.css';

function ProjectsGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Get all projects or filter by category
  const getProjects = () => {
    if (activeCategory === 'all') {
      return categories.flatMap(category => category.projects);
    } else {
      const category = categories.find(cat => cat.id === activeCategory);
      return category ? category.projects : [];
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Nav Pills */}
      <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 mx-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all' 
              ? 'bg-green-500 text-black' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          All Projects
        </button>
        {categories.map(category => (
          <button 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 mx-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === category.id 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getProjects().map(project => (
          <SpotifyStyleProjectCard 
            key={project.id} 
            project={project} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsGrid;
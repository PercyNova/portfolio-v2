import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const maxDescriptionLength = 120;
  
  // Shortened description logic
  const shortDescription = project.description.length > maxDescriptionLength 
    ? `${project.description.substring(0, maxDescriptionLength)}...` 
    : project.description;
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
            {project.createdAt && (
              <div className="text-xs text-gray-300 mb-2">{project.createdAt}</div>
            )}
          </div>
          
          {/* Links */}
          <div className="flex space-x-2">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors p-1"
              >
                <ExternalLink size={20} />
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors p-1"
              >
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-200 mb-3">{shortDescription}</p>
        
        <Link 
          to={`/project/${project.id}`}
          className="inline-block text-primary hover:text-white text-sm font-medium transition-colors"
        >
          Read more
        </Link>
      </div>
      
      {/* Glossy effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
          opacity: 0.5
        }}
      />
    </div>
  );
}

export default ProjectCard;
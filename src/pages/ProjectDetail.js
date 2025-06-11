import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const allProjects = data.flatMap(cat => cat.projects || []);
        const selectedProject = allProjects.find(proj => proj.id === id);
        
        if (!selectedProject) {
          throw new Error('Project not found');
        }
        
        setProject(selectedProject);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-6 pt-16 pb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          {error || 'Project not found'}
        </h2>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-80 transition-all"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pt-16 pb-12">
      <div 
        className="mb-8 p-6 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{project.title}</h1>
            {project.createdAt && (
              <div className="text-gray-300 mb-4">Created: {project.createdAt}</div>
            )}
            <p className="text-gray-200 mb-8">{project.description}</p>
          </div>
          
          <div className="flex space-x-4">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
              >
                <Github size={18} className="mr-2" />
                View Code
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-80 transition-all"
              >
                <ExternalLink size={18} className="mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </div>
        
        <div className="mt-8 overflow-hidden rounded-lg h-96">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <Link 
        to="/" 
        className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Projects
      </Link>
    </div>
  );
}

export default ProjectDetail;
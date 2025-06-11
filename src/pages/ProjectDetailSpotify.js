import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Github, ExternalLink } from 'lucide-react';
import '../styles/SpotifyAnimations.css';

function ProjectDetailSpotify() {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
          className="inline-flex items-center px-4 py-2 rounded-full bg-green-500 text-black hover:bg-opacity-80 transition-all"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-12">
      <Link 
        to="/" 
        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all mb-8"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Projects
      </Link>
      
      {/* Spotify-style player layout */}
      <div 
        className="rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #111, #000)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Header / Cover Art Area */}
        <div 
          className="p-8 relative"
          style={{
            background: 'linear-gradient(to bottom, rgba(29, 185, 84, 0.3), #111)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Project Image */}
            <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 shadow-lg rounded-md overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Project Info */}
            <div className="text-center md:text-left">
              <div className="text-sm font-semibold text-white mb-2">PROJECT</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-300">
                {project.createdAt && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>Created: {project.createdAt}</span>
                  </div>
                )}
                
                <div className="hidden md:block text-gray-500">•</div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{project.techStack.length} technologies</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Playback Controls */}
          <div className="mt-8 flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md"
            >
              <div className="flex items-center space-x-1">
                <div className="w-1 bg-black animate-equalizer h-3"></div>
                <div className="w-1 bg-black animate-equalizer-2 h-4"></div>
                <div className="w-1 bg-black animate-equalizer h-2"></div>
                <div className="w-1 bg-black animate-equalizer-3 h-3"></div>
              </div>
            </div>
            
            <div className="flex gap-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-green-500 transition-colors"
                >
                  <Github size={24} />
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-green-500 transition-colors"
                >
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">About this project</h2>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>
          
          {/* Tech Stack Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {project.techStack.map((tech, index) => (
                <div 
                  key={index}
                  className="px-4 py-3 rounded-md flex items-center gap-3 hover:bg-gray-800 transition-colors cursor-default"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    {tech.charAt(0)}
                  </div>
                  <span className="text-gray-200">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailSpotify;
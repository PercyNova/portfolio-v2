import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import '../styles/Resume.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faReact,
  faNodeJs,
  faJs,
  faPython,
  faHtml5,
  faCss3Alt,
  faJava,
  faLinux
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faServer,
  faTable,
  faChartLine,
  faCode,
  faLaptopCode,
  faFileCode,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { techStackColors } from '../utils/techStackColors';
// Import pdf.js
import * as pdfjsLib from 'pdfjs-dist';
// Set the workerSrc property to the appropriate path
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';

function Resume() {
  // Categories matching resumeData.json
  const [activeField, setActiveField] = useState('all');
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfPreviews, setPdfPreviews] = useState([]);

  // Updated categories as requested
  const categories = [
    { id: 'all', name: 'General', color: 'bg-spotify-green' },
    { id: 'webdev', name: 'Web Development', color: 'bg-dark-navy' },
    { id: 'dataAnalytics', name: 'Data Analyst', color: 'bg-dark-navy' },
    { id: 'cybersecurity', name: 'Cybersecurity Specialist', color: 'bg-dark-navy' }
  ];

  // Function to render all PDF previews
  const loadPdfPreviews = async () => {
    const previews = [];
    
    for (const category of categories) {
      try {
        const pdfPath = `/pdfs/${category.id}-resume.pdf`;
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.5 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        previews.push({
          categoryId: category.id,
          dataUrl: canvas.toDataURL(),
          pdfPath: pdfPath
        });
      } catch (error) {
        console.error(`Error loading PDF for ${category.id}:`, error);
      }
    }
    
    setPdfPreviews(previews);
  };

  useEffect(() => {
    // Fetch resume data from the public directory
    Promise.all([
      fetch('/data/resumeData.json').then(res => {
        if (!res.ok) throw new Error('Failed to load resume data');
        return res.json();
      }),
      fetch('/data/projects.json').then(res => {
        if (!res.ok) throw new Error('Failed to load projects data');
        return res.json();
      })
    ])
      .then(([resumeData, projectsData]) => {
        setResumeData(resumeData);
        setProjectsData(projectsData);
        setLoading(false);
        
        // Load PDF previews after data is loaded
        loadPdfPreviews();
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFieldChange = (fieldId) => {
    setActiveField(fieldId);
  };

  const togglePdfView = () => {
    setIsPdfVisible(!isPdfVisible);
  };

  // FIX #1: Redirect to home page with appropriate parameters instead of projects page
  const handleProjectClick = (project, categoryId) => {
    // Navigate to home page with appropriate category selected
    window.location.href = `/?category=${categoryId}&project=${project.id}`;
  };

  // Map tech stack to font awesome icons
  const getTechIcon = (tech) => {
    const lowerTech = tech.toLowerCase();
    if (lowerTech.includes('react')) return faReact;
    if (lowerTech.includes('node')) return faNodeJs;
    if (lowerTech.includes('javascript')) return faJs;
    if (lowerTech.includes('python')) return faPython;
    if (lowerTech.includes('html')) return faHtml5;
    if (lowerTech.includes('css')) return faCss3Alt;
    if (lowerTech.includes('sql') || lowerTech.includes('database')) return faDatabase;
    if (lowerTech.includes('server')) return faServer;
    if (lowerTech.includes('tableau') || lowerTech.includes('power bi')) return faChartLine;
    if (lowerTech.includes('java')) return faJava;
    if (lowerTech.includes('linux') || lowerTech.includes('kali')) return faLinux;
    if (lowerTech.includes('jupyter')) return faFileCode;
    if (lowerTech.includes('security') || lowerTech.includes('metasploit')) return faShieldAlt;
    return faCode; // Default icon
  };

  // Function to get color contrast for text
  const getContrastColor = (bgColor) => {
    // For undefined or non-hex colors, return white
    if (!bgColor || !bgColor.startsWith('#')) return '#FFFFFF';
    
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // Filter projects based on active field
  const getRelevantProjects = () => {
    if (!projectsData) return [];
    
    let filteredProjects = [];
    
    if (activeField === 'all') {
      projectsData.forEach(category => {
        filteredProjects = [...filteredProjects, ...category.projects];
      });
    } else if (activeField === 'webdev') {
      const webDevCategory = projectsData.find(cat => cat.id === 'web-dev');
      if (webDevCategory) filteredProjects = webDevCategory.projects;
    } else if (activeField === 'dataAnalytics') {
      const dataCategory = projectsData.find(cat => cat.id === 'data-science');
      if (dataCategory) filteredProjects = dataCategory.projects;
    } else if (activeField === 'cybersecurity') {
      const securityCategory = projectsData.find(cat => cat.id === 'cybersecurity');
      if (securityCategory) filteredProjects = securityCategory.projects;
    }
    
    return filteredProjects;
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="resume-container">
        <div className="loading-spinner">
          <p>Loading resume data...</p>
        </div>
      </div>
    );
  }

  // Show error message if there was an error
  if (error || !resumeData) {
    return (
      <div className="resume-container">
        <div className="error-message">
          <p>Failed to load resume data: {error || 'Unknown error'}</p>
          <p>Please check the path to your JSON files</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-container">
      {/* Category selector (Spotify-style) */}
      <div className="category-selector">
        {categories.map((field) => (
          <button
            key={field.id}
            className={`category-button ${activeField === field.id ? 'bg-spotify-green' : 'bg-dark-navy'}`}
            onClick={() => handleFieldChange(field.id)}
          >
            {field.name}
          </button>
        ))}
      </div>

      <div className="resume-content">
        {/* Left side - Resume information (75%) */}
        <div className="resume-info" style={{ width: '100%' }}>
          <h1 className="resume-title">Professional Resume</h1>
          <h2 className="resume-subtitle">
            Specialized in {categories.find(f => f.id === activeField)?.name || 'All Fields'}
          </h2>
          
          {/* FIX #2: Split Technical Skills into Comfortable and Learning */}
          <div className="resume-section">
            <h3 className="section-title">Technical Skills</h3>
            
            {/* Comfortable Skills */}
            <h4 style={{ color: 'var(--spotify-white)', marginBottom: '0.75rem' }}>Comfortable With</h4>
            <div className="skills-container">
              {resumeData.skills[activeField]?.comfortable?.map((skill, index) => {
                const techColor = techStackColors[skill] || '#718096';
                const textColor = getContrastColor(techColor);
                const icon = getTechIcon(skill);
                
                return (
                  <span 
                    key={index} 
                    className="skill-badge" 
                    style={{
                      backgroundColor: techColor,
                      color: textColor
                    }}
                  >
                    {icon && (
                      <FontAwesomeIcon icon={icon} className="skill-icon" />
                    )}
                    {skill}
                  </span>
                );
              })}
            </div>
            
            {/* Learning Skills */}
            <h4 style={{ color: 'var(--spotify-white)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Learning</h4>
            <div className="skills-container">
              {resumeData.skills[activeField]?.learning?.map((skill, index) => {
                const techColor = techStackColors[skill] || '#718096';
                const textColor = getContrastColor(techColor);
                const icon = getTechIcon(skill);
                
                return (
                  <span 
                    key={index} 
                    className="skill-badge" 
                    style={{
                      backgroundColor: techColor,
                      color: textColor,
                      opacity: 0.8 // Slightly lighter to indicate "learning"
                    }}
                  >
                    {icon && (
                      <FontAwesomeIcon icon={icon} className="skill-icon" />
                    )}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
          
          {/* Soft Skills Section - Always visible across all categories */}
          <div className="resume-section">
            <h3 className="section-title">Soft Skills</h3>
            <div className="skills-container">
              {resumeData.softSkills.allskills.map((skill, index) => (
                <span key={index} className="skill-badge soft-skill">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* FIX #3: Reorder sections - Projects after Skills */}          
          {/* Relevant Projects Section */}
          <div className="resume-section">
            <h3 className="section-title">Relevant Projects</h3>
            <div className="projects-grid">
              {getRelevantProjects().map((project, index) => (
                <div 
                  key={index} 
                  className="project-card"
                  onClick={() => handleProjectClick(project, activeField)}
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="project-image" 
                  />
                  <div className="project-overlay">
                    <h4>{project.title}</h4>
                    <ExternalLink size={16} className="view-project-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education section - moved after projects */}
          <div className="resume-section">
            <h3 className="section-title">Education</h3>
            {resumeData.education.all.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.degree}</h4>
                <p className="school">{edu.school}</p>
                <p className="year">{edu.year}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Right side - Certificates (25%) */}
        <div className="certificates-section" style={{ width: '100%' }}>
          <h3 className="section-title">Certificates & Credentials</h3>
          <div className="certificates-grid">
            {resumeData.certificates[activeField]?.map((cert, index) => (
              <div key={index} className="certificate-card">
                <img src={cert.image} alt={cert.name} className="certificate-image" />
                <div className="certificate-info">
                  <h4>{cert.name}</h4>
                  <p>{cert.issuer}</p>
                  <p className="year">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
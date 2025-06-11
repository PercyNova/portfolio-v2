import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faReact,
  faNodeJs,
  faJs,
  faPython,
  faHtml5,
  faCss3Alt
} from '@fortawesome/free-brands-svg-icons';
import {
  faPlay,
  faPause,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { techStackColors } from '../utils/techStackColors';
import '../styles/SpotifyAnimations.css';

function SpotifyStyleProjectCard({ project }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const maxDescriptionLength = 80;

  const shortDescription =
    project.description.length > maxDescriptionLength
      ? `${project.description.substring(0, maxDescriptionLength)}...`
      : project.description;

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const getContrastColor = (bgColor) => {
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const getTechIcon = (tech) => {
    const lowerTech = tech.toLowerCase();
    if (lowerTech.includes('react')) return faReact;
    if (lowerTech.includes('node')) return faNodeJs;
    if (lowerTech.includes('javascript')) return faJs;
    if (lowerTech.includes('python')) return faPython;
    if (lowerTech.includes('html')) return faHtml5;
    if (lowerTech.includes('css')) return faCss3Alt;
    return null;
  };

  return (
    <div
      className={`relative rounded-lg transition-all duration-500 overflow-hidden ${
        isPlaying ? 'scale-105 z-10' : ''
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(15, 15, 15, 0.95))',
        boxShadow: isPlaying
          ? '0 12px 40px rgba(0, 0, 0, 0.5)'
          : '0 8px 16px rgba(0, 0, 0, 0.2)',
        minHeight: isPlaying ? '350px' : '300px',
        transition: 'all 0.5s ease'
      }}
      onClick={togglePlay}
    >
      {/* Image */}
      <div
        className={`transition-all duration-500 ${
          isPlaying ? 'h-24 sm:h-32 md:h-40' : 'h-28 sm:h-36 md:h-44'
        } w-full`}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col relative"
        style={{
          minHeight: 'calc(100% - 12rem)',
          padding: '3vw',
          paddingBottom: '5rem' // Make room for the bottom links/buttons
        }}
      >
        {/* Title & Description */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p
            className="text-gray-300 text-sm sm:text-base leading-relaxed"
            style={{ paddingRight: '2.5vw' }}
          >
            {isPlaying ? project.description : shortDescription}
          </p>
        </div>

        {/* Expanded View */}
        {isPlaying && (
          <div className="mt-2 flex-1 flex flex-col animate-fade-slide-in">
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-1 rounded-full my-2">
              <div
                className="bg-green-500 h-1 rounded-full animate-pulse"
                style={{ width: '70%' }}
              />
            </div>

            {/* Full Tech Stack - Limit height with scrolling on small screens */}
            <div className="mb-6 pb-12"> {/* Add bottom padding to ensure visibility above the link buttons */}
              <h4 className="text-gray-300 text-xs uppercase font-bold mb-1">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1 max-h-24 sm:max-h-none overflow-y-auto sm:overflow-visible">
                {project.techStack.map((tech, idx) => {
                  const techColor = techStackColors[tech] || '#718096';
                  const textColor = getContrastColor(techColor);
                  const icon = getTechIcon(tech);
                  return (
                    <span
                      key={idx}
                      className="rounded-full text-xs font-medium flex items-center"
                      style={{
                        backgroundColor: techColor,
                        color: textColor,
                        padding: '0.15rem 0.4rem',
                        margin: '0.125rem'
                      }}
                    >
                      {icon && (
                        <FontAwesomeIcon icon={icon} className="mr-1" />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed position for GitHub & Demo Links */}
      <div
        className="absolute bottom-2 left-3 flex items-center space-x-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="lg"
              className="text-gray-300 hover:text-green-500 transition-colors"
            />
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              size="lg"
              className="text-gray-300 hover:text-green-500 transition-colors"
            />
          </a>
        )}
      </div>

      {/* Play/Pause Button */}
      <div
        className="absolute bottom-2 right-3 z-20" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isPlaying ? 'bg-green-500' : 'bg-green-500 hover:bg-green-400'
          }`}
          style={{
            display: 'inline-flex',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className="text-black text-lg"
          />
        </button>
      </div>

      {/* Equalizer Animation */}
      {isPlaying && (
        <div
          className="absolute top-2 right-2 flex items-center space-x-1"
          style={{ zIndex: 90 }}
        >
          <div className="w-1 bg-green-500 animate-equalizer h-2" />
          <div className="w-1 bg-green-500 animate-equalizer-2 h-3" />
          <div className="w-1 bg-green-500 animate-equalizer h-1.5" />
          <div className="w-1 bg-green-500 animate-equalizer-3 h-2" />
        </div>
      )}
    </div>
  );
}

export default SpotifyStyleProjectCard;
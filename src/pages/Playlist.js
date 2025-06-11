import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectCard from '../components/molecules/ProjectCard'; // Correct path

function Playlist() {
  const { category } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from data
    const fetchData = async () => {
      const response = await fetch('/data/projects.json');
      const data = await response.json();
      const selectedCategory = data.find(cat => cat.id === category);
      setProjects(selectedCategory.projects || []);
    };

    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-6 pt-24 pb-12">
      <h1 className="text-4xl font-bold mb-8">Category: {category.replace('-', ' ').toUpperCase()}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} title={project.title} description={project.description} id={project.id} />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
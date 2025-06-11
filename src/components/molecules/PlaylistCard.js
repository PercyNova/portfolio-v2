import React from 'react';
import { Link } from 'react-router-dom';

function PlaylistCard({ title, description, imageUrl }) {
  return (
    <div className="relative w-40 h-40 mx-2 mb-4">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
        <h2 className="text-white font-semibold text-center">{title}</h2>
        <p className="text-white text-center mt-2">{description}</p>
      </div>
    </div>
  );
}

export default PlaylistCard;
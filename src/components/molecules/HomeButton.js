import React from 'react';
import { Link } from 'react-router-dom';

const logoUrl = '/images/logo.png';

function HomeButton() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src={logoUrl} alt="Logo" className="w-8 h-8" />
    </Link>
  );
}

export default HomeButton;

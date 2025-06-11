import React from 'react';
import { Link } from 'react-router-dom';
import HomeButton from '../molecules/HomeButton';
import ProfileIcon from '../molecules/ProfileIcon';

function Header({ onSearch }) {
  return (
    <header 
      className="fixed w-full py-2 sm:py-4 px-3 sm:px-6 flex justify-between items-center z-50 mb-4 sm:mb-8 md:mb-[1vw]" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)' }}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <HomeButton />
        <span className="font-bold text-lg sm:text-xl hidden md:inline">Portfolio</span>
      </div>
      
      <div className="flex items-center">
        <ProfileIcon />
      </div>
    </header>
  );
}

export default Header;
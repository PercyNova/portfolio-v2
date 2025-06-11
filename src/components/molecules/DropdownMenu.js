// src/components/molecules/DropdownMenu.js

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu({ closeDropdown }) {
  const dropdownRef = useRef(null); // Create a reference to the dropdown

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown(); // Close the dropdown if clicked outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, [closeDropdown]);

  return (
    <div 
      ref={dropdownRef} // Attach the ref to the dropdown
      className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg overflow-hidden z-10"
    >
      <Link to="/about" onClick={closeDropdown} className="block px-4 py-2 text-white hover:bg-gray-700">
        About Me
      </Link>
      <Link to="/resume" onClick={closeDropdown} className="block px-4 py-2 text-white hover:bg-gray-700">
        Resume
      </Link>
      <Link to="/contact" onClick={closeDropdown} className="block px-4 py-2 text-white hover:bg-gray-700">
        Contact Me
      </Link>
    </div>
  );
}

export default DropdownMenu;

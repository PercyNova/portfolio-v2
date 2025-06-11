import React, { useState } from 'react';
import DropdownMenu from '../molecules/DropdownMenu'; // Import DropdownMenu

function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Use public image path (no import)
  const profilePicUrl = process.env.PUBLIC_URL + '/images/profile-pic.jpeg';

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src={profilePicUrl}
          alt="Profile"
          className="w-12 h-12 rounded-full border-[7px] border-[#ffffff34] object-cover"
        />
      </button>
      {isOpen && <DropdownMenu closeDropdown={closeDropdown} />}
    </div>
  );
}

export default ProfileIcon;

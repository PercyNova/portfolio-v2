import React from 'react';

function Input({ className, ...props }) {
  return (
    <input
      className={`text-white placeholder-gray-400 ${className}`}
      {...props}
    />
  );
}

export default Input;
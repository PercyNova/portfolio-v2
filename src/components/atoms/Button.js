import React from 'react';

function Button({ children, className, ...props }) {
  return (
    <button
      className={`hover:text-green-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
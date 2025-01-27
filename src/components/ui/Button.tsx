import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: 'solid' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled = false, className = '', variant = 'solid' }) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const solidStyles = 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500';
  const outlineStyles = 'text-blue-500 border border-blue-500 hover:bg-blue-50 focus:ring-blue-500';

  const variantStyles = variant === 'outline' ? outlineStyles : solidStyles;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
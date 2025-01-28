import React from 'react';

interface HeaderProps {
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`bg-gray-800 border border-gray-600 shadow-lg p-6 ${className}`}>
      <h1 className="text-2xl font-bold text-white text-center">
        India&apos;s AI Community
      </h1>
    </header>
  );
};

export default Header;
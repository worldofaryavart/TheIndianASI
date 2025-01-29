import React from 'react';

interface SidebarPanelProps {
  className?: string;
}
const SidebarPanel: React.FC<SidebarPanelProps> = ({ className }) => {
  return (
    <div className={`${className} bg-gray-800 border-r border-gray-600 w-60 h-screen p-3`}>
      <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
        <span className="ml-3">Home</span>
      </div>
      <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
        <span className="ml-3">Projects</span>
      </div>
      <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
        <span className="ml-3">Explore</span>
      </div>
      <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
        <span className="ml-3">Library</span>
      </div>
      <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
        <span className="ml-3">History</span>
      </div>
    </div>
  );
};

export default SidebarPanel;

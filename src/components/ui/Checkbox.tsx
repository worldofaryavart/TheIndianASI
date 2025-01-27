import React from 'react';

interface CheckboxProps {
  id: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, className }) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={className}
    />
  );
};

export default Checkbox;
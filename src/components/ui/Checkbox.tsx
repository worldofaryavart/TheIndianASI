import React from 'react';

interface CheckboxProps {
  id: string;
  className?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, className, checked, onChange }) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={className}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;
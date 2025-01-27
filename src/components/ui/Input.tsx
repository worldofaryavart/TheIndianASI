import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, type, className, ...rest }) => {
  return (
    <input
      id={id}
      type={type}
      className={className}
      {...rest}
    />
  );
};

export default Input;
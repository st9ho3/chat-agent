import React from 'react';
import { ButtonProps } from '../../../../types/context';

const Button = ({ text, action }: ButtonProps) => {
  return (
    <button
      onClick={action}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-md font-medium text-gray-800 transition-colors hover:bg-gray-200 cursor-auto "
    >
      {text}
    </button>
  );
};

export default Button;
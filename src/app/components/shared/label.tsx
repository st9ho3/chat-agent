import React from 'react';



const Label = ({ text, type }: {text: string, type: "low" | "medium" | "high"}) => {
 
  const baseStyles = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-sm font-medium';

  // This explicit mapping ensures the full class strings are in the file,
  // making them easy for Tailwind v4 to detect without any config.
  const typeStyles = {
    low:    'bg-red-300/30 text-red-400',
    medium: 'bg-blue-300/30 text-blue-400',
    high:   'bg-green-300/30 text-green-400',
  };
  const styleClass = typeStyles[type]
  

  return (
    <div className={`
      inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-sm font-medium
      ${typeStyles[type]}
      }`}>
      <span>{text}</span>
    </div>
  );
};

export default Label
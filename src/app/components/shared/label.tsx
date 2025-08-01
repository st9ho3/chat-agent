import React from 'react';
import { Bug, Rocket, Bolt } from 'lucide-react'; // Assuming lucide-react is installed



const Label = ({ text, type = 'low' }: {text: string, type: "low" | "medium" | "high"}) => {
 
  const colorClasses = {
    low: 'bg-red-300/30 text-red-400',     
    medium: 'bg-blue-300/30 text-blue-400', 
    high: 'bg-green-300/30 text-green-400',   
  };



  return (
    <div className={`
      inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-sm font-medium
      ${colorClasses[type] || colorClasses.medium} // Fallback to bug type if type is not recognized
    `}>
      <span>{text}</span>
    </div>
  );
};

export default Label
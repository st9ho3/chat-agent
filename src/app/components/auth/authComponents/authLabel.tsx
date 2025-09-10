import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * A styled label component for form inputs.
 */
const Label = ({ className, ...props }: LabelProps) => {
    const baseClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
    
    // Simple class merger
    const mergedClasses = `${baseClasses} ${className || ''}`;

    return <label className={mergedClasses.trim()} {...props} />;
};


export default Label;

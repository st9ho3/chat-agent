import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * @default 'default'
   */
  variant?: 'default' | 'outline';
}

/**
 * A customizable button component with pre-defined styles.
 */
const Button = ({ children, variant = 'default', className, ...props }: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantClasses = variant === 'default'
        ? "bg-gray-900 text-white hover:bg-gray-800"
        : "border border-gray-300 bg-transparent hover:bg-gray-100";
    
    // Simple class merger
    const mergedClasses = `w-full h-10 px-4 py-2 ${baseClasses} ${variantClasses} ${className || ''}`;

    return (
        <button className={mergedClasses.trim()} {...props}>
            {children}
        </button>
    );
};

export default Button;

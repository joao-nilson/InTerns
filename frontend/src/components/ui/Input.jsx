import React from 'react';

export const Input = ({ 
    icon: Icon, 
    type = "text", 
    placeholder, 
    label, 
    value, 
    onChange, 
    textarea = false, 
    rows = 3,
    error,
    ...props
}) => {
    const borderColor = error 
        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
        : "border-gray-300 focus:border-[#223e8c] focus:ring-[#223e8c]";
    
    const baseClasses = `block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border rounded-lg text-sm bg-white transition-colors focus:ring-2 focus:outline-none ${borderColor}`;

    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative">
                {Icon && (
                    <div className={`absolute left-0 pl-3 flex items-center pointer-events-none ${error ? 'text-red-400' : 'text-gray-400'} ${textarea ? 'top-3' : 'inset-y-0'}`}>
                        <Icon size={18} />
                    </div>
                )}
                {textarea ? (
                    <textarea
                        {...props}
                        rows={rows}
                        className={baseClasses}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                ) : (
                    <input
                        {...props}
                        type={type}
                        className={baseClasses}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};
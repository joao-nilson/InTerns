import React from 'react';

export const Input = ({ icon: Icon, type = "text", placeholder, label, value, onChange, textarea = false, rows = 3 }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <div className="relative">
            {Icon && (
                <div className={`absolute left-0 pl-3 flex items-center pointer-events-none text-gray-400 ${textarea ? 'top-3' : 'inset-y-0'}`}>
                <Icon size={18} />
                </div>
            )}
            {textarea ? (
            <textarea
                rows={rows}
                className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            ) : (
                <input
                    type={type}
                    className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    </div>
);
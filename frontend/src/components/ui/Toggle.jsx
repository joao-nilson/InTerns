import React from 'react';
import { User, Building2 } from 'lucide-react';

export const UserTypeToggle = ({ userType, setUserType }) => (
    <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
        <button
            type="button"
            onClick={() => setUserType('candidate')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                userType === 'candidate'
                ? 'bg-white text-[#223e8c] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
        >
        <User size={16} />
            Sou Candidato
        </button>
        <button
            type="button"
            onClick={() => setUserType('company')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                userType === 'company'
                ? 'bg-white text-[#223e8c] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
        >
        <Building2 size={16} />
        Sou Empresa
        </button>
    </div>
);
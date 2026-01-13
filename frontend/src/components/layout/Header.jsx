import React from 'react';
import { Briefcase, UserCircle, Plus } from 'lucide-react';

export const Header = ({ currentUser, onNavigate, onLogout, isHome }) => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <button 
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition-opacity"
                >
                    <div className="bg-[#223e8c] p-1.5 rounded-lg">
                        <Briefcase className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-[#223e8c]">
                        InTerns
                    </span>
                </button>

                <div className="flex items-center gap-4">
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden md:inline">
                            Olá, <strong>{currentUser.name}</strong>
                        </span>
                
                        {currentUser.type === 'company' && (
                            <button 
                                onClick={() => onNavigate('create-job')}
                                className="flex items-center gap-2 bg-[#223e8c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors"
                            >
                            <Plus size={18} />
                            <span className="hidden md:inline">Criar Vaga</span>
                            </button>
                        )}

                        <button 
                            onClick={onLogout}
                            className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
                        >
                            Sair
                        </button>
                </div>
                ) : (
                    isHome ? (
                        <button 
                            onClick={() => onNavigate('login')}
                            className="flex items-center gap-2 bg-[#223e8c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors"
                        >
                        <UserCircle size={18} />
                        <span>Entrar</span>
                        </button>
                    ) : (
                        <button 
                            onClick={() => onNavigate('home')}
                            className="text-sm font-bold text-gray-500 hover:text-[#223e8c] flex items-center gap-1"
                        >
                            Voltar para Vagas
                            </button>
                        )
                    )}
                </div>
            </div>
        </header>
    );
};
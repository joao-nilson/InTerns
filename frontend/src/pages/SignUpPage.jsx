import React, { useState } from 'react';
import { Mail, Lock, User, Building2, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { UserTypeToggle } from '../components/ui/Toggle';

export const SignUpPage = ({ onNavigate }) => {
    const [userType, setUserType] = useState('candidate');

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-[#223e8c]">
                        Crie sua conta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Junte-se ao InTerns e {userType === 'candidate' ? 'encontre seu estágio ideal' : 'contrate os melhores talentos'}.
                    </p>
                </div>

                <UserTypeToggle userType={userType} setUserType={setUserType} />

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <Input 
                        icon={userType === 'candidate' ? User : Building2} 
                        type="text" 
                        label={userType === 'candidate' ? "Nome Completo" : "Nome da Empresa"} 
                        placeholder={userType === 'candidate' ? "Ex: João Silva" : "Ex: Tech Solutions Ltda"} 
                    />

                    <Input 
                        icon={Mail} 
                        type="email" 
                        label="E-mail Corporativo ou Pessoal" 
                        placeholder={userType === 'candidate' ? "joaosilva@email.com" : "rh@empresa.com"} 
                    />

                    <Input 
                        icon={Lock} 
                        type="password" 
                        label="Senha" 
                        placeholder="••••••••" 
                    />

                    <Input 
                        icon={CheckCircle} 
                        type="password" 
                        label="Confirmar Senha" 
                        placeholder="••••••••" 
                    />

                    <div className="pt-2">
                        <button className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] transition-colors shadow-md hover:shadow-lg">
                            Criar Conta
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Já possui conta?{' '}
                            <button 
                                type="button"
                                onClick={() => onNavigate('login')}
                                className="font-bold text-[#223e8c] hover:text-[#1a2f6b] transition-colors"
                            >
                                Faça login
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
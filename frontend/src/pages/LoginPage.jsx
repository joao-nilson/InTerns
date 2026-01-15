import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { UserTypeToggle } from '../components/ui/Toggle';

export const LoginPage = ({ onNavigate, onLogin }) => {
    const [userType, setUserType] = useState('candidate');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Autenticacao mock, TODO: Autenticacao backend
        onLogin({ 
            type: userType, 
            name: userType === 'candidate' ? 'Aluno Teste' : 'TechVision Solutions',
            email: email 
        });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-[#223e8c]">
                        Bem-vindo de volta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Acesse sua conta para gerenciar suas {userType === 'candidate' ? 'candidaturas' : 'vagas'}.
                    </p>
                </div>

                <UserTypeToggle userType={userType} setUserType={setUserType} />

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input 
                            icon={Mail} 
                            type="email" 
                            label="E-mail" 
                            placeholder={userType === 'candidate' ? "seu.email@aluno.com" : "rh@empresa.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            icon={Lock} 
                            type="password" 
                            label="Senha" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="h-4 w-4 text-[#223e8c] focus:ring-[#223e8c] border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-900">Lembrar-me</label>
                        </div>
                        <a href="#" className="font-medium text-[#223e8c] hover:text-[#1a2f6b]">
                            Esqueceu a senha?
                        </a>
                    </div>

                    <button 
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#223e8c] transition-colors"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <Lock size={18} className="text-blue-300 group-hover:text-white transition-colors" />
                        </span>
                        Entrar
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Ainda não tem conta?{' '}
                            <button 
                                type="button"
                                onClick={() => onNavigate('signup')}
                                className="font-bold text-[#223e8c] hover:text-[#1a2f6b] transition-colors"
                            >
                                Cadastre-se gratuitamente
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { UserTypeToggle } from '../components/ui/Toggle';
import { api } from '../api';

export const LoginPage = ({ onNavigate, onLogin }) => {
    const [userType, setUserType] = useState('candidate');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await api.login(email, password);
            if (result.user) {
                onLogin(result.user);
            }
        } catch (err) {
            console.warn("API falhou ou backend offline, usando fallback local para teste.");
            // Fallback para manter o app funcional sem backend, ai vai no mock mesmo
            onLogin({ 
                type: userType, 
                name: userType === 'candidate' ? 'Aluno (Modo Offline)' : 'Empresa (Modo Offline)',
                email: email 
            });
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-[#223e8c]">Bem-vindo de volta</h2>
                </div>

                <UserTypeToggle userType={userType} setUserType={setUserType} />
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input icon={Mail} type="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input icon={Lock} type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] transition-colors">
                        Entrar
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Ainda não tem conta?{' '}
                            <button type="button" onClick={() => onNavigate('signup')} className="font-bold text-[#223e8c]">
                                Cadastre-se
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
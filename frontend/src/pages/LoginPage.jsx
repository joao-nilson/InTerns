import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { UserTypeToggle } from '../components/ui/Toggle';
import { api } from '../api';
import { validateEmail } from '../utils';

export const LoginPage = ({ onNavigate, onLogin }) => {
    const [userType, setUserType] = useState('candidate');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailError, setEmailError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError('');
        setGeneralError('');

        if (!validateEmail(email)) {
            setEmailError('Por favor, insira um e-mail válido.');
            return;
        }
        if (!password) {
            setGeneralError('Por favor, insira sua senha.');
            return;
        }

        setLoading(true);
        
        let result;

        try {
            result = await api.login(email, password);
            if (result.user && result.user.type !== userType) {
                const tipoCorreto = result.user.type === 'company' ? 'Empresa' : 'Candidato';
                const tipoSelecionado = userType === 'company' ? 'Empresa' : 'Candidato';
                
                setGeneralError(`Esta é uma conta  ${tipoCorreto}, mas você está tentando entrar como ${tipoSelecionado}. Por favor, troque a opção acima.`);
                
                setLoading(false);
                return;
            }

            if (result.user) {
                onLogin(result.user);
            }
        } catch (err) {
            console.error(err);
            if (err.message && (err.message.includes('401') || err.message.includes('400') || err.message.includes('Auth failed'))) {
                setGeneralError('E-mail ou senha incorretos.');
            } else {
                setGeneralError('Erro ao conectar ao servidor. Tente mais tarde.');
            }
        } finally {
            if (!result?.user || result?.user.type !== userType) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-[#223e8c]">Bem-vindo de volta</h2>
                </div>

                <UserTypeToggle userType={userType} setUserType={setUserType} />
                
                {generalError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        {generalError}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <Input 
                            icon={Mail} 
                            type="email" 
                            label="E-mail" 
                            placeholder={userType == 'company' ? "rh@empresa.com" : "joaosilva@email.com"}
                            value={email} 
                            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                            error={emailError}
                        />
                        <Input 
                            icon={Lock} 
                            type="password" 
                            label="Senha" 
                            placeholder="Senha"
                            value={password} 
                            onChange={(e) => { setPassword(e.target.value); setGeneralError(''); }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
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
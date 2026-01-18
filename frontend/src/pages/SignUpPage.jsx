import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { UserTypeToggle } from '../components/ui/Toggle';
import { api } from '../api';

export const SignUpPage = ({ onNavigate, onSignupSuccess }) => {
    const [userType, setUserType] = useState('candidate');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        phone: '', location: '', bio: '',
        companySize: '', industry: '', website: '', taxId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) return setError('Nome é obrigatório');
        if (!formData.email.trim()) return setError('Email é obrigatório');
        if (!formData.password) return setError('Senha é obrigatória');
        if (formData.password !== formData.confirmPassword) return setError('As senhas não coincidem');
        return true;
    };

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let result;
            if (userType === 'candidate') {
                result = await api.signupCandidate({
                    name: formData.name, email: formData.email, password: formData.password,
                    phone: formData.phone, location: formData.location, bio: formData.bio
                });
            } else {
                result = await api.signupCompany({
                    name: formData.name, email: formData.email, password: formData.password,
                    phone: formData.phone, location: formData.location, bio: formData.bio,
                    companySize: formData.companySize, industry: formData.industry,
                    website: formData.website, taxId: formData.taxId
                });
            }

            setSuccess(true);
            setTimeout(() => {
                if (onSignupSuccess) onSignupSuccess(result.user);
            }, 2000);
            
        } catch (err) {
            setError(err.message || 'Erro ao criar conta.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Conta criada!</h2>
                    <p className="text-gray-600">Redirecionando para a página inicial...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-[#223e8c]">Criar Conta</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {userType === 'candidate' ? 'Encontre seu estágio ideal' : 'Contrate talentos'}
                    </p>
                </div>

                <UserTypeToggle userType={userType} setUserType={setUserType} />

                {/* Indicador de Passos */}
                <div className="flex items-center justify-between mb-6 px-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-[#223e8c] text-white' : 'bg-green-100 text-green-700'}`}>1</div>
                    </div>
                    <div className="h-px w-full bg-gray-200 mx-4"></div>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-[#223e8c] text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                    </div>
                </div>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                        <>
                            <input name="name" placeholder="Nome Completo" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                                <input name="confirmPassword" type="password" placeholder="Confirmar" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                            </div>
                            <button type="button" onClick={handleNextStep} className="w-full py-3 bg-[#223e8c] text-white font-bold rounded-lg hover:bg-[#1a2f6b]">Próximo</button>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                                <input name="location" placeholder="Cidade/UF" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                            </div>
                            
                            <textarea name="bio" rows="3" placeholder="Sobre..." value={formData.bio} onChange={handleChange} className="w-full p-3 border rounded-lg" />

                            {userType === 'company' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="website" placeholder="Site" value={formData.website} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                                    <input name="taxId" placeholder="CNPJ" value={formData.taxId} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 font-bold rounded-lg">Voltar</button>
                                <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#223e8c] text-white font-bold rounded-lg hover:bg-[#1a2f6b]">
                                    {loading ? 'Criando...' : 'Finalizar'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};
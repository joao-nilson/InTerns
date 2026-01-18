import React, { useState } from 'react';
import { CheckCircle, User, Mail, Lock, Phone, MapPin, Globe, FileText } from 'lucide-react'; // Adicionei ícones para melhor UX
import { Input } from '../components/ui/Input';
import { UserTypeToggle } from '../components/ui/Toggle';
import { api } from '../api';
import { validateEmail, validatePassword, validatePhone, validateCNPJ} from '../utils';

export const SignUpPage = ({ onNavigate, onSignupSuccess }) => {
    const [userType, setUserType] = useState('candidate');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        phone: '', location: '', bio: '',
        companySize: '', industry: '', website: '', taxId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
        
        if (!formData.email.trim()) {
            newErrors.email = "E-mail é obrigatório.";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Formato de e-mail inválido.";
        }

        const passCheck = validatePassword(formData.password);
        if (!passCheck.isValid) {
            newErrors.password = passCheck.message;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = "Formato inválido. Use (DD) 99999-9999.";
        }

        if (userType === 'company') {
            if (!formData.taxId) {
                newErrors.taxId = "CNPJ é obrigatório para empresas.";
            } else if (!validateCNPJ(formData.taxId)) {
                newErrors.taxId = "CNPJ inválido. Use o formato 00.000.000/0001-00";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2);
            setGeneralError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateStep2()) return;

        setLoading(true);
        setGeneralError('');

        const cleanData = (data) => {
            return Object.fromEntries(
                Object.entries(data).filter(([_, v]) => v !== '' && v !== null)
            );
        };

        try {
            let result;
            const commonData = {
                name: formData.name, email: formData.email, password: formData.password,
                phone: formData.phone, location: formData.location, bio: formData.bio
            };

            if (userType === 'candidate') {
                result = await api.signupCandidate(cleanData(commonData));
            } else {
                result = await api.signupCompany(cleanData({
                    ...commonData,
                    companySize: formData.companySize, industry: formData.industry,
                    website: formData.website, taxId: formData.taxId
                }));
            }

            setSuccess(true);
            setTimeout(() => {
                if (onSignupSuccess) onSignupSuccess(result.user);
            }, 2000);
            
        } catch (err) {
            const msg = err.message || '';
            if (msg.includes('email')) {
                setErrors({ email: 'Este e-mail já está em uso.' });
            } else {
                setGeneralError('Ocorreu um erro ao criar a conta. Tente novamente.');
            }
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
                    <p className="text-gray-600">Redirecionando...</p>
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

                <div className="flex items-center justify-between mb-6 px-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step === 1 ? 'bg-[#223e8c] text-white' : 'bg-green-100 text-green-700'}`}>1</div>
                        <span className="text-xs font-medium text-gray-500">Acesso</span>
                    </div>
                    <div className="h-px w-full bg-gray-200 mx-4"></div>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step === 2 ? 'bg-[#223e8c] text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                        <span className="text-xs font-medium text-gray-500">Perfil</span>
                    </div>
                </div>

                {generalError && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">{generalError}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                        <>
                            {userType == 'company' 
                                ? <Input 
                                        icon={User} name="name" placeholder="Nome Fantasia" label="Nome"
                                        value={formData.name} onChange={handleChange} error={errors.name} 
                                    /> 
                                : <Input 
                                    icon={User} name="name" placeholder="Nome Completo" label="Nome"
                                    value={formData.name} onChange={handleChange} error={errors.name} 
                                />
                            }
                            
                            <Input 
                                icon={Mail} type="email" name="email" placeholder="Email" label="E-mail"
                                value={formData.email} onChange={handleChange} error={errors.email} 
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input 
                                    icon={Lock} type="password" name="password" placeholder="Senha" label="Senha"
                                    value={formData.password} onChange={handleChange} error={errors.password} 
                                />
                                <Input 
                                    icon={CheckCircle} type="password" name="confirmPassword" placeholder="Confirmar" label="Repetir Senha"
                                    value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} 
                                />
                            </div>
                            <button type="button" onClick={handleNextStep} className="w-full py-3 bg-[#223e8c] text-white font-bold rounded-lg hover:bg-[#1a2f6b] transition-colors shadow-md">
                                Próximo: Perfil
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input 
                                    icon={Phone} name="phone" placeholder="(99) 99999-9999" label="Telefone"
                                    value={formData.phone} onChange={handleChange} error={errors.phone} 
                                />
                                <Input 
                                    icon={MapPin} name="location" placeholder="Cidade/UF" label="Localização"
                                    value={formData.location} onChange={handleChange} 
                                />
                            </div>
                            
                            {userType == 'company' 
                                    ?  <Input 
                                            textarea rows={3} icon={FileText} name="bio" placeholder="Conte um pouco sobre sua empresa..." label="Sobre"
                                            value={formData.bio} onChange={handleChange} 
                                        />
                                    :  <Input 
                                            textarea rows={3} icon={FileText} name="bio" placeholder="Conte um pouco sobre você..." label="Sobre"
                                            value={formData.bio} onChange={handleChange} 
                                        />
                                }

                            {userType === 'company' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input icon={Globe} name="website" placeholder="https://" label="Site" value={formData.website} onChange={handleChange} />
                                    <Input icon={FileText} name="taxId" placeholder="00.000.000/0001-00" label="CNPJ" value={formData.taxId} onChange={handleChange} error={errors.taxId} />
                                </div>
                            )}

                            <div className="flex gap-4 pt-2">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                    Voltar
                                </button>
                                <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#223e8c] text-white font-bold rounded-lg hover:bg-[#1a2f6b] transition-colors shadow-md disabled:opacity-70">
                                    {loading ? 'Criando...' : 'Finalizar Cadastro'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};
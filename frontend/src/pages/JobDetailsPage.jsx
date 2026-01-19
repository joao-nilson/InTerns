import React from 'react';
import { Building2, MapPin, Clock, Briefcase, CheckCircle, DollarSign, ArrowLeft, Mail } from 'lucide-react';
import { Tag } from '../components/ui/Tag';

export const JobDetailsPage = ({ vaga, onBack }) => {
    console.log("Dados da vaga recebidos na Detalhes:", vaga);
    if (!vaga) return null;

    const handleApplyClick = () => {
        const emailDestino = vaga.contactEmail || "vagas@interns.com.br";
        const assunto = `InTerns: Candidato à vaga ${vaga.title}`;
        const corpo = "*Anexe seu currículo aqui*";

        const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

        window.location.href = mailtoLink;
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-[#223e8c] font-medium mb-6 transition-colors"
            >
            <ArrowLeft size={20} />
                Voltar para vagas
            </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header da Vaga */}
            <div className="p-8 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#223e8c] mb-2">
                            {vaga.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm md:text-base">
                            <div className="flex items-center gap-1.5">
                                <Building2 size={18} className="text-[#3a8acf]" />
                                <span className="font-semibold">{vaga.company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Mail size={18} className="text-[#3a8acf]" />
                                <span>{vaga.contactEmail}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={18} className="text-[#3a8acf]" />
                                <span>{vaga.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={18} className="text-[#3a8acf]" />
                                <span>{vaga.regime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Vaga Aberta
                        </span>
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Briefcase size={20} className="text-[#223e8c]" />
                            Descrição da Vaga
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{vaga.description}</p>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <CheckCircle size={20} className="text-[#223e8c]" />
                            Requisitos
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{vaga.requirements}</p>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <DollarSign size={20} className="text-[#223e8c]" />
                            Benefícios
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{vaga.benefits || "Compatível com mercado"}</p>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Tecnologias</h4>
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Obrigatórios</p>
                            <div className="flex flex-wrap gap-2">
                                {vaga.tags.filter(t => t.type === 'mandatory').map(tag => (
                                    <Tag key={tag.id} name={tag.name} type={tag.type} size="large" />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-2">Diferenciais</p>
                            <div className="flex flex-wrap gap-2">
                                {vaga.tags.filter(t => t.type === 'desirable').map(tag => (
                                    <Tag key={tag.id} name={tag.name} type={tag.type} size="large" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-[#f0f4ff] rounded-xl border border-blue-100 text-center">
                        <button onClick={handleApplyClick} className="w-full bg-[#223e8c] text-white py-3 rounded-lg text-base font-bold hover:bg-[#1a2f6b] transition-all shadow-lg hover:shadow-xl">
                            Inscrever-se Agora</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
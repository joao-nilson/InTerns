import React, { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Building2, MapPin, CheckCircle, DollarSign, Plus, Save, Pencil, Mail } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Tag } from '../components/ui/Tag';

export const CreateJobPage = ({ onBack, onSave, jobToEdit = null }) => {
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        location: '',
        contactEmail: '',
        regime: 'Híbrido',
        description: '',
        requirements: '',
        benefits: ''
    });

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [tagType, setTagType] = useState('mandatory');

    useEffect(() => {
        if (jobToEdit) {
            setFormData({
                id: jobToEdit.id,
                title: jobToEdit.title || '',
                location: jobToEdit.location || '',
                contactEmail: jobToEdit.contactEmail || '',
                regime: jobToEdit.regime || 'Híbrido',
                description: jobToEdit.description || '',
                requirements: jobToEdit.requirements || '',
                benefits: jobToEdit.benefits || ''
            });
            setTags(jobToEdit.tags || []);
        }
    }, [jobToEdit]);

    const handleAddTag = (e) => {
        e.preventDefault();
        if (!tagInput.trim()) return;
        const newTag = { id: Date.now(), name: tagInput, type: tagType };
        setTags([...tags, newTag]);
        setTagInput('');
    };

    const handleRemoveTag = (idToRemove) => {
        setTags(tags.filter(tag => tag.id !== idToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            ...formData, 
            tags 
        });
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-3xl">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#223e8c] font-medium mb-6 transition-colors">
                <ArrowLeft size={20} /> Cancelar
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h1 className="text-2xl font-extrabold text-[#223e8c]">
                        {jobToEdit ? 'Editar Vaga' : 'Publicar Nova Vaga'}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        {jobToEdit ? 'Atualize as informações abaixo.' : 'Preencha os detalhes para encontrar o estagiário ideal.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                            icon={Briefcase} 
                            label="Título da Vaga" 
                            placeholder="Ex: Estágio em Desenvolvimento Embarcado"
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                        />

                        <Input 
                            icon={Mail} 
                            type="email"
                            label="E-mail para Recebimento" 
                            placeholder="rh@empresa.com"
                            value={formData.contactEmail} 
                            onChange={e => setFormData({...formData, contactEmail: e.target.value})} 
                            required
                        />
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Regime de Trabalho</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Building2 size={18} />
                                </div>
                                <select 
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white"
                                    value={formData.regime}
                                    onChange={e => setFormData({...formData, regime: e.target.value})}
                                >
                                    <option value="Presencial">Presencial</option>
                                    <option value="Remoto">Remoto</option>
                                    <option value="Híbrido">Híbrido</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <Input 
                        icon={MapPin} 
                        label="Localização" 
                        placeholder="Ex: Juiz de Fora, MG"
                        value={formData.location} 
                        onChange={e => setFormData({...formData, location: e.target.value})} 
                    />

                    <Input 
                        textarea 
                        rows={4} 
                        label="Descrição da Vaga" 
                        placeholder="Descreva as responsabilidades, dia a dia e desafios..."
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                            textarea 
                            rows={3} 
                            icon={CheckCircle} 
                            label="Requisitos Básicos" 
                            placeholder="Ex: Cursando Engenharia de Software, Lógica de programação..."
                            value={formData.requirements} 
                            onChange={e => setFormData({...formData, requirements: e.target.value})} 
                        />
                        <Input 
                            textarea 
                            rows={3} 
                            icon={DollarSign} 
                            label="Benefícios" 
                            placeholder="Ex: Bolsa auxílio, Vale transporte, Gympass..."
                            value={formData.benefits} 
                            onChange={e => setFormData({...formData, benefits: e.target.value})} 
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-800 mb-2">Tecnologias e Skills (Tags)</label>
                        <p className="text-xs text-gray-500 mb-4">Adicione as tags que aparecerão no card.</p>
                        
                        <div className="flex gap-2 mb-4 items-end">
                            <div className="flex-grow">
                                <input 
                                    type="text" 
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#223e8c] focus:border-[#223e8c]"
                                    placeholder="Ex: Java, SQL, Inglês Intermediário..."
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                />
                            </div>
                            <div className="w-1/3">
                                <select 
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#223e8c] focus:border-[#223e8c]"
                                    value={tagType}
                                    onChange={e => setTagType(e.target.value)}
                                >
                                    <option value="mandatory">Obrigatório</option>
                                    <option value="desirable">Desejável</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleAddTag}
                                type="button"
                                className="bg-[#223e8c] text-white p-2 rounded-lg hover:bg-[#1a2f6b] transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white rounded-lg border border-gray-200 border-dashed">
                            {tags.length === 0 && <span className="text-xs text-gray-400 italic p-1">Nenhuma tag adicionada</span>}
                            {tags.map(tag => (
                                <Tag key={tag.id} name={tag.name} type={tag.type} onRemove={() => handleRemoveTag(tag.id)} />
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <button 
                            type="button" 
                            onClick={onBack} 
                            className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="flex items-center gap-2 px-6 py-3 bg-[#223e8c] text-white rounded-lg text-sm font-bold hover:bg-[#1a2f6b] transition-all shadow-md hover:shadow-lg"
                        >
                            {jobToEdit ? (
                                <><Pencil size={18} /> Salvar Alterações</>
                            ) : (
                                <><Save size={18} /> Publicar Vaga</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};
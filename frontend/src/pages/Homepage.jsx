import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { JobCard } from '../components/business/JobCard';

export const HomePage = ({ onNavigate, onJobClick, vacancies, currentUser, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredVagas = useMemo(() => {
    let listToFilter = vacancies;

    if (currentUser?.type === 'company') {
        listToFilter = listToFilter.filter(v => v.company === currentUser.name);
    }

    if (!searchTerm) return listToFilter;
    
    const lowerTerm = searchTerm.toLowerCase();
    return listToFilter.filter(vaga => 
        vaga.title.toLowerCase().includes(lowerTerm) ||
        vaga.company.toLowerCase().includes(lowerTerm) ||
        vaga.tags.some(tag => tag.name.toLowerCase().includes(lowerTerm))
        );
    }, [searchTerm, vacancies, currentUser]);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#223e8c] mb-3">
                    Encontre seu estágio ideal em TI
                </h1>
                <p className="text-gray-500 mb-8">
                Conectamos estudantes a empresas de tecnologia de forma simples e transparente.
                </p>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-gray-400 group-focus-within:text-[#223e8c]" size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Busque por cargo, empresa ou tecnologia (ex: Java, React)..."
                        className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#223e8c] focus:border-transparent bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#223e8c]"></div>
                            <span>Requisito Obrigatório</span>
                        </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#3a8acf]"></div>
                            <span>Diferencial</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex justify-between items-end">
                    <h2 className="text-xl font-bold text-gray-800">
                        {currentUser?.type === 'company' ? 'Minhas Vagas Ativas' : 'Vagas Recentes'}
                    </h2>
                    <span className="text-sm text-gray-500">
                        {filteredVagas.length} vaga{filteredVagas.length !== 1 ? 's' : ''} encontrada{filteredVagas.length !== 1 ? 's' : ''}
                    </span>
                </div>

            {filteredVagas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVagas.map((vaga) => (
                        <JobCard 
                            key={vaga.id} 
                            vaga={vaga} 
                            onClick={onJobClick}
                            isOwner={currentUser?.type === 'company' && vaga.company === currentUser.name}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                        {currentUser?.type === 'company' 
                            ? "Você ainda não publicou nenhuma vaga." 
                            : `Nenhuma vaga encontrada para "${searchTerm}".`
                        }
                    </p>
                </div>
            )}
        </main>
    );
};
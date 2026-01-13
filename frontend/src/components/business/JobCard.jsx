import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import { Tag } from '../ui/Tag';

export const JobCard = ({ vaga, onClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 p-5 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#223e8c] transition-colors">
                    {vaga.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <Building2 size={14} />
                            <span>{vaga.company}</span>
                    </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{vaga.postedAt}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <MapPin size={14} />
                <span>{vaga.location} • {vaga.regime}</span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow"> {vaga.description} </p>

            <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Tech Stack</span>
                    <div className="h-[1px] flex-grow bg-gray-100"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {vaga.tags.map((tag) => (
                    <Tag key={tag.id} name={tag.name} type={tag.type} />
                    ))}
                </div>
            </div>

            <button 
                onClick={() => onClick(vaga)}
                className="w-full mt-5 bg-transparent border border-[#223e8c] text-[#223e8c] py-2 rounded-lg text-sm font-bold hover:bg-[#223e8c] hover:text-white transition-colors"
            > Ver Detalhes
            </button>
        </div>
    );
};
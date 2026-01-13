import React from "react";
import { X } from "lucide-react";

export const Tag = ({ name, type, size = "small", onRemove }) => {
    const bgClass =
    type === "mandatory"
        ? "bg-[#223e8c] text-white"
        : "bg-[#3a8acf] text-white";

    const title = type === "mandatory" ? "Requisito Obrigatório" : "Diferencial / Desejável";const sizeClass = size === "large" ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-xs";

    return (
        <span
            title={title}
            className={`${bgClass} ${sizeClass} rounded-md font-semibold cursor-default inline-flex items-center gap-2`}
        >
        {name}
        {onRemove && (
            <button
                onClick={onRemove}
                className="hover:text-red-200 transition-colors"
                >
                <X size={14} />
            </button>
        )}
        </span>
    );
};

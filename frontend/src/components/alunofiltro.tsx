'use client';

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface AlunoFiltroProps {
  onFilter: (value: string) => void;
  label?: string;
}

export default function AlunoFiltro({ onFilter, label = "Filtre por aluno:" }: AlunoFiltroProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter(value);
  };

  return (
    <div className="relative inline-flex items-center">
      <span className="bg-teal-600 text-white font-medium px-4 py-2 rounded-l-lg">
        {label}
      </span>
      <div className="flex items-center bg-gray-300 text-black p-2 rounded-r-lg w-60"
            style={{ backgroundColor: '#D9D9D9' }}>
        <input
          type="text"
          className="bg-transparent w-full text-black placeholder-grey focus:outline-none"
          placeholder="Digite o nome de um aluno"
          value={searchTerm}
          onChange={handleChange}
        />
        <FiSearch className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
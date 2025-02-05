"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

// Mock de alunos
const alunos = [
  "Lucas Almeida",
  "Ana Beatriz Santos",
  "Rafael Costa",
  "Mariana Oliveira",
  "Pedro Henrique",
  "Gabriela Souza",
  "João Pedro",
  "Isabella Ferreira",
  "Mateus Martins",
  "Larissa Rocha",
  "Thiago Rodrigues",
  "Amanda Barros",
];

interface AlunoDropdownProps {
  selectedAluno: string | null;
  onSelect: (value: string | null) => void;
}

export default function AlunoDropdown({ selectedAluno, onSelect }: AlunoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Atualiza o campo de busca quando selectedAluno muda
  useEffect(() => {
    setSearchTerm(selectedAluno ?? ""); 
  }, [selectedAluno]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Filtra os alunos com base no termo de pesquisa
  const filteredAlunos = alunos.filter((aluno) =>
    aluno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (aluno: string) => {
    setSearchTerm(aluno);
    setIsOpen(false);
    onSelect(aluno);
  };

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      <span className="bg-teal-500 text-black font-medium px-4 py-2 rounded-l-lg">
        Selecione um aluno:
      </span>
      {/* Campo de busca */}
      <div className="relative">
        <div
          className="flex items-center bg-teal-500 text-white p-2 rounded-r-lg cursor-pointer relative w-60"
          style={{ backgroundColor: '#D9D9D9' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            className="bg-transparent w-full text-black placeholder-black focus:outline-none"
            placeholder="Digite o nome de um aluno"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="w-5 h-5" />
        </div>

        {/* Lista de alunos */}
        {isOpen && (
          <ul
            className="absolute w-full text-black bg-gray-300 rounded max-h-96 overflow-y-auto mt-1 shadow-lg"
            style={{ backgroundColor: '#D9D9D9' }}
          >
            {filteredAlunos.length > 0 ? (
              filteredAlunos.map((aluno, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-[#EFEFEF] cursor-pointer"
                  onClick={() => handleSelect(aluno)}
                >
                  {aluno}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-600">Nenhum aluno encontrado</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

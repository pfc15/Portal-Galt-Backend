"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

// Mock de datas
const datas = [
  "04/02/2025",
  "15/03/2025",
  "22/04/2025",
  "10/05/2025",
  "30/06/2025",
  "12/07/2025",
  "25/08/2025",
  "08/09/2025",
  "19/10/2025",
  "05/11/2025",
  "14/12/2025",
];

interface DataFrequenciaDropdownProps {
  selectedData: string | null;
  onSelect: (value: string | null) => void;
}

export default function DataFrequenciaDropdown({ selectedData, onSelect }: DataFrequenciaDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Atualiza o campo de busca quando selectedData muda
  useEffect(() => {
    setSearchTerm(selectedData ?? "");
  }, [selectedData]);

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

  // Filtra as datas com base no termo de pesquisa
  const filteredDatas = datas.filter((data) =>
    data.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      <span className="bg-teal-600 text-white  font-medium px-4 py-2 rounded-l-lg">
        Selecione uma data:
      </span>
      {/* Campo de busca */}
      <div className="relative">
        <div
          className="flex items-center bg-teal-600 text-white p-2 rounded-r-lg cursor-pointer relative w-40"
          style={{ backgroundColor: "#D9D9D9" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            className="bg-transparent w-full text-black placeholder-grey focus:outline-none"
            placeholder="Digite uma data"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="w-5 h-5" />
        </div>

        {/* Lista de datas */}
        {isOpen && (
          <ul
            className="absolute w-full text-black bg-gray-300 rounded max-h-96 overflow-y-auto mt-1 shadow-lg"
            style={{ backgroundColor: "#D9D9D9" }}
          >
            {filteredDatas.length > 0 ? (
              filteredDatas.map((data, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-[#EFEFEF] cursor-pointer"
                  onClick={() => {
                    setSearchTerm(data);
                    setIsOpen(false);
                    onSelect(data); // Chama a função passada como prop
                  }}
                >
                  {data}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-600">Nenhuma data encontrada</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
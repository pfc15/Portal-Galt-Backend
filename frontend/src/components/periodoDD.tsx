'use client';

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface PeriodoDropdownProps {
  onSelect: (value: string) => void;
}

const PeriodoDropdown = ({ onSelect }: PeriodoDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Diurno");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect(value); // Chama a função passada pelo pai
  };

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      <span className="bg-teal-500 text-black font-medium px-4 py-2 rounded-l-lg">
        Selecione o período:
      </span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black px-4 py-2 rounded-r-lg flex items-center w-32 justify-between"
          style={{ backgroundColor: '#D9D9D9' }}
          type="button"
        >
          {selected}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-300 rounded-lg shadow-md mt-1">
            <ul className="text-black" style={{ backgroundColor: '#D9D9D9' }}>
              <li>
                <button
                  onClick={() => handleSelect("Diurno")}
                  className="block w-full text-left px-4 py-2 hover:bg-[#EFEFEF]"
                >
                  Diurno
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSelect("Noturno")}
                  className="block w-full text-left px-4 py-2 hover:bg-[#EFEFEF]"
                >
                  Noturno
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodoDropdown;
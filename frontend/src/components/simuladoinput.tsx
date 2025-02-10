"use client";

import React from "react";

interface SimuladoInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SimuladoInput({ value, onChange }: SimuladoInputProps) {
  return (
    <div className="flex flex-col items-start w-80">
      <span className="block w-full text-center text-lg font-semibold text-white bg-teal-600 px-4 py-2 rounded-t-lg">
        Digite o nome do simulado:
      </span>
      <div className="relative">
        <div
          className="flex items-center bg-teal-600 text-white p-2 rounded-b-lg cursor-pointer relative w-80"
          style={{ backgroundColor: '#D9D9D9' }}
        >
          <input
            type="text"
            className="bg-transparent w-full text-black text-center placeholder-grey focus:outline-none rounded-b-lg"
            placeholder="Digite o nome"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Header from "@/components/header";

const mockFrequenciaAluno = {
  "Lucas Almeida": {
    Diurno: {
      totalPresenca: "90%",
      frequencias: [
        [
          ["13/01", "14/01", "15/01", "16/01", "17/01", "20/01", "21/01", "22/01", "23/01"],
          [5, 3, 0, 5, 5, 5, 5, 1, 5]
        ],
        [
          ["24/01", "27/01", "28/01", "29/01", "30/01", "31/01", "03/02", "04/02", "05/02"],
          [5, 3, 0, 5, 5, 5, 5, 1, 5]
        ],
        [
          ["13/01", "14/01", "15/01", "16/01", "17/01", "13/01", "13/01", "13/01", "13/01"],
          [5, 3, 0, 5, 5, 5, 5, 1, 5]
        ],
        [
          ["13/01", "14/01", "15/01", "16/01", "17/01", "13/01", "13/01", "13/01", "13/01"],
          [5, 3, 0, 5, 5, 5, 5, 1, 5]
        ]
      ]
    }
  }
};

export default function FrequenciaAluno() {
    const selectedAluno = "Lucas Almeida";
    const frequencias = mockFrequenciaAluno[selectedAluno].Diurno.frequencias;
    const totalPresenca = mockFrequenciaAluno[selectedAluno].Diurno.totalPresenca;
  
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-3xl font-bold text-black mb-6">Frequência: {selectedAluno}</h2>
          {frequencias.map((semana, index) => (
            <div key={index} className="mb-8">
              <div className="grid grid-cols-9 bg-[#2DC5B8] text-black p-4 text-lg rounded-t-lg">
                {semana[0].map((data, i) => (
                  <div key={i} className="text-center">{data}</div>
                ))}
              </div>
              <div className="grid grid-cols-9 bg-gray-200 text-black p-4 text-lg rounded-b-lg">
                {semana[1].map((presenca, i) => (
                  <div key={i} className="text-center font-bold">{presenca}</div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-2xl font-bold text-black mt-6">TOTAL DE PRESENÇA: {totalPresenca}</p>
        </div>
      </div>
    );
  }
  
  


"use client";

import Header from "@/components/header";
import InputFile from "@/components/fileinput";
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface Simulado {
  id: number;
  nome: string;
  data: string;
  gabarito: string;
  respostas: string;
}

export default function VisualizarSimulado() {
  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Mock de simulados
    const mockSimulados: Simulado[] = [
      {
        id: 1,
        nome: "Simulado ENEM 2025",
        data: "2025-02-10",
        gabarito: "gabarito_enem_2025.csv",
        respostas: "respostas_enem_2025.csv",
      },
      {
        id: 2,
        nome: "Simulado Fuvest 2025",
        data: "2025-02-15",
        gabarito: "gabarito_fuvest_2025.csv",
        respostas: "respostas_fuvest_2025.csv",
      },
    ];
    setSimulados(mockSimulados);
  }, []);

  const handleEditClick = (simulado: Simulado) => {
    router.push(
      `/editarenviosimulado?id=${simulado.id}&nome=${encodeURIComponent(
        simulado.nome
      )}&data=${simulado.data}&gabarito=${encodeURIComponent(
        simulado.gabarito
      )}&respostas=${encodeURIComponent(simulado.respostas)}`
    );
  };

  return (
    <div className="flex flex-col bg-gray-100 items-center w-full min-h-screen">
      <Header isadmin />
      <h1 className="text-2xl text-black font-bold mt-6">Simulados Enviados</h1>
      {simulados.length === 0 ? (
        <p className="mt-4 text-gray-600">Nenhum simulado enviado ainda.</p>
      ) : (
        <div className="w-3/4 max-w-2xl mt-6 pb-6 space-y-6">
          {simulados.map((simulado) => (
            <div
              key={simulado.id}
              className="relative border p-4 rounded-lg shadow-md bg-white"
            >
              <h2 className="text-lg text-black font-semibold">
                Simulado: {simulado.nome}
              </h2>
              <p className="text-black font-semibold">Data: {simulado.data}</p>

              {/* Botão da engrenagem para editar */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => handleEditClick(simulado)}
              >
                <Settings size={24} />
              </button>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-black font-medium text-center pb-3">Gabarito</p>
                  <InputFile
                    id={`gabarito_${simulado.id}`}
                    label={simulado.gabarito}
                    setGabarito={() => {}}
                    disabled={true} 
                  />
                </div>
                <div>
                  <p className="text-black font-medium text-center pb-3">Respostas</p>
                  <InputFile
                    id={`respostas_${simulado.id}`}
                    label={simulado.respostas}
                    setGabarito={() => {}}
                    disabled={true} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

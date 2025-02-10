'use client';

import Header from "@/components/header";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// 1. Definindo as interfaces para os dados de frequência
interface Registro {
  presenca: number;
  nome: string;
}

interface FrequenciaData {
  presenca: {
    [data: string]: Registro[];
  };
  total_presenca: string;
}

// Mock atualizado conforme estrutura do backend
const mockFrequenciaAluno: FrequenciaData = {
  presenca: {
    "2024-01-01": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-02": [{ presenca: 3, nome: "Lucas Almeida" }],
    "2024-01-03": [{ presenca: 0, nome: "Lucas Almeida" }],
    "2024-01-04": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-05": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-08": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-09": [{ presenca: 1, nome: "Lucas Almeida" }],
    "2024-01-10": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-11": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-12": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-15": [{ presenca: 0, nome: "Lucas Almeida" }],
    "2024-01-16": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-17": [{ presenca: 1, nome: "Lucas Almeida" }],
    "2024-01-18": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-19": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-20": [{ presenca: 5, nome: "Lucas Almeida" }],
    "2024-01-21": [{ presenca: 0, nome: "Lucas Almeida" }],
    "2024-01-22": [{ presenca: 5, nome: "Lucas Almeida" }]
  },
  total_presenca: "90%"
};

export default function FrequenciaAluno() {
  const selectedAluno = "Lucas Almeida";
  
  // 4. Declarando explicitamente o tipo do estado
  const [frequencias, setFrequencia] = useState<[string[], number[]][]>([]);
  const [totalPresenca, setTotalPresenca] = useState("");
  const [cookies] = useCookies(["token_auth"]);

  // 2. Função para processar os dados de frequência com tipagem explícita
  const processarFrequencias = (data: FrequenciaData, aluno: string): [string[], number[]][] => {
    if (!data || !data.presenca) return [];
    
    // Usando o cast para tipar as entradas de Object.entries
    const dias = (Object.entries(data.presenca) as [string, Registro[]][])
      .map(([dataStr, registros]) => {
        const registro = registros.find(r => r.nome === aluno);
        return {
          data: new Date(dataStr),
          presenca: registro ? registro.presenca : 0
        };
      })
      // 3. Usando .getTime() para comparar as datas
      .sort((a, b) => a.data.getTime() - b.data.getTime());

    // Agrupar em semanas de 9 dias (ajuste conforme necessário)
    const semanas: [string[], number[]][] = [];
    for (let i = 0; i < dias.length; i += 9) {
      const semana = dias.slice(i, i + 9);
      semanas.push([
        semana.map(d =>
          `${d.data.getDate().toString().padStart(2, '0')}/${(d.data.getMonth() + 1)
            .toString().padStart(2, '0')}`
        ),
        semana.map(d => d.presenca)
      ]);
    }
    
    return semanas;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Exemplo com fetch real:
        // const response = await fetch(`http://localhost:8000/simulado/getFrequencia/${selectedAluno}/`, {
        //   headers: { Authorization: `Token ${cookies.token_auth}` }
        // });
        // const data: FrequenciaData = await response.json();
        
        const data = mockFrequenciaAluno; // Usando mock
        setFrequencia(processarFrequencias(data, selectedAluno));
        setTotalPresenca(data.total_presenca);
      } catch (error) {
        console.error("Erro ao carregar frequência:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-black mb-6">
          Frequência: {selectedAluno}
        </h2>
        
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

        <p className="text-2xl font-bold text-black mt-6">
          TOTAL DE PRESENÇA: {totalPresenca}
        </p>
      </div>
    </div>
  );
}

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
  total_presenca?: string; // total_presenca é opcional, pois sua view não o retorna
}

// 2. Função para processar os dados de frequência
const processarFrequencias = (data: FrequenciaData, aluno: string): [string[], number[]][] => {
  if (!data || !data.presenca) return [];

  // Fazemos um _cast_ para que o TypeScript saiba que cada entrada é [string, Registro[]]
  const dias = (Object.entries(data.presenca) as [string, Registro[]][])
    .map(([dataStr, registros]) => {
      const registro = registros.find(r => r.nome === aluno);
      return {
        data: new Date(dataStr),
        presenca: registro ? registro.presenca : 0
      };
    })
    // Usando getTime() para comparar os timestamps das datas
    .sort((a, b) => a.data.getTime() - b.data.getTime());

  const semanas: [string[], number[]][] = [];
  for (let i = 0; i < dias.length; i += 5) {
    const semana = dias.slice(i, i + 5);
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

export default function FrequenciaAluno() {
  const [cookies] = useCookies(["token_auth", "username"]);
  const selectedAluno = cookies.username;
  const [frequencias, setFrequencia] = useState<[string[], number[]][]>([]);
  const [totalPresenca, setTotalPresenca] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL do endpoint no backend (ajuste conforme necessário)
        const response = await fetch(`http://localhost:8000/simulado/getFrequencia/${selectedAluno}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${cookies.token_auth}`  // Inclui o token no header
          },
          // Caso o backend precise que os cookies sejam enviados:
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do backend");
        }

        const data: FrequenciaData = await response.json();
        setFrequencia(processarFrequencias(data, selectedAluno));
        // Caso o backend retorne total_presenca, atualiza o estado; senão, permanece vazio
        if (data.total_presenca) {
          setTotalPresenca(data.total_presenca);
        }
      } catch (error) {
        console.error("Erro ao carregar frequência:", error);
      }
    };

    // Executa a busca somente se o token estiver disponível
    if (cookies.token_auth) {
      fetchData();
    }
  }, [cookies.token_auth, selectedAluno]);

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

        {totalPresenca && (
          <p className="text-2xl font-bold text-black mt-6">
            TOTAL DE PRESENÇA: {totalPresenca}
          </p>
        )}
      </div>
    </div>
  );
}

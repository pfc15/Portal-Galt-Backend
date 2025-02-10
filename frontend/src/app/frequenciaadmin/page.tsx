'use client';
import { useState, useEffect } from "react";
import AlunoDropdown from "@/components/alunoDD";
import Header from "@/components/header";
import PeriodoDropdown from "@/components/periodoDD";
import DataFrequenciaDropdown from "@/components/datafrequenciaDD";
import { useCookies } from "react-cookie";

const mockFrequenciaAluno: Record<
  string,
  Record<string, { totalPresenca: string; frequencias: [string[], number[]] }>
> = {
  "Lucas Almeida": {
    Diurno: {
      totalPresenca: "90%",
      frequencias: [
        ["13/01", "14/01", "15/01", "16/01", "17/01"],
        [5, 3, 0, 5, 5],
      ],
    },
    Noturno: {
      totalPresenca: "85%",
      frequencias: [
        ["18/01", "19/01", "20/01", "21/01", "22/01"],
        [4, 2, 5, 3, 5],
      ],
    },
  },
};

const mockFrequenciaData: Record<string, Record<string, { nome: string; presenca: number }[]>> = {
  "04/02/2025": {
    Diurno: [
      { nome: "Lucas Almeida", presenca: 5 },
      { nome: "Ana Beatriz Santos", presenca: 5 },
      // ... demais registros
    ],
    Noturno: [
      { nome: "Pedro Henrique", presenca: 5 },
      { nome: "Gabriela Souza", presenca: 4 },
      // ... demais registros
    ],
  },
};

export default function FrequenciaAdmin() {
  // Recupera token e username dos cookies
  const [cookies] = useCookies(["token_auth", "username"]);
  
  // O aluno logado vem do cookie "username"
  const [selectedAluno, setSelectedAluno] = useState<string | null>(cookies.username || null);
  // Permite que o valor seja nulo, para ser compatível com o dropdown
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string | null>("Diurno");
  const [selectedData, setSelectedData] = useState<string | null>(null);

  // Se um novo período for selecionado, limpa os estados de aluno e data
  useEffect(() => {
    setSelectedAluno(null);
    setSelectedData(null);
  }, [periodoSelecionado]);

  // Se uma data for selecionada, desmarca o aluno
  useEffect(() => {
    if (selectedData) setSelectedAluno(null);
  }, [selectedData]);

  // Se um aluno for selecionado, desmarca a data
  useEffect(() => {
    if (selectedAluno) setSelectedData(null);
  }, [selectedAluno]);

  useEffect(() => {
    if (selectedAluno || selectedData) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${cookies.token_auth}`,
        },
      };

      // Exemplo de chamada à API (construa a URL conforme sua lógica)
      fetch(`http://localhost:8000/frequenciaAPI/getFrequenciaTurma/diurno2025/2025-01-01`, requestOptions)    
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
        })
        .then(data => {
          console.log("Dados recebidos:", data);
          // Defina o estado para exibir os dados retornados, se necessário
        })
        .catch(error => {
          console.error("Erro ao buscar frequência:", error);
        });
    }
  }, [selectedAluno, selectedData, periodoSelecionado]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isadmin/>
      <div className="max-w-6xl mx-auto p-4 w-400">
        <div className="flex justify-evenly items-center gap-4 mb-4 mx-auto w-full">
          <PeriodoDropdown onSelect={setPeriodoSelecionado} />
          <AlunoDropdown selectedAluno={selectedAluno} onSelect={setSelectedAluno} />
          <DataFrequenciaDropdown selectedData={selectedData} onSelect={setSelectedData} />
        </div>

        {/* Exibe os dados conforme o período e o aluno ou data selecionados */}
        {periodoSelecionado && selectedAluno && mockFrequenciaAluno[selectedAluno]?.[periodoSelecionado] && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-black font-semibold">
              Aluno: {selectedAluno}
            </h2>
            <p className="font-bold text-black">
              Total de Presença: {mockFrequenciaAluno[selectedAluno][periodoSelecionado].totalPresenca}
            </p>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {mockFrequenciaAluno[selectedAluno]?.[periodoSelecionado]?.frequencias?.[0]?.map((data, index) => (
                <div key={index} className="text-center text-black font-medium bg-gray-200 p-2 rounded-lg">
                  <p className="font-semibold">{data}</p>
                  <p className="text-lg font-bold">
                    {mockFrequenciaAluno[selectedAluno][periodoSelecionado].frequencias[1][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {periodoSelecionado && selectedData && mockFrequenciaData[selectedData]?.[periodoSelecionado] && (
          <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl text-black font-semibold">Data: {selectedData}</h2>
            <div className="mt-4">
              <p className="font-bold text-black">
                Alunos Presentes: {mockFrequenciaData[selectedData]?.[periodoSelecionado]?.filter((a) => a.presenca > 0).length ?? 0}
              </p>
              <p className="font-bold text-black">
                Total de Faltas: {mockFrequenciaData[selectedData]?.[periodoSelecionado]?.filter((a) => a.presenca === 0).length ?? 0}
              </p>
              <div className="grid text-black grid-cols-1 pt-4 gap-4">
                {mockFrequenciaData[selectedData][periodoSelecionado].map((aluno, index) => (
                  <div key={index} className="flex text-black justify-between p-2 bg-gray-200 rounded-lg">
                    <span>{aluno.nome}</span>
                    <span className="font-bold">{aluno.presenca}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

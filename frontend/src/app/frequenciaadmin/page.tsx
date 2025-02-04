'use client';
import { useState, useEffect } from "react";
import AlunoDropdown from "@/components/alunoDD";
import Header from "@/components/header";
import PeriodoDropdown from "@/components/periodoDD";
import DataFrequenciaDropdown from "@/components/datafrequenciaDD";

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
      { nome: "Rafael Costa", presenca: 5 },
      { nome: "Mariana Oliveira", presenca: 4 },
      { nome: "Pedro Henrique", presenca: 5 },
      { nome: "Gabriela Souza", presenca: 5 },
      { nome: "João Pedro", presenca: 5 },
      { nome: "Isabella Ferreira", presenca: 5 },
      { nome: "Mateus Martins", presenca: 0 },
      { nome: "Larissa Rocha", presenca: 5 },
      { nome: "Thiago Rodrigues", presenca: 5 },
      { nome: "Amanda Barros", presenca: 5 },
      { nome: "Lucas Almeida", presenca: 5 },
      { nome: "Ana Beatriz Santos", presenca: 5 },
      { nome: "Rafael Costa", presenca: 5 },
      { nome: "Mariana Oliveira", presenca: 4 },
      { nome: "Pedro Henrique", presenca: 5 },
      { nome: "Gabriela Souza", presenca: 5 },
      { nome: "João Pedro", presenca: 5 },
      { nome: "Isabella Ferreira", presenca: 5 },
      { nome: "Mateus Martins", presenca: 0 },
      { nome: "Larissa Rocha", presenca: 5 },
      { nome: "Thiago Rodrigues", presenca: 5 },
      { nome: "Amanda Barros", presenca: 5 },
    ],
    Noturno: [
      { nome: "Pedro Henrique", presenca: 5 },
      { nome: "Gabriela Souza", presenca: 4 },
      { nome: "João Pedro", presenca: 5 },
    ],
  },
};

export default function FrequenciaAdmin() {
  const [selectedAluno, setSelectedAluno] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>("Diurno");

  // Se um novo período for selecionado, limpar aluno e data
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-4 w-400">
        <div className="flex justify-evenly items-center gap-4 mb-4 mx-auto w-full">
          <PeriodoDropdown onSelect={setPeriodoSelecionado} />
          <AlunoDropdown selectedAluno={selectedAluno} onSelect={setSelectedAluno} />
          <DataFrequenciaDropdown selectedData={selectedData} onSelect={setSelectedData} />
        </div>

        {periodoSelecionado && selectedAluno && mockFrequenciaAluno[selectedAluno]?.[periodoSelecionado] && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-black font-semibold">Aluno: {selectedAluno}</h2>
            <p className="font-bold text-black">
              Total de Presença: {mockFrequenciaAluno[selectedAluno][periodoSelecionado].totalPresenca}
            </p>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {mockFrequenciaAluno[selectedAluno]?.[periodoSelecionado]?.frequencias?.[0]?.map((data, index) => (
                <div key={index} className="text-center text-black font-medium bg-gray-200 p-2 rounded-lg">
                  <p className="font-semibold">{data}</p>
                  <p className="text-lg font-bold">{mockFrequenciaAluno[selectedAluno][periodoSelecionado].frequencias[1][index]}</p>
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


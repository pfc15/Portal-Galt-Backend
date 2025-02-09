"use client";

import React, { FC, useState } from "react";
import { Upload, X } from "lucide-react";

interface InputFileProps {
  label?: string;
  id?: string;
  setGabarito: (gabarito: Record<string, Record<string, string>>) => void;
}

const InputFileRespostas: FC<InputFileProps> = ({ label, id, setGabarito }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setFileName(file.name);

    const text = await file.text();
    const linhas = text
      .split(/\r?\n/)
      .map((linha) => linha.trim())
      .filter((linha) => linha);

    if (linhas.length < 2) {
      alert("Arquivo inválido: Deve conter pelo menos um aluno e uma questão.");
      resetFileInput();
      return;
    }

    const separadores = ["\t", ",", ";"];
    const delimitador =
      separadores.find((sep) => linhas[0].includes(sep)) || ",";
    const colunas = linhas[0].split(delimitador).map((item) => item.trim());

    if (colunas.length < 2 || colunas[0].toLowerCase() !== "aluno") {
      alert(
        `Arquivo inválido: A primeira coluna deve ser 'aluno'.\n\nDetectado: '${colunas[0]}'`
      );
      resetFileInput();
      return;
    }

    const alunos: Record<string, Record<string, string>> = {};

    for (let i = 1; i < linhas.length; i++) {
      const dados = linhas[i].split(delimitador).map((item) => item.trim());
      const aluno = dados[0];

      if (!aluno) {
        alert(`Erro na linha ${i + 1}: O nome do aluno não pode estar vazio.`);
        resetFileInput();
        return;
      }

      const respostas: Record<string, string> = {};

      for (let j = 1; j < colunas.length; j++) {
        const questao = colunas[j];
        const resposta = dados[j] ?? "";

        if (!questao) {
          alert(`Erro na linha ${i + 1}: Coluna de questão vazia.`);
          resetFileInput();
          return;
        }

        if (!resposta) {
          alert(
            `Erro na linha ${
              i + 1
            }, questão '${questao}': Resposta não pode estar vazia.`
          );
          resetFileInput();
          return;
        }

        if (resposta.length !== 1) {
          alert(
            `Erro na linha ${
              i + 1
            }, questão '${questao}': A resposta '${resposta}' deve ter apenas 1 caractere.`
          );
          resetFileInput();
          return;
        }

        respostas[questao] = resposta;
      }

      alunos[aluno] = respostas;
    }

    console.log("✅ Respostas carregadas:", alunos);
    setGabarito(alunos);
  };

  // Função para resetar o input de arquivo
  const resetFileInput = () => {
    setFileName("");
    setGabarito({});
    const input = document.getElementById(id!) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const handleCancel = () => {
    resetFileInput();
  };

  return (
    <label
      htmlFor={id}
      className="flex flex-col items-center w-60 mx-auto cursor-pointer"
    >
      <div className="block w-full text-center text-lg font-medium text-white bg-teal-600 px-4 py-2 rounded-t-lg">
        {label || "Faça o upload das respostas"}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-32 bg-[#D9D9D9] rounded-b-lg hover:bg-gray-400 relative">
        {fileName ? (
          <div className="flex flex-col items-center">
            <span className="text-black text-sm text-center px-2">
              {fileName}
            </span>
            <button
              type="button"
              className="absolute bottom-2 flex items-center justify-center bg-transparent text-white hover:text-gray-700"
              onClick={handleCancel}
            >
              <X size={24} />
            </button>
          </div>
        ) : (
          <Upload size={60} color="#9E9E9E" />
        )}
      </div>
      <input
        className="hidden"
        id={id}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default InputFileRespostas;

"use client";

import React, { FC, useState } from "react";
import { Upload, X } from "lucide-react";

interface InputFileProps {
  label?: string;
  id?: string;
  setGabarito: (gabarito: Record<string, string>) => void;
}

const InputFile: FC<InputFileProps> = ({ label, id, setGabarito }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;

      const text = e.target.result as string;
      console.log("📄 Arquivo lido (bruto):", text);

      const linhas = text
        .split("\n")
        .map((linha) => linha.trim())
        .filter(Boolean);

      if (linhas.length < 2) {
        alert(
          "Arquivo inválido: deve conter pelo menos uma questão e um gabarito."
        );
        resetFileInput();
        return;
      }

      const possiveisSeparadores = ["\t", ",", ";"];
      let separadorDetectado =
        possiveisSeparadores.find((sep) => linhas[0].includes(sep)) || ",";

      const colunas = linhas[0]
        .split(separadorDetectado)
        .map((coluna) => coluna.trim().toLowerCase());

      if (
        colunas.length !== 2 ||
        colunas[0] !== "questao" ||
        colunas[1] !== "gabarito"
      ) {
        alert(
          "Arquivo inválido: a primeira linha deve ter 'questao' e 'gabarito'."
        );
        resetFileInput();
        return;
      }

      const gabarito: Record<string, string> = {};

      // Lê as questões e respostas a partir da segunda linha
      for (let i = 1; i < linhas.length; i++) {
        const partes = linhas[i].split(separadorDetectado).map((p) => p.trim());

        if (partes.length !== 2) {
          alert(
            `Erro na linha ${i + 1}: A linha deve conter exatamente 2 colunas.`
          );
          resetFileInput();
          return;
        }

        const [questao, resposta] = partes;

        if (!questao || !resposta) {
          alert(
            `Erro na linha ${i + 1}: Questão e gabarito não podem estar vazios.`
          );
          resetFileInput();
          return;
        }

        if (resposta.length !== 1) {
          alert(
            `Erro na linha ${
              i + 1
            }: A resposta "${resposta}" deve ter apenas 1 caractere.`
          );
          resetFileInput();
          return;
        }

        gabarito[questao] = resposta;
      }

      console.log("✅ Gabarito gerado:", gabarito);
      setGabarito(gabarito);
    };

    reader.readAsText(file);
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
    setFileName("");
    setGabarito({});
    const input = document.getElementById(id!) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <label
      htmlFor={id}
      className="flex flex-col items-center w-60 mx-auto cursor-pointer"
    >
      <div className="block w-full text-center text-lg font-medium text-white bg-teal-600 px-4 py-2 rounded-t-lg">
        {label || "Faça o upload do gabarito"}
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

export default InputFile;

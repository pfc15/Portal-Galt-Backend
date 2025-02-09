"use client";

import React, { FC, useState } from "react";
import { Upload, X } from "lucide-react";

interface InputFileProps {
  label?: string;
  id?: string;
  setGabarito: (gabarito: Record<string, string>) => void;
  disabled?: boolean;
}

const InputFile: FC<InputFileProps> = ({ label, id, setGabarito, disabled = false }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !event.target.files || event.target.files.length === 0) return;

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
        alert("Arquivo inválido: deve conter pelo menos uma questão e um gabarito.");
        resetFileInput();
        return;
      }

      const possiveisSeparadores = ["\t", ",", ";"];
      let separadorDetectado =
        possiveisSeparadores.find((sep) => linhas[0].includes(sep)) || ",";

      const colunas = linhas[0]
        .split(separadorDetectado)
        .map((coluna) => coluna.trim().toLowerCase());

      if (colunas.length !== 2 || colunas[0] !== "questao" || colunas[1] !== "gabarito") {
        alert("Arquivo inválido: a primeira linha deve ter 'questao' e 'gabarito'.");
        resetFileInput();
        return;
      }

      const gabarito: Record<string, string> = {};

      for (let i = 1; i < linhas.length; i++) {
        const partes = linhas[i].split(separadorDetectado).map((p) => p.trim());

        if (partes.length !== 2) {
          alert(`Erro na linha ${i + 1}: A linha deve conter exatamente 2 colunas.`);
          resetFileInput();
          return;
        }

        const [questao, resposta] = partes;

        if (!questao || !resposta) {
          alert(`Erro na linha ${i + 1}: Questão e gabarito não podem estar vazios.`);
          resetFileInput();
          return;
        }

        if (resposta.length !== 1) {
          alert(`Erro na linha ${i + 1}: A resposta "${resposta}" deve ter apenas 1 caractere.`);
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

  const resetFileInput = () => {
    setFileName("");
    setGabarito({});
    const input = document.getElementById(id!) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const handleCancel = () => {
    if (disabled) return;
    resetFileInput();
  };

  return (
    <label
      htmlFor={id}
      className={`flex flex-col items-center w-60 mx-auto cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div
        className={`block w-full text-center text-lg font-medium text-white px-4 py-2 rounded-t-lg ${
          disabled ? "bg-gray-500" : "bg-teal-600"
        }`}
      >
        {label || "Faça o upload do gabarito"}
      </div>
      <div
        className={`flex flex-col items-center justify-center w-full h-32 rounded-b-lg relative ${
          disabled ? "bg-gray-300" : "bg-[#D9D9D9] hover:bg-gray-400"
        }`}
      >
        {fileName ? (
          <div className="flex flex-col items-center">
            <span className="text-black text-sm text-center px-2">{fileName}</span>
            {!disabled && (
              <button
                type="button"
                className="absolute bottom-2 flex items-center justify-center bg-transparent text-white hover:text-gray-700"
                onClick={handleCancel}
              >
                <X size={24} />
              </button>
            )}
          </div>
        ) : (
          <Upload size={60} color={disabled ? "#B0B0B0" : "#9E9E9E"} />
        )}
      </div>
      <input
        className="hidden"
        id={id}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </label>
  );
};

export default InputFile;

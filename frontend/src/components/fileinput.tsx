"use client";

import React, { FC, useState } from "react";
import { Upload, X } from "lucide-react";

interface InputFileProps {
  label?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: FC<InputFileProps> = ({
  label,
  id = "file_input",
  onChange,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleCancel = () => {
    setFileName("");
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <label
      htmlFor={id}
      className="flex flex-col items-center w-60 mx-auto cursor-pointer"
    >
      <div className="block w-full text-center text-lg font-medium text-black bg-teal-500 px-4 py-2 rounded-t-lg">
        {label || "Faça o upload do gabarito"}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-300 rounded-b-lg hover:bg-gray-400 relative">
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
          <Upload size={40} color="white" />
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

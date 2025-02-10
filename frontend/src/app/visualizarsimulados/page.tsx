"use client";

import Header from "@/components/header";
import InputFile from "@/components/fileinput";
import { useState, useEffect } from "react";
import { Settings, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";

interface Simulado {
  id: number;
  nome: string;
  data: string;
  gabarito: string;
  respostas: string;
}

export default function VisualizarSimulado() {
  const [simulados, setSimulados] = useState<Record<string, Simulado>[]>([]);
  const [simuladoParaExcluir, setSimuladoParaExcluir] = useState<Simulado | null>(null);
    const [cookies] = useCookies(["token_auth"]);
  const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("simuladoNome");

//   useEffect(() => {
//     // Mock de simulados
//     const mockSimulados: Record<string, Simulado>[] = [
//       "nome": {
//         id: 1,
//         nome: "Simulado ENEM 2025",
//         data: "2025-02-10",
//         gabarito: "gabarito_enem_2025.csv",
//         respostas: "respostas_enem_2025.csv",
//       },
//       {
//         id: 2,
//         nome: "Simulado Fuvest 2025",
//         data: "2025-02-15",
//         gabarito: "gabarito_fuvest_2025.csv",
//         respostas: "respostas_fuvest_2025.csv",
//       },
//     ];
//     setSimulados(mockSimulados);
//   }, []);

  useEffect(() => {
      fetch(`http://localhost:8000/simulado/getAllSimulado/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${cookies.token_auth}`,
        },
      })
      
        .then((res) => res.json())
        .then((data) => {
            console.log(data.simulado, typeof(data.simulado))
          setSimulados([data.simulado]);
          console.log(simulados)
        })
        .catch((error) => {
          console.error("Erro ao carregar simulado:", error);
          alert("Erro ao carregar simulado para edição.");
        });
    
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

  const handleDeleteClick = (simulado: Simulado) => {
    setSimuladoParaExcluir(simulado);
  };

  const confirmDelete = async () => {
    if (!simuladoParaExcluir) return;
  
    try {
      const response = await fetch(
        `http://localhost:8000/simulado/deleteSimulado/${simuladoParaExcluir.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.token_auth}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao excluir simulado");
      }
  
      setSimulados((prevSimulados) =>
        prevSimulados
          .map((record) => {
            const updatedRecord: Record<string, Simulado> = {};
            Object.entries(record).forEach(([categoria, simulado]) => {
              if (simulado.id !== simuladoParaExcluir.id) {
                updatedRecord[categoria] = simulado;
              }
            });
            return updatedRecord;
          })
          .filter((record) => Object.keys(record).length > 0)
      );
  
      setSimuladoParaExcluir(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir simulado.");
    }
  };
  
  return (
    <div className="flex flex-col bg-gray-100 items-center w-full min-h-screen">
      <Header isadmin />
      <h1 className="text-2xl text-black font-bold mt-6">Simulados Enviados</h1>
      {simulados.length === 0 ? (
        <p className="mt-4 text-gray-600">Nenhum simulado enviado ainda.</p>
      ) : (
<div className="w-3/4 max-w-2xl mt-6 pb-6 space-y-6">
  {simulados.map((record, index) => (
    <div key={index}>
      {/* Agora iteramos sobre cada Record<string, Simulado[]> */}
      {Object.entries(record).map(([categoria, listaSimulados]) => (
        <div key={categoria}>
          <h2 className="text-xl text-black font-bold">{categoria}</h2> {/* Exibe a categoria */}

          <div className="grid grid-cols-1 gap-4">
            {Array.isArray(listaSimulados) && listaSimulados.map((simulado) => (
              <div
                key={simulado.id}
                className="relative border p-4 rounded-lg shadow-md bg-white"
              >
                <h2 className="text-lg text-black font-semibold">
                  Simulado: {simulado.nome}
                </h2>
                <p className="text-black font-semibold">Data: {simulado.data}</p>

                {/* Ícones de edição e exclusão */}
                <div className="absolute top-4 right-4 flex gap-3">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleEditClick(simulado)}
                  >
                    <Settings size={24} />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    onClick={() => handleDeleteClick(simulado)}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-black font-medium text-center pb-3">
                      Gabarito
                    </p>
                    <InputFile
                      id={`gabarito_${simulado.id}`}
                      label={simulado.gabarito}
                      setGabarito={() => {}}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <p className="text-black font-medium text-center pb-3">
                      Respostas
                    </p>
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
        </div>
      ))}
    </div>
  ))}
  </div>)}
      {/* Popup de Confirmação */}
      {simuladoParaExcluir && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg text-black font-bold">
              Tem certeza que deseja excluir o simulado:<br />
              <span className="text-black">{simuladoParaExcluir.nome}</span>?
            </h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setSimuladoParaExcluir(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

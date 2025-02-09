"use client";

import Header from "@/components/header";
import InputFile from "@/components/fileinput";
import DateInput from "@/components/dateinput";
import SimuladoInput from "@/components/simuladoinput";
import { useState, useEffect } from "react";
import InputFileRespostas from "@/components/fileinputrespostas";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function EditarEnvioSimulado() {
  const [simuladoNome, setSimuladoNome] = useState<string>("");
  const [dataSimulado, setDataSimulado] = useState<string>("");
  const [gabarito, setGabarito] = useState<Record<string, string>>({});
  const [respostas, setRespostas] = useState<Record<string, Record<string, string>>>({});
  const [cookies] = useCookies(["token_auth"]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/simuladosAPI/obterSimulado/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setSimuladoNome(data.nome);
          setDataSimulado(data.data);
          setGabarito(data.gabarito);
          setRespostas(data.respostas);
        })
        .catch((error) => {
          console.error("Erro ao carregar simulado:", error);
          alert("Erro ao carregar simulado para edição.");
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    console.log("Editando Simulado ID:", id);
    console.log("Simulado Nome:", simuladoNome);
    console.log("Data Simulado:", dataSimulado);
    console.log("Gabarito:", gabarito);
    console.log("Respostas:", respostas);

    if (!simuladoNome || !dataSimulado || Object.keys(gabarito).length === 0 || Object.keys(respostas).length === 0) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const payload = {
      nome: simuladoNome,
      data: dataSimulado,
      gabarito,
      respostas,
    };

    try {
      const token = cookies.token_auth;
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(`http://localhost:8000/simuladosAPI/editarSimulado/${id}/`, requestOptions);

      if (!response.ok) {
        throw new Error(`Erro ao editar simulado: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Simulado editado com sucesso!", data);
      alert("Simulado editado com sucesso!");
      router.push("/visualizarSimulados");
    } catch (error) {
      console.error("❌ Erro ao editar simulado:", error);
      alert("Erro ao editar simulado. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      <Header isadmin />

      <div className="flex flex-col items-center gap-4 mx-auto w-full p-8">
        <SimuladoInput value={simuladoNome} onChange={(value) => setSimuladoNome(value)} />
        <DateInput value={dataSimulado} onChange={(value) => setDataSimulado(value)} />
      </div>

      <div className="grid grid-cols-2 gap-4 w-3/4 max-w-xl mt-6">
        <InputFile id="gabarito_input" label="Faça o upload do gabarito" setGabarito={setGabarito} />
        <InputFileRespostas id="respostas_input" label="Faça o upload das respostas dos alunos" setGabarito={setRespostas} />
      </div>

      <button onClick={handleSubmit} className="mt-10 bg-teal-600 text-white font-bold py-2 px-4 rounded">
        Salvar alterações
      </button>
    </div>
  );
}

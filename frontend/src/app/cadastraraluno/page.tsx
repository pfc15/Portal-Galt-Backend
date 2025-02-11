"use client";

import ButtonGalt from "@/components/button";
import InputGalt from "@/components/input";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { toast } from 'sonner';



export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [cookies] = useCookies(["token_auth"]);
  const router = useRouter();

  function Cadastrar() {

    const periodoFormatado = periodo.replace(/\s/g, '');
    const formattedUsername = username.replace(/\s/g, '_');

    const data = {
        username: formattedUsername,
        email,
        password,
        periodo: periodoFormatado
      };
    console.log("Enviando dados:", data);

    if (!cookies.token_auth) {
      console.error("Token não encontrado!");
      return;
    }

    console.log("Enviando dados:", data);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${cookies.token_auth}`,
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8000/signup/", requestOptions)
  .then(async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
      // Erros 4xx/5xx
      throw new Error(data.detail || "Erro desconhecido do servidor");
    }

    // Verificação de segurança
    if (!data.aluno?.username) {
      throw new Error("Estrutura da resposta inválida");
    }

    // Mensagem de sucesso
    toast.success('Aluno cadastrado!', {
      description: `${data.aluno.username} - ${data.aluno.turma}`,
      position: 'bottom-right'
    });
    router.push("/visualizaralunos");
  })
  .catch((error) => {
    console.error("Erro na requisição:", error);
    alert(error.message || "❌ Falha na comunicação com o servidor");
  });
  }

  return (
    <div>
      <Header isadmin />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="bg-white shadow sm:rounded-lg flex justify-center flex-1 p-6">
          <div className="lg:w-2/3 xl:w-1/2 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Cadastrando um novo aluno</h2>
            <div className="mt-6 flex flex-col items-center font-museo">
              <div className="w-full flex-1">
                <div className="mx-auto max-w-sm">
                  <InputGalt type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputGalt type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <InputGalt type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputGalt type="text" placeholder="ex: Diurno 2025" value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
                  <div className="flex gap-4 mt-4">
                    <ButtonGalt text="Cadastrar" svg="user-plus" onClick={Cadastrar} />
                    <button className="mt-5 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => router.push("/visualizaralunos")}>Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
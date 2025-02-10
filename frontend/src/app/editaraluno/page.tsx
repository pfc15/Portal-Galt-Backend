"use client";

import InputGalt from "@/components/input";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";

export default function EditarAluno() {
  const searchParams = useSearchParams();
  const nomeURL = searchParams.get("nome") || "";
  const emailURL = searchParams.get("email") || "";
  const periodoURL = searchParams.get("periodo") || "";

  const [username, setUsername] = useState(nomeURL);
  const [email, setEmail] = useState(emailURL);
  const [periodo, setPeriodo] = useState(periodoURL);
  const [password, setPassword] = useState("");
  const [cookies] = useCookies(["token_auth"]);
  const router = useRouter();

  useEffect(() => {
    setUsername(nomeURL);
  }, [nomeURL]);

  function Editar() {
    const data = {
      username,
      email,
      password: password || undefined,
      periodo,
    };
    console.log("Enviando dados:", data);
    
    if (!cookies.token_auth) {
      console.error("Token não encontrado!");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${cookies.token_auth}`,
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8000/signup/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cadastro realizado com sucesso:", data);
        alert("Aluno cadastrado com sucesso!");
        router.push("/visualizaralunos");
      })
      .catch((error) => console.error("Erro ao cadastrar:", error));
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="m-0 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1 p-6">
          <div className="lg:w-2/3 xl:w-1/2 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Editando informações do aluno: {username}</h2>
            <div className="mt-6 flex flex-col items-center font-museo">
              <div className="w-full flex-1">
                <div className="mx-auto max-w-sm">
                  <InputGalt type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputGalt type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <InputGalt type="password" placeholder="Nova Senha (opcional)" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputGalt type="text" placeholder="ex: Diurno 2025" value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
                  <div className="flex justify-evenly items-center gap-4 mt-4">
                    <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800" onClick={Editar}>Salvar Alterações</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => router.push("/visualizaralunos")}>Cancelar</button>
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

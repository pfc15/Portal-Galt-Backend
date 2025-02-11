"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import PeriodoDropdown from "@/components/periodoDD";
import cookie, { useCookies } from "react-cookie";
import AlunoFiltro from "@/components/alunofiltro";
import { Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


interface user{
    nome: string,
    email:string,
    turma: string
}
// Lista mockada de alunos
const mockAlunos = [
  { nome: "Lucas", email: "lucas@example.com", turma: "Diurno2025" },
  { nome: "Maria", email: "maria@example.com", turma: "Diurno2025" },
  { nome: "João", email: "joao@example.com", turma: "Noturno2025" },
  { nome: "Ana", email: "ana@example.com", turma: "Noturno2025" },
  { nome: "Pedro", email: "pedro@example.com", turma: "Diurno2025" },
  { nome: "Carla", email: "carla@example.com", turma: "Noturno2025" },
];

export default function VisualizarAlunos() {
  const [selectedAluno, setSelectedAluno] = useState<string>("");
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string | null>(
    null
  );
  const [cookie, setCookie] = useCookies(["token_auth"]);
  const [alunosFiltrados, setAlunosFiltrados] = useState(mockAlunos);
  const [alunoParaExcluir, setAlunoParaExcluir] = useState<string | null>(null);
  const router = useRouter();
  const [ alunos, setAlunos] = useState<user[]>([])

  useEffect(()=>{
    const requestOptions = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${cookie.token_auth}`
        }
    };
  fetch("http://localhost:8000/frequenciaAPI/getAllstudentsComplete/", requestOptions).then(
    response => {
      if (!response.ok) {
        throw new Error('Network not ok')
      }
      return response.json()
    }
  ).then(data => {
        setAlunos(data["lista_usuario"])
        console.log(data["lista_usuario"])
  })
  }, [])

//   useEffect(() =>{
//     if (alunoParaExcluir!=null){
//         const data = {
//             username: alunoParaExcluir,
//           };
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${cookie.token_auth}`
//             },
//             body: JSON.stringify(data),
//         };
//       fetch(`http://localhost:8000/delete/`, requestOptions).then(
//         response => {
//           if (!response.ok) {
//             throw new Error('Network not ok')
//           }
//           return response.json()
//         }
//       ).then(data => {
//             console.log("consegui deletar!")
//       })
//     }
    
//   }, [alunoParaExcluir])
    


  useEffect(() => {
    let alunosFiltrados = alunos;

    if (periodoSelecionado) {
      alunosFiltrados = alunosFiltrados.filter(
        (aluno) =>
          aluno.turma.toLowerCase() === periodoSelecionado.toLowerCase()
      );
    }

    if (selectedAluno) {
      alunosFiltrados = alunosFiltrados.filter((aluno) =>
        aluno.nome.toLowerCase().includes(selectedAluno.toLowerCase())
      );
    }

    setAlunosFiltrados(alunosFiltrados);
  }, [selectedAluno, periodoSelecionado]);

  useEffect(() => {
    setSelectedAluno("");
  }, [periodoSelecionado]);

  const handleDeleteClick = (nome: string) => {
    setAlunoParaExcluir(nome);
  };

  const confirmDelete = () => {
    if (alunoParaExcluir) {
      setAlunosFiltrados(
        alunosFiltrados.filter((a) => a.nome !== alunoParaExcluir)
      );
      setAlunoParaExcluir(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isadmin />
      <div className="max-w-6xl mx-auto p-4 w-400">
        <div className="flex justify-evenly items-center gap-4 mb-4 mx-auto w-full">
          <button
            className="bg-teal-800 text-white font-medium px-4 py-3 rounded-lg"
            onClick={() => router.push("/cadastraraluno")}
          >
            Cadastrar Aluno
          </button>
          <PeriodoDropdown
            onSelect={setPeriodoSelecionado}
            label="Filtre por período:"
          />
          <AlunoFiltro onFilter={setSelectedAluno} label="Filtre por aluno:" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl text-black font-bold mb-4">
            Alunos Cadastrados
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {alunosFiltrados.length > 0 ? (
              <ul className="space-y-4">
                {alunosFiltrados.map((aluno, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-200 pb-2 relative"
                  >
                    <p className="text-lg text-black font-semibold">
                      {aluno.nome}
                    </p>
                    <p className="text-sm text-gray-600">{aluno.email}</p>
                    <p className="text-sm text-gray-600">
                      {aluno.turma.replace(/(\D+)(\d+)/, "$1 $2")}
                    </p>
                    <div className="absolute top-4 right-4 flex gap-3">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          router.push(`/editaraluno?nome=${encodeURIComponent(aluno.nome)}`)}>
                        <Settings size={24} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        onClick={() => handleDeleteClick(aluno.nome)}
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Nenhum aluno encontrado.</p>
            )}
          </div>
        </div>
      </div>

      {alunoParaExcluir && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg text-black font-bold">
              Tem certeza que deseja excluir o aluno:
              <br />
              <span className="text-black">{alunoParaExcluir}</span>?
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
                onClick={() => setAlunoParaExcluir(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

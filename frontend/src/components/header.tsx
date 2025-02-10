'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface isadmin {
  isadmin?: boolean;
}

export default function Header({ isadmin }: isadmin) {
  const [navBar, setNavBar] = useState(false);
  const [activePath, setActivePath] = useState('');
  const [showSimuladoDropdown, setShowSimuladoDropdown] = useState(false);
  const [showAlunoDropdown, setShowAlunoDropdown] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleNavLinkClick = () => {
    setNavBar(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  const handleMouseEnter = (dropdown: 'simulado' | 'aluno') => {
    if (closeTimeout) {
      clearTimeout(closeTimeout); // Cancela o fechamento se o mouse voltar
    }
    if (dropdown === 'simulado') {
      setShowSimuladoDropdown(true);
    } else if (dropdown === 'aluno') {
      setShowAlunoDropdown(true);
    }
  };

  const handleMouseLeave = (dropdown: 'simulado' | 'aluno') => {
    const timeout = setTimeout(() => {
      if (dropdown === 'simulado') {
        setShowSimuladoDropdown(false);
      } else if (dropdown === 'aluno') {
        setShowAlunoDropdown(false);
      }
    }, 300); // Tempo mínimo antes de fechar (300ms)
    setCloseTimeout(timeout);
  };

  return (
    <header className="w-full h-[100px] bg-teal-600 z-50 relative">
      <div className="w-full h-full px-[35px] mx-auto flex justify-between items-center">
        <div className="flex items-center w-[30%]">
          <div className="mx-2">
            <Link href={isadmin ? '/homeadmin' : '/home'}>
              <Image src="/assets/Galt.png" alt="logo" width={200} height={200} />
            </Link>
          </div>
        </div>
        <div
          className={`fixed top-0 right-0 h-full w-1/3 transition-transform transform duration-300
            ${navBar ? 'translate-x-0' : 'translate-x-full'} md:static md:translate-x-0 md:w-[50%] md:flex md:justify-between md:items-center z-50`}
        >
          <div className={`flex flex-col w-full h-full md:h-auto ${navBar && 'mt-10'}`}>
            <ul className="w-full flex flex-col md:flex-row justify-center md:justify-between text-white font-extrabold mt-16 md:mt-0">
              <li className="w-full md:w-[30%] flex justify-left ml-2 text-lg">
                <Link href={isadmin ? '/homeadmin' : '/home'}>
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-b-white py-2 md:py-0 ${
                      activePath === (isadmin ? '/homeadmin' : '/home') ? 'font-bold border-b-white' : 'font-normal'
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    HOME
                  </button>
                </Link>
              </li>
              {/* Dropdown de Simulados */}
              <li
                className="relative w-full md:w-[30%] flex justify-left ml-2 text-lg"
                onMouseEnter={isadmin ? () => handleMouseEnter('simulado') : undefined}
                onMouseLeave={isadmin ? () => handleMouseLeave('simulado') : undefined}
              >
                {isadmin ? (
                  <>
                    <button
                      className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-b-white py-2 md:py-0 ${
                        activePath.includes('simulado') ? 'font-bold border-b-white' : 'font-normal'
                      }`}
                    >
                      SIMULADOS
                    </button>
                    {showSimuladoDropdown && (
                      <div 
                        className="absolute top-full left-0 w-48 bg-teal-700 text-white shadow-md rounded-md mt-2"
                        onMouseEnter={() => handleMouseEnter('simulado')} // Evita o fechamento ao entrar no dropdown
                        onMouseLeave={() => handleMouseLeave('simulado')} // Fecha com atraso ao sair
                      >
                        <Link href="/enviosimulado">
                          <div className="px-4 py-2 hover:bg-gray-400 hover:rounded-t-md cursor-pointer">ADICIONAR SIMULADO</div>
                        </Link>
                        <Link href="/visualizarsimulados">
                          <div className="px-4 py-2 hover:bg-gray-400 cursor-pointer">VISUALIZAR ENVIOS</div>
                        </Link>
                        <Link href="/simuladoadmin">
                          <div className="px-4 py-2 hover:bg-gray-400 hover:rounded-b-md cursor-pointer">VISUALIZAR RESULTADOS</div>
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href="/simuladoaluno">
                    <button
                      className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-b-white py-2 md:py-0 ${
                        activePath.includes('simulado') ? 'font-bold border-b-white' : 'font-normal'
                      }`}
                      onClick={handleNavLinkClick}
                    >
                      SIMULADOS
                    </button>
                  </Link>
                )}
              </li>
              <li className="w-full md:w-[30%] flex justify-left ml-2 text-lg">
                <Link href={isadmin ? '/frequenciaadmin' : '/frequenciaaluno'}>
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-b-white py-2 md:py-0 ${
                      activePath.includes('frequencia') ? 'font-bold border-b-white' : 'font-normal'
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    FREQUÊNCIA
                  </button>
                </Link>
              </li>
              {/* Dropdown de Alunos (apenas para admin) */}
              {isadmin && (
                <li
                  className="relative w-full md:w-[30%] flex justify-left ml-2 text-lg"
                  onMouseEnter={() => handleMouseEnter('aluno')}
                  onMouseLeave={() => handleMouseLeave('aluno')}
                >
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-b-white py-2 md:py-0 ${
                      activePath.includes('aluno') ? 'font-bold border-b-white' : 'font-normal'
                    }`}
                  >
                    ALUNO
                  </button>
                  {showAlunoDropdown && (
                    <div 
                      className="absolute top-full left-0 w-48 bg-teal-700 text-white shadow-md rounded-md mt-2"
                      onMouseEnter={() => handleMouseEnter('aluno')} // Evita o fechamento ao entrar no dropdown
                      onMouseLeave={() => handleMouseLeave('aluno')} // Fecha com atraso ao sair
                    >
                      <Link href="/visualizaralunos">
                        <div className="px-4 py-2 hover:bg-gray-400 hover:rounded-t-md cursor-pointer">VISUALIZAR ALUNOS</div>
                      </Link>
                      <Link href="/cadastraraluno">
                        <div className="px-4 py-2 hover:bg-gray-400 hover:rounded-b-md cursor-pointer">CADASTRAR ALUNO</div>
                      </Link>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {navBar && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={() => setNavBar(false)} />
      )}
    </header>
  );
}
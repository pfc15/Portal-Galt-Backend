'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect} from 'react';

export default function Header() {
  const [navBar, setNavBar] = useState(false);
  const [activePath, setActivePath] = useState('');

  const handleNavLinkClick = () => {
    setNavBar(false);
  };

  // Set the active path based on activePath
   useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(activePath);
    }
  }, []);

  return (
    <header className="w-full h-[100px] bg-teal-600 z-50 relative">
      <div className="w-full h-full px-[35px] mx-auto flex justify-between items-center">
        <div className="flex items-center w-[30%]">
          <div className="mx-2">
            <Link href="/home">
              <Image src="/assets/Galt.png" alt="logo" width={200} height={200} />
            </Link>
          </div>
        </div>
        <div className={`md:hidden flex items-center z-[60] ${navBar ? 'fixed top-12 right-12' : 'relative'}`}>
          <button data-testid="sandwich" onClick={() => setNavBar(!navBar)} className="text-white">
            {/* {navBar ? <X size={24} /> : <List size={24} />} */}
          </button>
        </div>
        <div
          className={`fixed top-0 right-0 h-full w-1/3 transition-transform transform duration-300
            ${navBar ? 'translate-x-0' : 'translate-x-full'} md:static md:translate-x-0 md:w-[50%] md:flex md:justify-between md:items-center z-50`}
        >
          <div className={`flex flex-col w-full h-full md:h-auto ${navBar && 'mt-10'}`}>
            <ul className="w-full flex flex-col md:flex-row justify-center md:justify-between text-white font-extrabold mt-16 md:mt-0">
              <li className="w-full md:w-[30%] flex justify-left ml-2 text-lg ">
                <Link href="/home">
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-b-white py-2 md:py-0 ${
                      activePath === '/' ? 'font-bold' : 'font-normal'
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    HOME
                  </button>
                </Link>
              </li>
              <li className="w-full md:w-[30%] flex justify-left ml-2 text-lg">
                <Link href="/simulados">
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-white py-2 md:py-0 ${
                      activePath === '/search' ? 'font-bold' : 'font-normal'
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    SIMULADOS
                  </button>
                </Link>
              </li>
              <li className="w-full md:w-[30%] flex justify-left ml-2 text-lg">
                <Link href="/frequencia">
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-white py-2 md:py-0 ${
                      activePath === '/about' ? 'font-bold' : 'font-normal'
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    FREQUÊNCIA
                  </button>
                </Link>
              </li>
              <li className="w-full md:w-[30%] flex justify-left ml-2 text-lg">
                <Link href="/dados">
                  <button
                    className={`flex justify-center border-b-2 border-transparent transition duration-500 hover:border-white py-2 md:py-0 ${
                      activePath === '/data' ? 'font-bold' : 'font-normal'
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    DADOS
                  </button>
                </Link>
              </li>
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

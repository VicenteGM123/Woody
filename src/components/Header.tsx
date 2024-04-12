import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white min-h-[81px] w-full z-20 top-0 start-0 border-b border-gray-200 font-inter">
      <div className="min-h-[81px] max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-full">
        <Link
          to="/"
          className="text-3xl font-extrabold mr-4 bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text space-x-3"
        >
          Woody
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoading && isAuthenticated && (
            <button
              type="button"
              onClick={() => logout()}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
            >
              <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Cerrar sesión
              </span>
            </button>
          )}
          {!isLoading && !isAuthenticated && (
            <button
              type="button"
              onClick={() => loginWithRedirect()}
              className="font-inter text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 text-center"
            >
              Iniciar sesión
            </button>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu} // Agrega el evento onClick
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen ? "true" : "false"} // Cambia el estado de aria-expanded en base al estado del menú
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Agrega la clase 'block' y el estilo 'display' en base al estado del menú */}
        {!isLoading && isAuthenticated && (
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } md:block items-center text-lg justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/train"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
                >
                  Entrenar
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

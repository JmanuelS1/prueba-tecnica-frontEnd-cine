"use client";

/**
 * Importaciones necesarias para el componente Navbar
 */
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "./LoginModal";
import { MdLogout } from "react-icons/md";

/**
 * Componente Navbar
 *
 * @component
 * @description
 * Barra de navegación principal de la aplicación.
 * Incluye:
 * - Logo de la aplicación
 * - Enlaces de navegación (Popular, Favorites)
 * - Control de autenticación (Login/Logout)
 * - Modal de inicio de sesión
 *
 * La barra se mantiene fija en la parte superior y es responsive.
 *
 * @returns {JSX.Element} Barra de navegación con todas sus funcionalidades
 */
export default function Navbar(): JSX.Element {
  /**
   * Hook de autenticación que proporciona:
   * - Estado de autenticación
   * - Control del modal de login
   * - Función de cierre de sesión
   */
  const { isAuthenticated, toggleLoginModal, logout } = useAuth();

  return (
    <>
      {/* Barra de navegación principal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Links de navegación */}
            <div className="flex max-w-[400px] gap-10">
              {/* Logo con enlace a inicio */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/Logo.png"
                  alt="Quickbet Movies"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              {/* Enlaces de navegación - visibles en desktop */}
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/popular"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Popular
                </Link>
                <Link
                  href="/favorites"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Favorites
                </Link>
              </div>
            </div>

            {/* Control de autenticación */}
            <div className="flex items-center">
              {isAuthenticated ? (
                // Usuario autenticado: muestra icono de usuario y botón de logout
                <div className="flex items-center gap-2">
                  <FaUserCircle className="w-6 h-6 text-yellow" />
                  <button
                    onClick={logout}
                    className="flex items-center text-white transition-colors hover:text-greenFluorescent"
                    aria-label="Logout"
                  >
                    <MdLogout className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                // Usuario no autenticado: muestra botón de login
                <button
                  onClick={toggleLoginModal}
                  className="flex items-center text-gray-400 transition-colors hover:text-white"
                  aria-label="Login"
                >
                  <FaUserCircle className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Modal de inicio de sesión */}
      <LoginModal />
    </>
  );
}

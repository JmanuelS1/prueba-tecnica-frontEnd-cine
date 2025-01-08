"use client"
import Image from 'next/image'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import LoginModal from './LoginModal'
import { MdLogout } from 'react-icons/md'

export default function Navbar() {
  const { isAuthenticated, toggleLoginModal, logout } = useAuth()
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Links de navegación */}
            <div className="flex max-w-[400px] gap-10">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/Logo.png"
                  alt="Quickbet Movies"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
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
            {/* Icono de Usuario (Login o Logout) */}
            <div className="flex items-center">
              {isAuthenticated ? (
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
      <LoginModal />
    </>
  )
}

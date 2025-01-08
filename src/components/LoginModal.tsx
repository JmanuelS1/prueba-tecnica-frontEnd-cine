"use client"

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import Image from 'next/image'

export default function AuthModal() {
  const { isOpen, closeModal, login } = useAuth()
  const [isLoginView, setIsLoginView] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    
    if (isLoginView) {
      await login(data)
    } else {
      // Solo mostrar un console.log para el registro
      console.log('Register functionality is not implemented', data)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="w-full max-w-4xl h-[600px] transform overflow-hidden rounded-2xl shadow-xl transition-all
                       animate-[fadeIn_0.3s_ease-out]"
          >
            <div className="flex h-full">
              {/* Left Section */}
              <div className="w-1/2 p-6 backdrop-blur-xl">
                <button 
                  onClick={closeModal}
                  className="flex items-center text-white hover:text-white/60 transition-colors mb-6"
                >
                  <IoArrowBack className="w-4 h-4 mr-2" />
                  Back
                </button>

                <div className="flex flex-col justify-center h-[calc(100%-48px)]">
                  <div className="relative flex w-7/12 h-14 rounded-md bg-gray-800 mb-8 mx-auto">
                    <button
                      className={`relative flex-1 rounded-md px-4 text-sm font-medium transition-colors duration-200 focus:outline-none
                        ${!isLoginView 
                          ? 'text-black bg-yellow' 
                          : 'text-gray-400 hover:text-white'
                        }`}
                      onClick={() => setIsLoginView(false)}
                    >
                      Sign up
                    </button>
                    <button
                      className={`relative flex-1 rounded-md px-4 text-sm font-medium transition-colors duration-200 focus:outline-none
                        ${isLoginView 
                          ? 'text-black bg-yellow' 
                          : 'text-gray-400 hover:text-white'
                        }`}
                      onClick={() => setIsLoginView(true)}
                    >
                      Log In
                    </button>
                  </div>

                  <div className="relative">
                    <div className={`transition-all duration-300 ${isLoginView ? 'block' : 'hidden'}`}>
                      <form onSubmit={handleSubmit} className="space-y-4 justify-center items-center">
                        <div>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-yellow hover:bg-yellow-600 text-black"
                        >
                          Continue
                        </Button>
                      </form>
                    </div>
                    
                    <div className={`transition-all duration-300 ${!isLoginView ? 'block' : 'hidden'}`}>
                      <form onSubmit={handleSubmit} className="space-y-4 justify-center items-center">
                        <div>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-yellow hover:bg-yellow-600 text-black"
                        >
                          Register
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-1/2 bg-gray-800 p-8 flex flex-col h-full">
                <div className="flex flex-col flex-1 justify-center items-center text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {isLoginView ? 'Welcome back to' : 'Welcome to'} Quickbet Movies!
                  </h3>
                  <div className="h-20 mb-8">
                    <p className="text-gray-300">
                      {isLoginView 
                        ? '🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!'
                        : '🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!'}
                    </p>
                  </div>
                  <div className="relative w-full flex-1">
                    <Image
                      src={isLoginView ? "/images/login-banner.png" : "/images/signup-banner.png"}
                      alt="Quickbet Movies"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
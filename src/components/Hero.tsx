'use client'

import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { useFavorites } from '@/hooks/useFavorites'
import { Button } from './ui/Button'
import { useAuth } from '@/hooks/useAuth'

/**
 * Interface para las propiedades del componente Hero
 * 
 * @interface HeroProps
 * @property {Object} movie - Información de la película a mostrar
 * @property {number} movie.id - ID único de la película
 * @property {string} movie.title - Título de la película
 * @property {string} movie.backdrop_path - Ruta de la imagen de fondo
 * @property {string} movie.overview - Descripción de la película
 * @property {number} movie.vote_average - Puntuación promedio (0-10)
 */
interface HeroProps {
  movie: {
    id: number
    title: string
    backdrop_path: string
    overview: string
    vote_average: number
  }
}

/**
 * Componente Hero para mostrar la película destacada
 * 
 * @component
 * @description
 * Muestra una sección hero con la información principal de una película,
 * incluyendo imagen de fondo, título, descripción, puntuación y botón de favoritos.
 * 
 * @param {HeroProps} props - Propiedades del componente
 * @returns {JSX.Element} Sección hero con la información de la película
 */
export default function Hero({ movie }: HeroProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { isAuthenticated, toggleLoginModal } = useAuth()
  const rating = Math.round(movie.vote_average * 10)

  /**
   * Maneja el toggle de favoritos
   * Si el usuario está autenticado, alterna el estado de favorito
   * Si no está autenticado, muestra el modal de login
   */
  const handleToggleFavorite = () => {
    if (isAuthenticated) {
      toggleFavorite(movie)
    } else {
      toggleLoginModal()
    }
  }

  return (
    <div className="relative h-[70vh] w-full">
      {/* Contenedor de imagen con overlay */}
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
        <div className="flex justify-between items-end">
          {/* Información de la película */}
          <div className="max-w-6xl space-y-4">
            <h1 className="text-4xl md:text-6xl text-start font-bold text-white">
              {movie.title}
            </h1>
            <p className="text-base text-gray-200 font-bold">{movie.overview}</p>
          </div>

          {/* Controles y puntuación */}
          <div className="flex items-center gap-2">
            {/* Botón de favoritos */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="rounded-full hover:bg-white/10"
            >
              <FaHeart
                className={`w-6 h-6 ml-auto ${
                  isFavorite(movie.id) ? 'text-[#FF3B30]' : 'text-white'
                }`}
              />
            </Button>

            {/* Indicador circular de puntuación */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-green100/30"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-green100"
                  strokeWidth="3"
                  strokeDasharray={`${rating}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                {rating}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
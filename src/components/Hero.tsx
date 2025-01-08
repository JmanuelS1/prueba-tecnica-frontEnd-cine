'use client'

import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { useFavorites } from '@/hooks/useFavorites'
import { Button } from './ui/button'
import { useAuth } from '@/hooks/useAuth'

interface HeroProps {
  movie: {
    id: number
    title: string
    backdrop_path: string
    overview: string
    vote_average: number
  }
}

export default function Hero({ movie }: HeroProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { isAuthenticated, toggleLoginModal } = useAuth()
  const rating = Math.round(movie.vote_average * 10)

  const handleToggleFavorite = () => {
    if (isAuthenticated) {
      toggleFavorite(movie)
    } else {
      toggleLoginModal()
    }
  }

  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover object-top"
          priority
        />
   
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
        <div className="flex justify-between items-end">
          <div className="max-w-6xl space-y-4">
            <h1 className="text-4xl md:text-6xl text-start font-bold text-white">
              {movie.title}
            </h1>
            <p className="text-base text-gray-200 font-bold">{movie.overview}</p>
          </div>

          <div className="flex items-center gap-2">

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="rounded-full hover:bg-white/10"
            >
              <FaHeart
                className={`w-6 h-6 ml-auto ${isFavorite(movie.id)
                  ? 'text-[#FF3B30]'
                  : 'text-white'
                  }`}
              />
            </Button>

            
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

// 'use client'

// import Image from 'next/image'
// import { FaHeart } from 'react-icons/fa'
// import { useFavorites } from '@/hooks/use-favorites'
// import { Button } from './ui/button'

// interface HeroProps {
//   movie: {
//     id: number
//     title: string
//     backdrop_path: string
//     overview: string
//     vote_average: number
//   }
// }

// export default function Hero ({ movie }: HeroProps) {
//   const { toggleFavorite, isFavorite } = useFavorites()
//   const rating = Math.round(movie.vote_average * 10)

//   return (
//     <div className="relative h-[800px] w-full">

//       <div className="absolute inset-0">
//         <Image
//           src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//           alt={movie.title}
//           fill
//           className="object-cover object-top"
//           priority
//         />
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
//         <div className="flex justify-between items-end">
//           <div className="max-w-3xl space-y-4">
//             <h1 className="text-4xl md:text-6xl text-start font-bold text-white">
//               {movie.title}
//             </h1>
//             <p className="text-base text-gray-200 font-bold">
//               {movie.overview}
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Favorite Button */}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => toggleFavorite(movie)}
//               className="rounded-full hover:bg-white/10"
//             >
//               <FaHeart
//                 className={`w-6 h-6 ml-auto ${isFavorite(movie.id)
//                     ? "text-red-500"
//                     : "text-white"
//                   }`}
//               />
//             </Button>

//             {/* Rating Circle */}
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
//                 <circle
//                   cx="18"
//                   cy="18"
//                   r="16"
//                   fill="none"
//                   className="stroke-[#204529]"
//                   strokeWidth="3"
//                 />
//                 <circle
//                   cx="18"
//                   cy="18"
//                   r="16"
//                   fill="none"
//                   className="stroke-[#49E989]"
//                   strokeWidth="3"
//                   strokeDasharray={`${rating}, 100`}
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
//                 {rating}%
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
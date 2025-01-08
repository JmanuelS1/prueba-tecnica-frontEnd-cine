"use client"

import { useEffect, useState } from 'react'
import { useFavorites } from '@/hooks/useFavorites'
import MovieGrid from '@/components/MovieGrid'
import { Movie } from '@/types/Movie'

export default function Favorites () {
  const { getFavorites } = useFavorites()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  useEffect(() => {
    setFavoriteMovies(getFavorites())
  }, [getFavorites])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Favorites</h1>
        {favoriteMovies.length > 0 ? (
          <MovieGrid title="Favorite Movies" movies={favoriteMovies} />
        ) : (
          <p className="text-xl">You haven't added any movies to your favorites yet.</p>
        )}
      </div>
    </div>
  )
}


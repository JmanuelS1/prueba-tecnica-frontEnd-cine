import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: any[]
  toggleFavorite: (movie: any) => void
  isFavorite: (id: number) => boolean
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (movie) => {
        const { favorites } = get()
        const exists = favorites.find((f) => f.id === movie.id)
        if (exists) {
          set({ favorites: favorites.filter((f) => f.id !== movie.id) })
        } else {
          set({ favorites: [...favorites, movie] })
        }
      },
      isFavorite: (id) => {
        const { favorites } = get()
        return favorites.some((f) => f.id === id)
      },
    }),
    {
      name: 'favorites-storage', 
    }
  )
)

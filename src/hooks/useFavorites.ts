/**
 * Importaciones necesarias para el store de favoritos
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interface que define la estructura del estado de favoritos
 * 
 * @interface FavoritesState
 * @property {any[]} favorites - Array de películas favoritas
 * @property {Function} toggleFavorite - Función para agregar/quitar favoritos
 * @property {Function} isFavorite - Función para verificar si una película es favorita
 */
interface FavoritesState {
  favorites: any[];
  toggleFavorite: (movie: any) => void;
  isFavorite: (id: number) => boolean;
}

/**
 * Hook personalizado para manejar películas favoritas
 * 
 * @hook useFavorites
 * @description
 * Proporciona un store persistente de Zustand para gestionar las películas favoritas.
 * 
 * Funcionalidades:
 * - Almacenamiento persistente en localStorage
 * - Agregar/quitar películas de favoritos
 * - Verificar si una película está en favoritos
 * - Mantiene el estado entre recargas de página
 * 
 * @example
 * const { favorites, toggleFavorite, isFavorite } = useFavorites();
 * 
 * // Agregar/quitar de favoritos
 * toggleFavorite(movie);
 * 
 * // Verificar si es favorito
 * const isMovieFavorite = isFavorite(movieId);
 * 
 * // Acceder a la lista de favoritos
 * console.log(favorites);
 */
export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      /**
       * Array de películas favoritas
       */
      favorites: [],

      /**
       * Alterna el estado de favorito de una película
       * @param {any} movie - Película a agregar/quitar de favoritos
       */
      toggleFavorite: (movie) => {
        const { favorites } = get();
        const exists = favorites.find((f) => f.id === movie.id);
        if (exists) {
          set({ favorites: favorites.filter((f) => f.id !== movie.id) });
        } else {
          set({ favorites: [...favorites, movie] });
        }
      },

      /**
       * Verifica si una película está en favoritos
       * @param {number} id - ID de la película a verificar
       * @returns {boolean} true si la película está en favoritos
       */
      isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some((f) => f.id === id);
      },
    }),
    {
      name: "favorites-storage", // Nombre de la clave en localStorage
    }
  )
);
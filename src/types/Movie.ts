/**
 * Interface que define la estructura de una película
 * @interface Movie
 */
export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

/**
 * Interface que extiende Movie para incluir detalles adicionales
 * @interface MovieDetail
 * @extends {Movie}
 * @description
 * Contiene toda la información de Movie más campos adicionales
 * específicos para la vista detallada de una película
 */
export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  vote_count: number;
}

/**
 * Interface que define la estructura de un género
 * @interface Genre
 * @description
 * Representa un género cinematográfico
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Interface que define la estructura de un video relacionado
 * @interface MovieVideo
 * @description
 * Representa videos asociados a una película (trailers, teasers, etc.)
 */
export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

/**
 * Interface que define la estructura de una palabra clave
 * @interface Keyword
 * @description
 * Representa keywords/tags asociados a una película
 */
export interface Keyword {
  id: number;
  name: string;
}

/**
 * Interface que define la estructura de respuesta de la API
 * @interface ApiResponse
 * @description
 * Estructura genérica para las respuestas paginadas de la API
 */
export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * Interface para los parámetros de búsqueda
 * @interface SearchParams
 * @description
 * Parámetros utilizados para filtrar películas
 */
export interface SearchParams {
  genre?: string;
  search?: string;
  page?: number;
}

/**
 * Interface para el estado de carga
 * @interface LoadingState
 * @description
 * Estados posibles durante la carga de datos
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

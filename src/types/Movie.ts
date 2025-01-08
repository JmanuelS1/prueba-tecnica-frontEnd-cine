/**
 * Interface que define la estructura de una película
 *
 * @interface Movie
 * @description
 * Representa la estructura de datos de una película en la aplicación.
 * Esta interface se utiliza para tipar los datos recibidos de la API de TMDB
 * y mantener consistencia en toda la aplicación.
 *
 * @property {number} id - Identificador único de la película
 * @property {string} title - Título de la película
 * @property {string} backdrop_path - Ruta de la imagen de fondo (formato: "/path/to/image.jpg")
 * @property {string} poster_path - Ruta del póster de la película (formato: "/path/to/poster.jpg")
 * @property {string} overview - Sinopsis o descripción de la película
 * @property {number} vote_average - Puntuación promedio (escala 0-10)
 * @property {string} release_date - Fecha de estreno (formato: "YYYY-MM-DD")
 * @property {number[]} genre_ids - Array de IDs de géneros asociados a la película
 *
 * @example
 * const movie: Movie = {
 *   id: 550,
 *   title: "Fight Club",
 *   backdrop_path: "/path/to/backdrop.jpg",
 *   poster_path: "/path/to/poster.jpg",
 *   overview: "An insomniac office worker...",
 *   vote_average: 8.4,
 *   release_date: "1999-10-15",
 *   genre_ids: [18, 53, 35]
 * };
 *
 * @usage
 * // En componentes
 * const [movies, setMovies] = useState<Movie[]>([]);
 *
 * // En props
 * interface MovieCardProps {
 *   movie: Movie;
 * }
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

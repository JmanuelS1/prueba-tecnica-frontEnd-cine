/**
 * Importación del componente de detalles de película
 */
import MovieDetails from "@/components/MovieDetails";
import { type MovieDetail } from "@/types/Movie";

/**
 * Configuración para forzar el renderizado dinámico en Next.js
 * Esto asegura que la página se renderice en tiempo de ejecución y no durante el build
 */
export const dynamic = "force-dynamic";

/**
 * Función para obtener los detalles de una película específica de la API de TMDB
 *
 * @async
 * @function getMovie
 * @param {string} id - ID de la película a consultar
 * @returns {Promise<MovieDetail | null>} Detalles de la película o null en caso de error
 */
async function getMovie(id: string): Promise<MovieDetail | null> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      options,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

/**
 * Componente de página para mostrar detalles de una película específica
 */
export default async function MoviePage({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const movie = await getMovie(params.id);

  // Manejo de error si no se puede cargar la película
  if (!movie) {
    return (
      <main className="w-full min-h-screen bg-gray-900">
        <div className="text-white text-center py-10">
          Error loading movie details
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <MovieDetails movie={movie} />
    </main>
  );
}
/**
 * Importación del componente de detalles de película
 */
import MovieDetails from "@/components/MovieDetails";

/**
 * Configuración para forzar el renderizado dinámico en Next.js
 * Esto asegura que la página se renderice en tiempo de ejecución y no durante el build
 */
export const dynamic = 'force-dynamic';

/**
 * Función para obtener los detalles de una película específica de la API de TMDB
 * 
 * @async
 * @function getMovie
 * @param {string} id - ID de la película a consultar
 * @returns {Promise<any>} Detalles de la película o null en caso de error
 * 
 * @description
 * Realiza una petición GET a la API de TMDB para obtener información detallada
 * de una película específica usando su ID
 */
async function getMovie(id: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

/**
 * Componente de página para mostrar detalles de una película específica
 * 
 * @component MoviePage
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.params - Parámetros de la ruta
 * @param {string} props.params.id - ID de la película a mostrar
 * @returns {Promise<JSX.Element>} Página de detalles de la película
 * 
 * @description
 * Página que muestra los detalles completos de una película específica.
 * Utiliza Server Side Rendering para obtener los datos de la película
 * y mostrar un mensaje de error si la película no se puede cargar.
 */
export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  // Manejo de error si no se puede cargar la película
  if (!movie) {
    return (
      <main className="w-full min-h-screen bg-gray-900">
        <div className="text-white text-center py-10">Error loading movie details</div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <MovieDetails movie={movie} />
    </main>
  );
}
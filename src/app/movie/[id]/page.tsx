import MovieDetails from "@/components/MovieDetails";


export const dynamic = 'force-dynamic';

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



export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);


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
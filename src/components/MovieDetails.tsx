"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaTimes } from 'react-icons/fa';
import { CiPlay1 } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites'; 
import { useAuth } from '@/hooks/useAuth'; 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  tagline: string;
}

interface MovieVideo {
  key: string;
  site: string;
  type: string;
}

interface MovieDetailsProps {
  movie: MovieDetail;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const router = useRouter();
  const [trailer, setTrailer] = useState<MovieVideo | null>(null);
  const [recommendations, setRecommendations] = useState<MovieDetail[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites(); 
  const { isAuthenticated, toggleLoginModal } = useAuth();
  const rating = Math.round(movie.vote_average * 10);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=es-ES&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
          throw new Error('Error al obtener el tráiler');
        }
        const data = await response.json();
        const trailer = data.results.find((video: MovieVideo) =>
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(trailer || null);
      } catch (error) {
        console.error('Error al obtener el tráiler:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=es-ES&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
          throw new Error('Error al obtener las recomendaciones');
        }
        const data = await response.json();
        setRecommendations(data.results.slice(0, 6));
      } catch (error) {
        console.error('Error al obtener las recomendaciones:', error);
      }
    };

    fetchTrailer();
    fetchRecommendations();
  }, [movie.id]);

  const handleToggleFavorite = () => {
    if (isAuthenticated) {
      toggleFavorite(movie);
    } else {
      toggleLoginModal();
    }
  };

  if (!movie) return <div className="text-white text-center py-10">Película no encontrada</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Botón de Regreso */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-20 left-4 z-50 rounded-full bg-black/50 hover:bg-black/70"
        onClick={() => router.back()}
      >
        <FaArrowLeft className="w-5 h-5" />
      </Button>

      {/* Sección Hero */}
      <div className="relative h-[85vh] py-12">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Contenido Principal */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-8">
            <div className="flex gap-12 items-start mt-20">
              {/* Póster */}
              <div className="hidden md:block w-72 flex-shrink-0 relative z-10">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-[290px] mt-4 bg-yellow hover:bg-yellow/80 text-trailerGrey"
                      disabled={!trailer}
                    >
                       Official Trailer <CiPlay1 className="ml-2 text-trailerGrey"  /> 
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    {trailer && (
                      <div className="relative pt-[56.25%]">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${trailer.key}`}
                          title="Reproductor de video de YouTube"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    <Button
                      className="absolute top-2 right-2 bg-transparent hover:bg-white/10 text-white"
                      onClick={() => document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click()}
                    >
                      <FaTimes className="w-6 h-6" />
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Información de la Película */}
              <div className="flex-1 space-y-6 max-w-[85%]">
                <div className="text-4xl font-bold">
                  {movie.title}
                  <span className="text-4xl ml-2">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </div>
                <div className="text-sm text-white flex gap-52">
                  <span>{formatDate(movie.release_date)}</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>

                {movie.tagline && (
                  <p className="text-white italic">{movie.tagline}</p>
                )}

                <div className="max-w-[90%]">
                  <h3 className="text-xl font-semibold mb-2">Overview:</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">"{movie.overview}"</p>

                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center">
                        {/* Círculo de Calificación */}
                        <div className="relative w-16 h-16 mr-4">
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
                          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                            {rating}%
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          <div className="block">Users</div>
                          <div className="block">Score</div>
                        </div>
                      </div>

                      {/* Botón de Favoritos */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-12 w-12 rounded-full hover:bg-white/10 flex items-center justify-center"
                        onClick={handleToggleFavorite}
                      >
                        <FaHeart
                          className={`w-8 h-8 ${isFavorite(movie.id) ? "text-[#FF3B30]" : "text-gray-400"}`}
                        />
                      </Button>
                    </div>

                    {/* Géneros */}
                    <div className="flex flex-wrap justify-center gap-4 w-[80%] mt-10">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-transparent text-detailText border border-detailText rounded-md text-base"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      {recommendations.length > 0 && (
        <div className="px-8 py-6 bg-mainGrey">
          <h2 className="text-2xl font-bold mb-6 text-white">Recomendaciones</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {recommendations.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer"
                onClick={() => router.push(`/movie/${movie.id}`)}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-white text-sm font-semibold text-start line-clamp-2">
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
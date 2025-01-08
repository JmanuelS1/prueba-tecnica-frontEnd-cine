"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { Button } from "./ui/Button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated, toggleLoginModal } = useAuth()



  const rating = Math.round(movie.vote_average * 10);
  const releaseDate = new Date(movie.release_date);
  const releaseFormatted = releaseDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getRatingColor = (rating: number) => {
    if (rating > 60) return { main: "stroke-green100", bg: "stroke-green100/30" };
    if (rating > 40) return { main: "stroke-yellow100", bg: "stroke-yellow100/30" };
    return { main: "stroke-red100", bg: "stroke-red100/30" };
  };

  const ratingColor = getRatingColor(rating);


  const handleToggleFavorite = () => {

    if( isAuthenticated ) {
      toggleFavorite(movie)
    } else{
      toggleLoginModal()
    }

  }

  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden h-full">
      <Link href={`/movie/${movie.id}`} className="block h-[70%]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="bg-[#1C1C1C] p-4 h-[30%]">
        <div className="">
          <h3 className="text-white font-medium truncate">{movie.title}</h3>
          <span className="text-sm text-gray-400">{releaseFormatted}</span>
        </div>

        <div className="flex mx-auto justify-center gap-8 items-center space-x-2 pt-1 pb-1">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-center text-white mb-1">
              Rating
            </span>
            <div className="relative w-11 h-11">
              <svg
                className="w-full h-full rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={ratingColor.bg}
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={ratingColor.main}
                  strokeWidth="3"
                  strokeDasharray={`${rating}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {rating}%
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-center font-bold text-white mb-1">
              Favorite
            </span>
            <div className="relative w-11 h-11 flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleFavorite()}
                className="h-12 w-12 rounded-full hover:bg-white/10 flex items-center justify-center"
              >
                <FaHeart
                  className={cn(
                    "w-8 h-8",
                    isFavorite(movie.id) ? "text-[#FF3B30]" : "text-gray-400"
                  )}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



/*"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { Button } from "./ui/Button";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const rating = Math.round(movie.vote_average * 10);
  const releaseDate = new Date(movie.release_date);
  const releaseFormatted = releaseDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getRatingColor = (rating: number) => {
    if (rating > 60) return { main: "stroke-green100", bg: "stroke-green100/30" };
    if (rating > 40) return { main: "stroke-yellow100", bg: "stroke-yellow100/30" };
    return { main: "stroke-red100", bg: "stroke-red100/30" };
  };

  const ratingColor = getRatingColor(rating);

  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden h-full">
      <Link href={`/movie/${movie.id}`} className="block h-[70%]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="bg-[#1C1C1C] p-4 h-[30%]">
        <div className="">
          <h3 className="text-white font-medium truncate">{movie.title}</h3>
          <span className="text-sm text-gray-400">{releaseFormatted}</span>
        </div>

        <div className="flex mx-auto justify-center gap-8 items-center space-x-2 pt-1 pb-1">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-center text-white mb-1">
              Rating
            </span>
            <div className="relative w-11 h-11">
              <svg
                className="w-full h-full rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={ratingColor.bg}
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={ratingColor.main}
                  strokeWidth="3"
                  strokeDasharray={`${rating}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {rating}%
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-center font-bold text-white mb-1">
              Favorite
            </span>
            <div className="relative w-11 h-11 flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(movie)}
                className="h-12 w-12 rounded-full hover:bg-white/10 flex items-center justify-center"
              >
                <FaHeart
                  className={cn(
                    "w-8 h-8",
                    isFavorite(movie.id) ? "text-[#FF3B30]" : "text-gray-400"
                  )}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

*/
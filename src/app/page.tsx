"use client";

/**
 * Importaciones necesarias para la página principal
 */
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import LoginModal from "@/components/LoginModal";
import MovieLoading from "@/components/MovieLoading";
import { type Movie, type ApiResponse } from "@/types/Movie";
import { useSelector } from "react-redux";

/**
 * Interface para el estado de Redux
 */
interface RootState {
  genre: {
    genre: {
      id: number;
      name: string;
    } | null;
  };
  search: {
    search: Movie[];
  };
}

/**
 * Configuración de las URLs de la API
 */
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const token = process.env.NEXT_PUBLIC_TOKEN;

/**
 * URLs para diferentes endpoints de la API de TMDB
 */
const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;
const urlPopular = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
const urlUpComing = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;

/**
 * Función para realizar peticiones a la API de TMDB
 */
async function fetchData(url: string): Promise<ApiResponse<Movie> | null> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: ApiResponse<Movie> = await response.json();
    return data;
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    return null;
  }
}

/**
 * Componente principal de la página de inicio
 *
 * @component Home
 * @description
 * Página principal que muestra diferentes categorías de películas:
 * - Películas populares
 * - Películas en cartelera
 * - Próximos estrenos
 * - Películas mejor valoradas
 *
 * Incluye funcionalidades de:
 * - Filtrado por género
 * - Búsqueda de películas
 * - Visualización de loading state
 *
 * @returns {JSX.Element} Página principal de la aplicación
 */
export default function Home(): JSX.Element {
  // Estados para almacenar los diferentes tipos de películas
  const [dataNowPlaying, setDataNowPlaying] = useState<Movie[]>([]);
  const [dataPopular, setDataPopular] = useState<Movie[]>([]);
  const [dataUpComing, setDataUpComing] = useState<Movie[]>([]);
  const [dataTopRated, setDataTopRated] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selectores de Redux para género y búsqueda
  const genre = useSelector((state: RootState) => state.genre);
  const search = useSelector((state: RootState) => state.search);

  /**
   * Effect para cargar los datos iniciales
   * Realiza todas las peticiones en paralelo usando Promise.all
   */
  useEffect(() => {
    async function fetchDataAsync(): Promise<void> {
      setIsLoading(true);
      const [nowPlaying, popular, upComing, topRated] = await Promise.all([
        fetchData(urlNowPlaying),
        fetchData(urlPopular),
        fetchData(urlUpComing),
        fetchData(urlTopRated),
      ]);

      if (nowPlaying) setDataNowPlaying(nowPlaying.results);
      if (popular) setDataPopular(popular.results);
      if (upComing) setDataUpComing(upComing.results);
      if (topRated) setDataTopRated(topRated.results);
      setIsLoading(false);
    }

    fetchDataAsync();
  }, []);

  // Lógica de filtrado de películas
  const allMovies = [
    ...dataNowPlaying,
    ...dataPopular,
    ...dataUpComing,
    ...dataTopRated,
  ];

  const genreIdToFilter = genre?.genre?.id;
  const filteredMovies: Movie[] =
    search.search.length > 0
      ? search.search
      : allMovies.filter((movie) => {
          if (!movie.genre_ids || !genreIdToFilter) return false;
          return movie.genre_ids.includes(genreIdToFilter);
        });

  if (isLoading) {
    return <MovieLoading />;
  }

  const defaultGenre = { id: 0, name: "" };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <LoginModal />
      {dataPopular[0] && <Hero movie={dataPopular[0]} />}
      <div className="flex overflow-x-hidden">
        <aside className="hidden lg:block w-64 shrink-0">
          <Sidebar movies={filteredMovies} />
        </aside>
        <main className="flex-1 px-4 lg:px-8 bg-mainGrey">
          <div className="space-y-8 py-8">
            {filteredMovies.length > 0 && (
              <MovieGrid
                title="Filtered Movies"
                genre={genre.genre || defaultGenre}
                movies={filteredMovies}
              />
            )}
            {filteredMovies.length === 0 && (
              <>
                <MovieGrid 
                  title="Popular Movies" 
                  movies={dataPopular}
                  genre={genre.genre || defaultGenre}
                />
                <MovieGrid 
                  title="Now Playing" 
                  movies={dataNowPlaying}
                  genre={genre.genre || defaultGenre}
                />
                <MovieGrid 
                  title="Coming Soon" 
                  movies={dataUpComing}
                  genre={genre.genre || defaultGenre}
                />
                <MovieGrid 
                  title="Top Rated" 
                  movies={dataTopRated}
                  genre={genre.genre || defaultGenre}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
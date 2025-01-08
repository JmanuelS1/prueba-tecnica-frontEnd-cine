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
import { Movie } from "@/types/Movie";
import { useSelector } from "react-redux";

/**
 * Configuración de las URLs de la API
 * @constant {string} apiKey - Clave de la API de TMDB
 * @constant {string} token - Token de autenticación
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
 * 
 * @async
 * @function fetchData
 * @param {string} url - URL del endpoint a consultar
 * @returns {Promise<{results: Movie[]} | null>} Resultado de la petición o null en caso de error
 */
async function fetchData(url: string): Promise<{ results: Movie[] } | null> {
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
    const data = await response.json();
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
export default function Home() {
  // Estados para almacenar los diferentes tipos de películas
  const [dataNowPlaying, setDataNowPlaying] = useState<Movie[]>([]);
  const [dataPopular, setDataPopular] = useState<Movie[]>([]);
  const [dataUpComing, setDataUpComing] = useState<Movie[]>([]);
  const [dataTopRated, setDataTopRated] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Selectores de Redux para género y búsqueda
  const genre = useSelector((state: any) => state.genre);
  const search = useSelector((state: any) => state.search);

  /**
   * Effect para cargar los datos iniciales
   * Realiza todas las peticiones en paralelo usando Promise.all
   */
  useEffect(() => {
    async function fetchDataAsync() {
      setIsLoading(true);
      const [nowPlaying, popular, upComing, topRated] = await Promise.all([
        fetchData(urlNowPlaying),
        fetchData(urlPopular),
        fetchData(urlUpComing),
        fetchData(urlTopRated),
      ]);

      setDataNowPlaying(nowPlaying?.results || []);
      setDataPopular(popular?.results || []);
      setDataUpComing(upComing?.results || []);
      setDataTopRated(topRated?.results || []);
      setIsLoading(false);
    }

    fetchDataAsync();
  }, []);

  // Lógica de filtrado de películas
  const allMovies = [...dataNowPlaying, ...dataPopular, ...dataUpComing, ...dataTopRated];
  const genreIdToFilter = genre?.genre?.id;
  const filteredMovies = search.search.length > 0
    ? search.search
    : allMovies.filter((movie) => movie.genre_ids && movie.genre_ids.includes(genreIdToFilter));

  if (isLoading) {
    return <MovieLoading />;
  }

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
              <MovieGrid title="Filtered Movies" genre={genre} movies={filteredMovies} />
            )}
            {filteredMovies.length === 0 && (
              <>
                <MovieGrid title="Popular Movies" movies={dataPopular} />
                <MovieGrid title="Now Playing" movies={dataNowPlaying} />
                <MovieGrid title="Coming Soon" movies={dataUpComing} />
                <MovieGrid title="Top Rated" movies={dataTopRated} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
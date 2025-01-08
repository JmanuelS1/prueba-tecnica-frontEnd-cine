"use client";

/**
 * Importaciones necesarias para el componente Sidebar
 */
import React, { useState, useEffect } from "react";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import { Input } from "./ui/Input";
import { Movie } from "@/types/Movie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Keyword } from "@/types/Keyword";

/**
 * Constantes de configuración para las APIs
 */
const token = process.env.NEXT_PUBLIC_TOKEN;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const urlGenres = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`;
const urlKeywords = `https://api.themoviedb.org/3/search/keyword?query=`;
const urlSerchMovie = `https://api.themoviedb.org/3/search/movie?query=`;

/**
 * Interface para los géneros de películas
 */
interface Genre {
  id: number;
  name: string;
}

/**
 * Interface para las propiedades del Sidebar
 */
interface SidebarProps {
  movies: Movie[];
}

/**
 * Componente Sidebar
 * 
 * @component
 * @description
 * Barra lateral que proporciona funcionalidades de búsqueda y filtrado:
 * - Búsqueda por palabras clave con sugerencias
 * - Filtrado por géneros
 * - Integración con Redux para estado global
 * 
 * @param {SidebarProps} props - Propiedades del componente
 */
const Sidebar: React.FC<SidebarProps> = ({ movies }) => {
  /**
   * Estados y hooks
   */
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const genre = useSelector((state: any) => state.genre);

  /**
   * Obtiene la lista de géneros de la API
   */
  const fetchGenres = async () => {
    const response = await fetch(urlGenres, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setGenres(data.genres);
  };

  /**
   * Busca keywords basadas en la consulta del usuario
   */
  const fetchKeywords = async (query) => {
    const response = await fetch(`${urlKeywords}${query}&api_key=${apiKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setKeywords(data.results);
  };

  /**
   * Busca películas basadas en la consulta del usuario
   */
  const fetchMoviesBySearch = async (query) => {
    const response = await fetch(`${urlSerchMovie}${query}&api_key=${apiKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "SET_SEARCH", payload: data.results });
    setKeywords([]);
    setSearch("");
  };

  /**
   * Effects para cargar géneros y filtrar películas
   */
  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [selectedGenre, search]);

  /**
   * Filtra las películas según género y búsqueda
   */
  const filterMovies = async() => {
    let filtered = movies;

    if (selectedGenre && selectedGenre !== "All Genres") {
      filtered = filtered.filter(
        (movie) =>
          movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre))
      );
    }

    if (search) {
      await fetchKeywords(search);
    } else {
      setKeywords([]);
    }
  };

  /**
   * Manejadores de eventos
   */
  const handleSearchMovieByKeywords = async() => {
    await fetchMoviesBySearch(search);
    setKeywords([]);
  };

  const handleSearchMovie = async(ev) => {
    ev.preventDefault();
    await fetchMoviesBySearch(search);
  };

  return (
    <div className="w-64 h-full bg-sideGrey p-4 space-y-6">
      {/* Sección de búsqueda */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400">Search</h3>
        <form 
          onSubmit={handleSearchMovie}
          className="relative"
        >
          <Input
            type="text"
            placeholder="Keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 full-height bg-[#1C1C1C] border-gray-700 text-white"
          />
          <BiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          {/* Lista de sugerencias de keywords */}
          {keywords.length > 0 && (
            <ul className="absolute top-[100%] left-0 w-full z-10 text-white bg-inputGrey border border-gray-700 rounded-md shadow-lg">
              {keywords.map((keyword) => (
                <li 
                  key={keyword.id}
                  onClick={() => {
                    setSearch(keyword.name);
                    handleSearchMovieByKeywords();
                  }}
                  className="py-1 cursor-pointer hover:bg-[#262626] px-3"
                >
                  {keyword.name}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* Sección de géneros */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400">Genres</h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`full-height w-full text-left bg-[#1C1C1C] border border-gray-700 text-white p-2 rounded-md transition duration-300 ease-in-out ${
              isDropdownOpen ? "bg-[#1c1c1c]" : "bg-[#1C1C1C]"
            } flex items-center justify-between`}
          >
            {genre?.genre === null ? (
              <span className="line-placeholder"></span>
            ) : (
              <span className="text-white">{genre?.genre?.name}</span>
            )}
            <BiChevronDown
              className={`ml-2 w-6 h-6 text-white transition-transform duration-300 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {/* Dropdown de géneros */}
          {isDropdownOpen && (
            <div className="absolute w-full bg-[#1C1C1C] border border-gray-700 mt-1 max-h-40 overflow-y-auto custom-scrollbar rounded-md shadow-lg">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => {
                    setSelectedGenre(genre.name);
                    dispatch({ type: "SET_GENRE", payload: genre });
                    setIsDropdownOpen(false);
                  }}
                  className="cursor-pointer p-2 hover:bg-[#262626] text-gray-300"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
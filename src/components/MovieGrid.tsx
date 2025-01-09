/**
 * Importaciones necesarias para el componente MovieGrid
 */
import { useRef } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/Movie";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { BiX } from "react-icons/bi";

/**
 * Interface para el estado de Redux
 */
interface RootState {
  search: {
    search: Movie[];
  };
}

/**
 * Interface para las propiedades del componente MovieGrid
 *
 * @interface MovieGridProps
 * @property {string} title - Título de la sección de películas
 * @property {Movie[]} movies - Array de películas a mostrar
 * @property {Object} genre - Información del género seleccionado
 */
interface MovieGridProps {
  title: string;
  movies: Movie[];
  genre: {
    id: number;
    name: string;
  };
}

/**
 * Componente MovieGrid
 *
 * @component
 * @description
 * Muestra una cuadrícula de películas en un carrusel con efecto coverflow.
 * Incluye funcionalidades para:
 * - Mostrar título de la sección
 * - Filtrar por género
 * - Limpiar filtros de búsqueda y género
 * - Navegación entre películas con efecto de carrusel
 *
 * @param {MovieGridProps} props - Propiedades del componente
 * @returns {JSX.Element} Sección con el grid de películas
 */
export default function MovieGrid({
  title,
  movies,
  genre,
}: MovieGridProps): JSX.Element {
  /**
   * Referencias y estados
   */
  const mainSliderRef = useRef(null);
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);

  return (
    <section>
      {/* Título de la sección */}
      <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
        {title}
      </h2>
      <div className="flex items-center gap-4 mb-6">
        {/* Nombre del género seleccionado */}
        <h3 className="text-3xl font-semibold text-gray-300">{genre.name}</h3>

        {/* Botón para limpiar filtro de género */}
        {genre.name && (
          <button
            onClick={() => {
              dispatch({ type: "SET_GENRE", payload: null });
            }}
            className="inline-flex items-center bg-[#1C1C1C] text-white border border-gray-700 hover:bg-[#333333] 
                 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white 
                 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out"
          >
            <BiX className="w-6 h-6 mr-2" />
            Clear Genre
          </button>
        )}

        {/* Botón para limpiar búsqueda */}
        {search.search.length > 0 && (
          <button
            onClick={() => {
              dispatch({ type: "SET_SEARCH", payload: [] });
            }}
            className="inline-flex items-center bg-[#1C1C1C] text-white border border-gray-700 hover:bg-[#333333] 
                 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white 
                 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out"
          >
            <BiX className="w-6 h-6 mr-2" />
            Clear Search
          </button>
        )}
      </div>

      {/* Carrusel de películas */}
      <Swiper
        ref={mainSliderRef}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCube]}
        className="w-full overflow-hidden"
        style={{ overflow: "hidden" }}
      >
        {/* Mapeo de películas */}
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="relative rounded-3xl p-2 !w-[300px] md:!w-[300px] !mx-2 cursor-pointer"
          >
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

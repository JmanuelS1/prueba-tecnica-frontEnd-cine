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

interface MovieGridProps {
  title: string;
  movies: Movie[];
  genre?: {
    genre: {
      id: number;
      name: string;
    };
  };
}

export default function MovieGrid({ title, movies, genre }: MovieGridProps) {
  const mainSliderRef = useRef(null);
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.search);

  return (
    <section>
      <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
        {title}
      </h2>
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-3xl font-semibold text-gray-300">
          {genre?.genre?.name || null}
        </h3>

        {genre?.genre?.name && (
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
        className="w-full"
      >
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


/*import { useRef } from 'react';
import MovieCard from './MovieCard';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface MovieGridProps {
  title: string
  movies: any[]
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
  const mainSliderRef = useRef(null);

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
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
          slideShadows: true
        }}
        modules={[EffectCube]}
        className="w-full"
      >
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
  )
}
*/

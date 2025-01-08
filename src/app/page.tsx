'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'
import LoginModal from '@/components/LoginModal'
import MovieLoading from '@/components/MovieLoading'
import { Movie } from '@/types/Movie'
import { useSelector } from 'react-redux'

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const token = process.env.NEXT_PUBLIC_TOKEN

const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`
const urlPopular = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
const urlUpComing = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`
const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`

async function fetchData(url: string): Promise<{ results: Movie[] } | null> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return null
  }
}

export default function Home() {
  const [dataNowPlaying, setDataNowPlaying] = useState<Movie[]>([])
  const [dataPopular, setDataPopular] = useState<Movie[]>([])
  const [dataUpComing, setDataUpComing] = useState<Movie[]>([])
  const [dataTopRated, setDataTopRated] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const genre = useSelector((state: any) => state.genre)
  const search = useSelector((state: any) => state.search)

  useEffect(() => {
    async function fetchDataAsync() {
      setIsLoading(true)
      const [nowPlaying, popular, upComing, topRated] = await Promise.all([
        fetchData(urlNowPlaying),
        fetchData(urlPopular),
        fetchData(urlUpComing),
        fetchData(urlTopRated),
      ])

      setDataNowPlaying(nowPlaying?.results || [])
      setDataPopular(popular?.results || [])
      setDataUpComing(upComing?.results || [])
      setDataTopRated(topRated?.results || [])
      setIsLoading(false)
    }

    fetchDataAsync()
  }, [])

  const allMovies = [...dataNowPlaying, ...dataPopular, ...dataUpComing, ...dataTopRated]
  const genreIdToFilter = genre?.genre?.id
  console.log('genreIdToFilter', genreIdToFilter)
  const filteredMovies = search.search.length > 0
    ? search.search
    : allMovies.filter((movie) => movie.genre_ids && movie.genre_ids.includes(genreIdToFilter))

  if (isLoading) {
    return <MovieLoading />
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <LoginModal />
      {dataPopular[0] && <Hero movie={dataPopular[0]} />}
      <div className="flex">
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
  )
}



/*"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import LoginModal from '@/components/LoginModal';
import { Movie } from '@/types/Movie';

const urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const urlUpComing = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

async function fetchData(url: string): Promise<{ results: Movie[] } | null> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzVlNDc2M2U1MjM3Nzg5YzMwYzcyMmVhZDZiYWE5MSIsIm5iZiI6MTczNTQxNjQxMS4xMjUsInN1YiI6IjY3NzA1YTViN2QxYmM4N2RlNzYxNWIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRUWRExGnZ1dkH0D7ZbjHJ4YoIwJhepcQ3cbxqllRl0'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al realizar la petición:', error);
    return null;
  }
}

export default function Home() {
  const [dataNowPlaying, setDataNowPlaying] = useState<Movie[]>([]);
  const [dataPopular, setDataPopular] = useState<Movie[]>([]);
  const [dataUpComing, setDataUpComing] = useState<Movie[]>([]);
  const [dataTopRated, setDataTopRated] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchDataAsync() {
      const [nowPlaying, popular, upComing, topRated] = await Promise.all([
        fetchData(urlNowPlaying),
        fetchData(urlPopular),
        fetchData(urlUpComing),
        fetchData(urlTopRated)
      ]);

      setDataNowPlaying(nowPlaying?.results || []);
      setDataPopular(popular?.results || []);
      setDataUpComing(upComing?.results || []);
      setDataTopRated(topRated?.results || []);

      const allMovies: Movie[] = [
        ...(nowPlaying?.results || []),
        ...(popular?.results || []),
        ...(upComing?.results || []),
        ...(topRated?.results || [])
      ];

      setFilteredMovies(allMovies);
    }

    fetchDataAsync();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <LoginModal />
      {dataPopular[0] &&  (
        <Hero movie={dataPopular[0]} />
      )}
      <div className="flex">
        <aside className="hidden lg:block w-64 shrink-0">
          <Sidebar movies={filteredMovies} setFilteredMovies={setFilteredMovies} />
        </aside>
        <main className="flex-1 px-4 lg:px-8 bg-[#424242]">
          <div className="space-y-8 py-8">
            {/* <MovieGrid title="Filtered Movies" movies={filteredMovies} /> */ /*}
<MovieGrid title="Popular Movies" movies={dataPopular} />
<MovieGrid title="Now Playing" movies={dataNowPlaying} />
<MovieGrid title="Coming Soon" movies={dataUpComing} />
<MovieGrid title="Top Rated" movies={dataTopRated} />
</div>
</main>
</div>
</div>
);
}
*/


"use client";

import React, { useState } from "react";
import { Movie } from "./types/movie";
import { FetchMoviesButton } from "./SearchMovieButton";

export const SearchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <div className="flex flex-col items-center justify-center">
      <FetchMoviesButton setMovies={setMovies} />
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="border-[2px] border-blue-400 bg-pink-200 px-6 py-2 text-white">
            <button
              onClick={() => {
                window.open(`https://google.com/search?q=${movie.title} movie`);
              }}
            >
              {movie.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Movie } from "./types/movie";
import { FetchMoviesForm } from "./SearchMovieForm";

export const SearchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <div className="flex flex-col items-center justify-center">
      <FetchMoviesForm setMovies={setMovies} />
      <ul className="mt-10">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li
              key={movie.id}
              className="my-2 border-l-4 border-blue-400 bg-gradient-to-r from-pink-300 from-[80%] to-black py-2 pl-2 pr-6 text-black"
            >
              <button
                onClick={() => {
                  window.open(
                    `https://google.com/search?q=${movie.title} movie`
                  );
                }}
              >
                {movie.title}
              </button>
            </li>
          ))
        ) : (
          <div>
            <h3>No hits!</h3>
          </div>
        )}
      </ul>
    </div>
  );
};

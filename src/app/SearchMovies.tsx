"use client";

import React, { useState } from "react";
import { Movie, MovieSearchResponse } from "./types/movie";
import { SearchMoviesForm } from "./SearchMovieForm";

export const SearchMovies = () => {
  const [searchResponse, setSearchResponse] =
    useState<MovieSearchResponse | null>(null);

  const searchMoviesForm = (
    <SearchMoviesForm
      setSearchResponse={setSearchResponse}
      searchMovies={searchMovies}
    />
  );

  if (!searchResponse) return searchMoviesForm;

  const suggestions = searchResponse.suggestions[0].options;

  return (
    <div className="flex flex-col items-center justify-center">
      {searchMoviesForm}
      {suggestions.length > 0 && (
        <h3 className="mt-2 italic tracking-wide text-blue-400">
          Did you mean{" "}
          <button
            className="italic tracking-wide text-pink-300"
            onClick={async () => {
              const res = await searchMovies(suggestions[0].text);
              setSearchResponse(res);
            }}
          >
            {suggestions[0].text}
          </button>
          ?
        </h3>
      )}
      <ul className="mt-10">
        {searchResponse.hits.movies.map((movie) => (
          <li
            key={movie.id}
            className="my-2 rounded-sm border-l-4 border-blue-400 bg-pink-300 px-4 py-2 text-lg font-semibold text-blue-950"
          >
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

/**
 *
 * @param title
 * @returns
 */
async function searchMovies(title: string): Promise<MovieSearchResponse> {
  try {
    const res = await fetch(`/api/movies/${title}`);
    return res.json();
  } catch (e) {
    throw new Error("Couldn't fetch data");
  }
}

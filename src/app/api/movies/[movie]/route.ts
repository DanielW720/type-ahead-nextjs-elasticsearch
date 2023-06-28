import { Movie, MovieResponse } from "@/app/types/movie";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "http://localhost:9200/movies/_search";

const searchMovieBody = (q: string) => {
  const map = new Map();
  map.set("query", {
    _source: ["Series_Title", "Director", "Released_Year", "Genre", "Star*"],
    query: {
      match: {
        Series_Title: q,
      },
    },
    suggest: {
      title_suggestion: {
        text: q,
        term: {
          field: "Series_Title",
        },
      },
    },
  });
  return map;
};

/**
 *
 * @param request
 * @returns Search response from Elasticsearch
 */
export async function GET(request: Request) {
  const movieName = request.url.slice(request.url.lastIndexOf("/") + 1);
  const body = searchMovieBody(movieName).get("query");

  const res = await fetch(`${DATA_SOURCE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resJson = await res.json();
  const moviesResonse: MovieResponse = resJson.hits.hits;

  // Edit response
  const movies: Movie[] = [];
  moviesResonse.forEach((movie) => {
    movies.push({
      id: movie._id,
      director: movie._source.Director,
      genre: movie._source.Genre,
      releasedYear: movie._source.Released_Year,
      title: movie._source.Series_Title,
      star1: movie._source.Star1,
      star2: movie._source.Star2,
      star3: movie._source.Star3,
      star4: movie._source.Star4,
    });
  });

  // console.log(JSON.stringify(resJson));

  // return NextResponse.json(resJson.hits.hits);
  return NextResponse.json(movies);
}

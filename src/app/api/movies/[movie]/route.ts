import {
  Movie,
  SearchEngineResponse,
  MovieSearchResponse,
  Suggestion,
} from "@/app/types/movie";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "http://localhost:9200/movies/_search";

function buildSearchQuery(q: string) {
  const map = new Map();
  map.set("query", {
    _source: [
      "Series_Title",
      "Director",
      "Released_Year",
      "Genre",
      "Star*",
      "Poster_Link",
    ],
    query: {
      match: {
        Series_Title: q,
      },
    },
    suggest: {
      title_phrase_suggestions: {
        text: q,
        phrase: {
          field: "Series_Title",
        },
      },
    },
  });
  return map;
}

function buildMoviesArray(res: SearchEngineResponse): Movie[] {
  const movies: Movie[] = [];
  res.hits.hits.forEach((searchHit) => {
    const movie = searchHit._source;
    movies.push({
      id: searchHit._id,
      director: movie.Director,
      genre: movie.Genre,
      releasedYear: movie.Released_Year,
      title: movie.Series_Title,
      star1: movie.Star1,
      star2: movie.Star2,
      star3: movie.Star3,
      star4: movie.Star4,
      posterLink: movie.Poster_Link,
    });
  });
  return movies;
}

function buildSuggestionsArray(res: SearchEngineResponse) {
  return [...res.suggest.title_phrase_suggestions];
}

/**
 *
 * @param request
 * @returns Search response from Elasticsearch
 */
export async function GET(request: Request) {
  let movieName = request.url.slice(request.url.lastIndexOf("/") + 1);
  movieName = movieName.replace(/%20/g, " ");

  const body = buildSearchQuery(movieName).get("query");

  const elasticsearchResponse = await fetch(`${DATA_SOURCE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const elasticsearchJsonResponse: SearchEngineResponse =
    await elasticsearchResponse.json();

  // Build array of movies
  const movies = buildMoviesArray(elasticsearchJsonResponse);

  // Build array of did-you-mean suggestions
  const suggestions = buildSuggestionsArray(elasticsearchJsonResponse);

  // Build final response
  const response: MovieSearchResponse = {
    hits: { total: elasticsearchJsonResponse.hits.total.value, movies: movies },
    suggestions: suggestions,
  };

  return NextResponse.json(response);
}

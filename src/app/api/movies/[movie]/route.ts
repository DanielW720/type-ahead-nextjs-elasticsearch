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

  // console.log(JSON.stringify(resJson.hits.hits));

  return NextResponse.json(resJson.hits.hits);
}

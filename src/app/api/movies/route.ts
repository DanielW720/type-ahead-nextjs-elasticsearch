import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "http://localhost:9200/movies/_search";

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  if (!res.ok) throw new Error("Coulnd't fetch from Elasticsearch");

  const resJson = await res.json();

  return NextResponse.json(resJson);
}

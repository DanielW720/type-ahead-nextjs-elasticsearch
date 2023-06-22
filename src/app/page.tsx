import { FetchMoviesButton } from "./SearchMovieButton";
import { SearchMovies } from "./SearchMovies";

export default async function Page() {
  return (
    <main className="flex w-screen flex-col items-center justify-center pt-10 text-white">
      <h2 className="text-semibold mb-10 text-2xl tracking-wider">
        Search movies
      </h2>
      <SearchMovies />
    </main>
  );
}

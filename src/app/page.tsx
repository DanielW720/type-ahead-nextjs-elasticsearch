import { SearchMoviesForm } from "./SearchMovieForm";
import { SearchMovies } from "./SearchMovies";

export default async function Page() {
  return (
    <main className="flex w-screen flex-col items-center justify-center pt-10 text-white">
      <SearchMovies />
    </main>
  );
}

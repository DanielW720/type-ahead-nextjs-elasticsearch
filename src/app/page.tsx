import { FetchCountryButton } from "./SearchMovieButton";

export default async function Page() {
  return (
    <main className="flex w-screen flex-col items-center justify-center pt-10 text-white">
      <h2 className="text-semibold text-2xl tracking-wider">Search movies</h2>
      <div className="my-10">
        <FetchCountryButton />
      </div>
    </main>
  );
}

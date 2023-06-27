"use client";

import { Movie, MovieResponse } from "./types/movie";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  query: string;
};

export const FetchMoviesForm = ({
  setMovies,
}: {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res: MovieResponse = await searchMovie(data.query);
    const movies: Movie[] = [];
    res.forEach((movie) => {
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
    setMovies(movies);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <input
          placeholder="Search titles..."
          {...register("query")}
          className="rounded-md p-2 text-black"
        />
        <input
          type="submit"
          value={"Search movies"}
          className="mt-2 w-fit cursor-pointer rounded-md bg-pink-300 px-2 py-2 font-semibold text-blue-950"
        />
      </form>
    </div>
  );
};

/**
 *
 * @param title
 * @returns
 */
async function searchMovie(title: string) {
  try {
    const res = await fetch(`/api/movies/${title}`);
    return res.json();
  } catch (e) {
    throw new Error("Couldn't fetch data");
  }
}

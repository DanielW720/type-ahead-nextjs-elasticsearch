"use client";

import { Movie, MovieSearchResponse } from "./types/movie";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  query: string;
};

export const SearchMoviesForm = ({
  setSearchResponse,
  searchMovies,
}: {
  setSearchResponse: React.Dispatch<
    React.SetStateAction<MovieSearchResponse | null>
  >;
  searchMovies: (title: string) => Promise<MovieSearchResponse>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await searchMovies(data.query);
    setSearchResponse(res);
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

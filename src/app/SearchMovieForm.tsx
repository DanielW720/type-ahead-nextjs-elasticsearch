"use client";

import { MovieSearchResponse } from "./types/movie";
import { useForm, SubmitHandler } from "react-hook-form";
import "material-icons/iconfont/filled.css";

type Inputs = {
  query: string;
};

export const SearchMoviesForm = ({
  setSearchResponse,
  searchMovies,
}: {
  setSearchResponse: React.Dispatch<
    React.SetStateAction<{
      queryTerm: String;
      response: MovieSearchResponse;
    } | null>
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
    setSearchResponse({
      queryTerm: data.query,
      response: res,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative"
        autoComplete="off"
      >
        <input
          placeholder="Search titles..."
          {...register("query")}
          className="rounded-md p-2 text-black outline-none"
        />
        <button type="submit" className="absolute right-2 top-2 block h-fit">
          <span className="material-icons text-black">search</span>
        </button>
      </form>
    </div>
  );
};

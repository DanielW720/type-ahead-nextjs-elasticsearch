"use client";

export const FetchCountryButton = () => {
  const searchMovie = async () => {
    console.log("Fetching client-side");

    try {
      const res = await fetch("/api/movies/night");
      return res;
    } catch (e) {
      console.error("Couldn't fetch data", e);
      throw new Error("Couldn't fetch data");
    }
  };

  return (
    <button
      onClick={async () => {
        const data = await searchMovie();
        console.log(data);
      }}
      className="flex h-14 w-36 items-center justify-center rounded-md bg-pink-300 font-semibold text-blue-950"
    >
      Fetch countries
    </button>
  );
};

"use client";

import { Movie, MovieResponse } from "./types/movie";

export const FetchMoviesButton = ({
  setMovies,
}: {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}) => {
  const handleSearchMovieClick = async () => {
    const data: MovieResponse = await searchMovie("mr");
    const movies: Movie[] = [];
    data.forEach((movie) => {
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
    <button
      onClick={handleSearchMovieClick}
      className="flex h-14 w-36 items-center justify-center rounded-md bg-pink-300 font-semibold text-blue-950"
    >
      Fetch movies
    </button>
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

/**
 * 
 * [

{
"_index": "movies",
"_type": "_doc",
"_id": "ry-X1IgBZV1D-KcI9egb",
"_score": 4.7570777,

"_source": {
"Star4": "Alan Randolph Scott",
"Star3": "Lisanne Falk",
"Star2": "Gena Rowlands",
"Released_Year": "1991",
"Director": "Jim Jarmusch",
"Star1": "Winona Ryder",
"Series_Title": "Night on Earth",
"Genre": "Comedy, Drama"
}
},

{
"_index": "movies",
"_type": "_doc",
"_id": "UC-X1IgBZV1D-KcI9ecb",

"_score": 4.1660466,

"_source": {
"Star4": "Roscoe Karns",
"Star3": "Walter Connolly",
"Star2": "Claudette Colbert",
"Released_Year": "1934",
"Director": "Frank Capra",
"Star1": "Clark Gable",
"Series_Title": "It Happened One Night",
"Genre": "Comedy, Romance"
}
},

{
"_index": "movies",
"_type": "_doc",
"_id": "9i-X1IgBZV1D-KcI9ekb",
"_score": 4.1660466,

"_source": {
"Star4": "Ringo Starr",
"Star3": "George Harrison",
"Star2": "Paul McCartney",
"Released_Year": "1964",
"Director": "Richard Lester",
"Star1": "John Lennon",
"Series_Title": "A Hard Day's Night",
"Genre": "Comedy, Music, Musical"
}
},

{
"_index": "movies",
"_type": "_doc",
"_id": "zi-X1IgBZV1D-KcI9ecb",
"_score": 3.705648,

"_source": {
"Star4": "James Gleason",
"Star3": "Lillian Gish",
"Star2": "Shelley Winters",
"Released_Year": "1955",
"Director": "Charles Laughton",
"Star1": "Robert Mitchum",
"Series_Title": "The Night of the Hunter",
"Genre": "Crime, Drama, Film-Noir"
}
},

{
"_index": "movies",
"_type": "_doc",
"_id": "NC-X1IgBZV1D-KcI9egb",
"_score": 3.705648,

"_source": {
"Star4": "Marilyn Eastman",
"Star3": "Karl Hardman",
"Star2": "Judith O'Dea",
"Released_Year": "1968",
"Director": "George A. Romero",
"Star1": "Duane Jones",
"Series_Title": "Night of the Living Dead",
"Genre": "Horror, Thriller"
}
},

{
"_index": "movies",
"_type": "_doc",
"_id": "SS-X1IgBZV1D-KcI9egb",
"_score": 3.705648,

"_source": {
"Star4": "Harpo Marx",
"Star3": "Chico Marx",
"Star2": "Groucho Marx",
"Released_Year": "1935",
"Director": "Sam Wood",
"Star1": "Edmund Goulding",
"Series_Title": "A Night at the Opera",
"Genre": "Comedy, Music, Musical"
}
},

{
"_index": "movies",
"_type": "_doc",
"_id": "Ni-X1IgBZV1D-KcI9egb",
"_score": 3.3368816,

"_source": {
"Star4": "Lee Grant",
"Star3": "Warren Oates",
"Star2": "Rod Steiger",
"Released_Year": "1967",
"Director": "Norman Jewison",
"Star1": "Sidney Poitier",
"Series_Title": "In the Heat of the Night",
"Genre": "Crime, Drama, Mystery"
}
}
]
$.theater[*].movies

 */

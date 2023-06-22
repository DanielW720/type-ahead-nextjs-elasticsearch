export type Movie = {
  id: string;
  director: string;
  genre: string;
  releasedYear: number;
  title: string;
  star1: string | null;
  star2: string | null;
  star3: string | null;
  star4: string | null;
};

export type MovieResponse = [
  {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: {
      Star4: string | null;
      Star3: string | null;
      Star2: string | null;
      Released_Year: number;
      Director: string;
      Star1: string | null;
      Series_Title: string;
      Genre: string;
    };
  }
];

export type Movie = {
  id: string;
  director: string;
  genre: string;
  releasedYear: number;
  title: string;
  star4?: string;
  star3?: string;
  star2?: string;
  star1?: string;
  posterLink: string;
  highlight?: string;
};

export type SearchEngineResponse = {
  hits: {
    total: {
      value: number;
    };
    hits: [
      {
        _index: string;
        _id: string;
        _score: number;
        _source: {
          Star4?: string;
          Star3?: string;
          Star2?: string;
          Star1?: string;
          Released_Year: number;
          Director: string;
          Series_Title: string;
          Genre: string;
          Poster_Link: string;
        };
        highlight?: {
          Series_Title: string[];
        };
      }
    ];
  };
  suggest: {
    title_phrase_suggestions: [
      {
        text: string;
        offset: number;
        length: number;
        options: [
          {
            text: string;
            score: number;
          }
        ];
      }
    ];
  };
};

export type Suggestion = {
  text: string;
  offset: number;
  length: number;
  options: [
    {
      text: string;
      score: number;
    }
  ];
};

export type MovieSearchResponse = {
  hits: { total: number; movies: Movie[] };
  suggestions: Suggestion[];
};

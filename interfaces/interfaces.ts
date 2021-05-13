export interface IMoviesResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres?: IGenresItem[];
}

export interface ITrailerByIdResults {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface ISortByArr {
  id: number;
  name: string;
  img: string;
  type: string;
}

export interface IGenresItem {
  id: number;
  name: string;
}

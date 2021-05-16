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

export interface ICredits {
  id: number;
  cast: ICreditsCasts[];
  crew: ICreditsCrew[];
}

export interface ICreditsCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: number;
  department: string;
  job: string;
}

export interface ICreditsCasts {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface IMovieGenreProps {
  data: IMoviesResult;
  page: number;
  genres: IGenresItem[];
}

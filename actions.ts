import { moviesInitialState } from './reducers';
import { ThunkAction } from 'redux-thunk';
import * as types from './types';
import axios from 'axios';
import { IGenresItem, IMoviesResult, ITrailerByIdResults } from './interfaces/interfaces';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});
const apiKey = '?api_key=74d41124b9d3bafd09d832463dd78216';

type MoviesThunk = ThunkAction<Promise<void>, typeof moviesInitialState, unknown, MoviesActions>;

export const getMovies = (): MoviesThunk => async (dispatch) => {
  const data: IMoviesResult[] = await instance
    .get(`movie/now_playing${apiKey}`)
    .then(({ data }) => data.results);
  dispatch(setMovies(data));
};

export const getGenres = (): MoviesThunk => async (dispatch) => {
  const data: IGenresItem[] = await instance
    .get(`genre/movie/list${apiKey}`)
    .then(({ data }) => data.genres);
  dispatch(setGenres(data));
};

export const getOneMovie =
  (movieId: number | string): MoviesThunk =>
  async (dispatch) => {
    const data: IMoviesResult = await instance
      .get(`movie/${movieId}${apiKey}`)
      .then(({ data }) => data);
    dispatch(setChosenMovie(data));
  };

export const getMovieTrailer = (movieId: number | string) => async (dispatch) => {
  const data: ITrailerByIdResults[] = await instance
    .get(`movie/${movieId}/videos${apiKey}`)
    .then(({ data }) => data.results);
  dispatch(setTrailer(data));
};

interface ISetMovieId {
  type: typeof types.SET_TRAILER;
  payload: ITrailerByIdResults[];
}

export const setTrailer = (trailer: ITrailerByIdResults[]): ISetMovieId => ({
  type: types.SET_TRAILER,
  payload: trailer,
});

interface ISetMovies {
  type: typeof types.SET_MOVIES;
  payload: IMoviesResult[];
}

export const setMovies = (items: IMoviesResult[]): ISetMovies => ({
  type: types.SET_MOVIES,
  payload: items,
});

interface ISetGenres {
  type: typeof types.SET_GENRES;
  payload: IGenresItem[];
}

export const setGenres = (genres: IGenresItem[]): ISetGenres => ({
  type: types.SET_GENRES,
  payload: genres,
});

interface ISetChosenMovie {
  type: typeof types.SET_CHOSEN_MOVIE;
  payload: IMoviesResult;
}

export const setChosenMovie = (movie: IMoviesResult): ISetChosenMovie => ({
  type: types.SET_CHOSEN_MOVIE,
  payload: movie,
});

export type MoviesActions = ISetMovies | ISetGenres | ISetChosenMovie | ISetMovieId;

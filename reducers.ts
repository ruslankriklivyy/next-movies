import { combineReducers } from 'redux';
import { MoviesActions } from './actions';
import { ICredits, IGenresItem, IMoviesResult, ITrailerByIdResults } from './interfaces/interfaces';
import * as types from './types';

export const moviesInitialState = {
  items: [] as IMoviesResult[],
  genres: [] as IGenresItem[],
  chosenMovie: {} as IMoviesResult,
  chosenMovieTrailer: [] as ITrailerByIdResults[],
  creditsMovie: {} as ICredits,
  totalPages: 20,
};

const moviesReducer = (state = moviesInitialState, action: MoviesActions) => {
  switch (action.type) {
    case types.SET_MOVIES:
      return {
        ...state,
        items: action.payload,
      };

    case types.SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case types.SET_CHOSEN_MOVIE:
      return {
        ...state,
        chosenMovie: action.payload,
      };

    case types.SET_TRAILER:
      return {
        ...state,
        chosenMovieTrailer: action.payload,
      };

    case types.SET_CREDITS:
      return {
        ...state,
        creditsMovie: action.payload,
      };

    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = combineReducers({
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;

import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { simMoviesReducer } from "./similerMoviesReducer";
export default combineReducers({
  movies: moviesReducer,
  simMovies: simMoviesReducer,
});

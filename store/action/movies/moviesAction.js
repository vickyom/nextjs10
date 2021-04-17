import * as types from "../../type";

//Action for  Movies HasErrored
export function MoviesHasErrored(bool) {
  return {
    type: types.MOVIE_HAS_ERRORED,
    hasErrored: bool,
  };
}

//Action for  Movies IsLoading
export function MoviesIsLoading(bool) {
  return { type: types.MOVIE_IS_LOADING, bool };
}
//Action for load Movies Successfully
export function loadMovSuccess(movies) {
  //   console.log("loadMovSuccess == ", movies);
  return { type: types.LOAD_MOVIE_SUCCESS, movies };
}

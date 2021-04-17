import * as types from "../../type";

//Action for  Movies HasErrored
export function simMoviesHasErrored(bool) {
  return {
    type: types.MOVIE_SIM_HAS_ERRORED,
    hasErrored: bool,
  };
}

//Action for  Movies IsLoading
export function simMoviesIsLoading(bool) {
  return { type: types.MOVIE_SIM_IS_LOADING, bool };
}
//Action for load Movies Successfully
export function loadSimMovSuccess(movies) {
  //   console.log("loadMovSuccess == ", movies);
  return { type: types.LOAD_SIM_MOVIE_SUCCESS, movies };
}

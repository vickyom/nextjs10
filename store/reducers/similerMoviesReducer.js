import * as types from "../type";
const initialState = {
  simData: [],
  loading: false,
  error: null,
};

export const simMoviesReducer = (state = initialState, action) => {
  console.log("moviesReducer =>", action.movies);
  switch (action.type) {
    case types.LOAD_SIM_MOVIE_SUCCESS:
      return {
        ...state,
        simData: action.movies.data,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

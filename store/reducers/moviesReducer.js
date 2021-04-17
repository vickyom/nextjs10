import store from "../store";
import * as types from "../type";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const moviesReducer = (state = initialState, action) => {
  console.log("moviesReducer =>", action);
  switch (action.type) {
    case types.LOAD_MOVIE_SUCCESS:
      return {
        ...state,
        data: action.movies.data,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

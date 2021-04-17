import axios from "axios";
import * as types from "../../type";
import { MoviesIsLoading, loadMovSuccess } from "./moviesAction";

export const loadMovs = () => async (dispatch) => {
  dispatch(MoviesIsLoading(true));
  const res = await axios.get("/api/movies");
  if (res.status === 200) {
    // console.log("res == >", res);
    const { data } = res;
    dispatch(loadMovSuccess(data));
  } else {
    dispatch(MoviesIsLoading(false));
  }
};

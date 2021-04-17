import axios from "axios";
import { simMoviesIsLoading, loadSimMovSuccess } from "./moviesAction";

export const loadSimMovs = (moviesID) => async (dispatch) => {
  dispatch(simMoviesIsLoading(true));
  const res = await axios.get(`/api/similerMovies/?mov=${moviesID}`);
  if (res.status === 200) {
    // console.log("res == >", res);
    const { data } = res;
    dispatch(loadSimMovSuccess(data));
  } else {
    dispatch(simMoviesIsLoading(false));
  }
};

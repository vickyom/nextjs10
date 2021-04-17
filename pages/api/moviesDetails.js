import axios from "axios";
import api from "./constent";

export const fetchMoviesDetails = async (source) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${source}?api_key=e2df83ac84acb977bef0b1fd007c11ad&append_to_response=credits`
    );
    const data = await response.json();
    console.log("fetchMoviesDetails ---->", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

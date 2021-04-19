import axios from "axios";
import { api } from "./constent";

// export default async (req, res) => {
export const fetchMovies = async (req, res) => {
  const url = `${api}3/movie/now_playing?api_key=e2df83ac84acb977bef0b1fd007c11ad&language=en-US&page=1`;
  console.log("url == >", url);
  return await axios
    .get(url)
    .then(({ data }) => {
      // console.log("API data == >", data);
      return data
    })
    .catch(({ err }) => {
      return err;
    });
};

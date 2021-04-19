import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useRouter } from 'next/router'
import { Container } from "next/app";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import { fetchMovies } from "../api/movies"

const useStyles = makeStyles((theme) => ({
  poster: {
    color: "#fff",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: 100,
    height: 100,
    margin: 3,
  },
  genre: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
  },
  hr: {
    marginTop: 15,
    marginBottom: 15,
  },
}));

export const getStaticPaths = async (req) => {
  
  const res = await fetchMovies();
  const data = await res;
  
  // map data to an array of path objects with params (id)
  // const { results = {}} = data;
  // console.log("results == ?", results);
  const paths = data && data.results.map((ninja) => {
    return {
      params: { id: ninja.id.toString() },
    };
  });
  console.log("data == >", paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  // console.log("context.params.id == >", context.params.id);
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=e2df83ac84acb977bef0b1fd007c11ad&append_to_response=credits`
  );
  const data = await res.json();

  return {
    props: { movDetails: data, movId: id },
  };
};
const SimilerMovies = dynamic(() => import("./similerMovies.js"));
// co
const moviesDetails = ({ movDetails, movId }) => {
  const router = useRouter()
  // console.log("movDetails == ", movDetails);
  const classes = useStyles();
  const GetGenres = () => {
    const { genres } = movDetails;
    return genres.map((genre) => {
      return (
        <Button variant="outlined" color="primary">
          {genre.name}
        </Button>
      );
    });
  };

  const GetCast = () => {
    const { credits } = movDetails;
    const arrCast = credits.cast.splice(0, 10);
    return arrCast.map((genre) => {
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card className={classes.root}>
            <CardActionArea>
              <Image
                src={`/t/p/w235_and_h235_face${genre.profile_path}`}
                alt={genre.character}
                width={150}
                height={150}
                layout="responsive"
              />
              <CardContent>
                <Typography gutterBottom variant="body1">
                  {genre.character}
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      );
    });
  };

  return (
        <Grid container spacing={2}>
          <Grid item xs={12}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(6.27%, 7.84%, 9.02%, 1.00) 150px, rgba(6.27%, 7.84%, 9.02%, 0.84) 100%), url(
                https://image.tmdb.org/t/p/w500/${movDetails.backdrop_path}
              )`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",  
              display: "flex",
            }}
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Image
                src={`/t/p/w500/${movDetails.poster_path}`}
                alt={movDetails.original_title}
                width={250}
                height={320}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} className={classes.poster}>
              <Typography variant="h5" component="h5">
                {movDetails.original_title}
              </Typography>
                <Grid item xs={3} sm={3} md={12} lg={12}>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label="2.3 Min"
                    color="secondary"
                  />
                  <Chip
                    icon={<FavoriteIcon />}
                    label={movDetails.vote_average}
                    color="secondary"
                  />
                  <Chip
                    icon={<PersonIcon />}
                    label={movDetails.vote_count}
                    color="secondary"
                  />
                </Grid>
                <Box className={classes.root}>
                  <GetGenres />
                </Box>
                <Box>
                  <Typography variant="h6" component="h6">
                    About the movie
                  </Typography>

                  <Typography component="p">{movDetails.overview}</Typography>
                </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={12}>
            <Box my={3}>
              <Typography variant="h4" component="h4">
                Cast
              </Typography>
            </Box>
            <Box my={3} display="flex">
              <GetCast />
            </Box>
          </Grid>
          <Divider className={classes.hr} variant="middle" />
          <SimilerMovies simMoviesIDS={movId} />
        </Grid>
  );
};

export default moviesDetails;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadMovs } from "../../store/action/movies/movActionsCreator";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import store from "../../store/store";
import LinearProgress from "@material-ui/core/LinearProgress";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/movies");
  const data = await res.json();
  return {
    props: { movies: data },
  };
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  movieTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "12rem",
    whiteSpace: "nowrap",
  },
  actions: {
    justifyContent: "center",
  },
  btn: {
    display: "block",
    width: 150,
    padding: 8,
    margin: 20,
    background: "#4979ff",
    borderRadius: 4,
    color: "white",
    textAlign: "center",
  },
});

const movies = ({ movies, loading = true }) => {
  const classes = useStyles();
  const router = useRouter();
  //   const dispatch = useDispatch();
  //   const moviesData = useSelector((state) => state.movies.data);

  //   useEffect(() => {
  //     console.log("useEffect ", movies && movies.data.results);

  //     if (movies && movies.results) {
  //       console.log("in - -- - - --");
  //       loading = false;
  //       console.log("loading - ", loading);
  //     }
  //   }, [movies]);

  //   useEffect(() => {
  //     console.log("use Effet");
  //     dispatch(loadMovs());
  //   }, []);
  const redirect = (movieID) => {
    debugger;
    console.log(movieID);
    router.push(`/movies/${movieID}`);
  };
  // console.log("movies - ", movies);
  return (
    <div>
      <LinearProgress />
      <h1>All Movies</h1>
      <Box m={2} pt={3}>
        <Grid
          container
          maxWidth="xl"
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {movies && movies.data.results ? (
            movies.data.results.map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <Image
                      src={`/t/p/w500/${movie.backdrop_path}`}
                      alt={movie.original_title}
                      width={350}
                      height={200}
                    />
                    <CardContent>
                      <Typography
                        className={classes.movieTitle}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {movie.original_title}
                      </Typography>
                      <Typography
                        className={classes.synopsis}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`${movie.overview.slice(0, 70)}...`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={classes.actions}>
                    <Link href={`/movies/${movie.id}`}>
                      <a className={classes.btn}>Book Now</a>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <Skeleton variant="rect" width={350} height={200} />
                  <CardContent>
                    <Typography
                      className={classes.movieTitle}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      <Skeleton />
                    </Typography>
                    <Typography
                      className={classes.synopsis}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <Skeleton />
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>
                  <Skeleton width={210} height={28} />
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default movies;

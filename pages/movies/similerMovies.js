import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { loadSimMovs } from "../../store/action/similerMovies/movActionsCreator";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Divider, Grid, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    display: "flex",
    oveflow: "auto",
    maxWidth: "100%",
  },
  card: {
    minWidth: 180,
    marginBottom: 20,
    marginRight: 5,
  },
  cardInner: {
    width: "calc(90vw - 16px)",
    display: "flex",
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    justifyContent: "space-between",
  },
  synopsisRating: {
    display: "flex",
    justifyContent: "space-between",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 800,
    margin: 5,
    padding: 5,
  },
}));

const SimilerMovies = ({ ...props }) => {
  const dispatch = useDispatch();
  const simMovies = useSelector((state) => state.simMovies.simData);
  const { simMoviesIDS } = props;

  useEffect(() => {
    console.log("use Effet");
    dispatch(loadSimMovs(simMoviesIDS));
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Box my={3} display="flex">
          <Typography variant="h4" component="h4">
            Similer Movies
          </Typography>
        </Box>
        <Divider variant="fullWidth" orientation="horizontal" />
        <Grid item className={classes.cardInner}>
          {simMovies && simMovies.results ? (
            simMovies.results.map((movie) => (
              <Card className={classes.card}>
                <CardActionArea>
                  <Image
                    src={`/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.original_title}
                    width={350}
                    height={200}
                  />
                  <CardContent>
                    <Typography
                      className={classes.original_title}
                      gutterBottom
                      variant="h6"
                      component="h6"
                      style={{
                        width: "10rem",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {movie.original_title}
                    </Typography>
                    <Typography
                      component="div"
                      className={classes.synopsisRating}
                    >
                      <Typography
                        align="left"
                        className={classes.synopsis}
                        variant="body2"
                        color="textPrimary"
                        component="span"
                      >
                        <CalendarTodayIcon style={{ fontSize: 12 }} />{" "}
                        {movie.release_date}
                      </Typography>

                      <Typography
                        align="right"
                        className={classes.synopsis}
                        variant="body2"
                        color="error"
                        component="span"
                      >
                        <FavoriteIcon style={{ fontSize: 12 }} />{" "}
                        {movie.vote_average}
                      </Typography>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
      </Grid>
    </div>
  );
};

export default SimilerMovies;

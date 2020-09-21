import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Book Tour Guide
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const PlaceLists = ({ places, city, states, images }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {places.map((place) => (
              <Grid item key={place.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={images[place.id].header}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {place.name}
                    </Typography>
                    <Typography>
                      <b>State: </b> {states[city[place.cityId].stateId]}
                    </Typography>
                    <Typography>
                      <b>City: </b> {city[place.cityId].name}
                    </Typography>
                    <Typography className="pt-2">
                      {`${place.description.substr(0, 100)} ....`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link to={`/place/${place.id}`}>Full View</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
        {/* <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    places: state.places,
    city: state.city,
    states: state.state,
    images: state.images,
  };
};

PlaceLists.propTypes = {
  places: PropTypes.array.isRequired,
  city: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
};

export const ConnectedPlaceLists = connect(mapStateToProps)(PlaceLists);

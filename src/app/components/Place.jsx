import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mutations from "../store/mutations";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { ConnectedGuide } from "./GuideDetail";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Place = ({
  user,
  place,
  city,
  states,
  handleCheckbox,
  handleBooking,
  handleDate,
  status,
  images,
  date,
  availableGuides,
  DObooking,
}) => {
  const classes = useStyles();
  return (
    <div>
      {place === undefined ? null : (
        <div>
          <hr />
          <h2>{place.name}</h2>
          <main>
            <Container className={classes.cardGrid}>
              <Grid container spacing={1}>
                {images[place.id].all.map((img) => (
                  <Grid item key={img} xs={12} sm={3} md={3}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={img}
                        title="Image title"
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
          <b>State:</b> {states[city[place.cityId].stateId]}
          <p>
            <b>City:</b> {city[place.cityId].name}
          </p>
          <a href={place.location}>direction</a>
          <hr />
          <h4>Overview: </h4>
          <p>{place.description}</p>
          <hr />
          <div>
            <h5>Amount of one Guide: {place.price}</h5>
          </div>
          <hr />
          <form onSubmit={(e) => handleDate(e)} className="form-inline">
            <input
              type="date"
              name="date"
              min={date}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary   ml-2">
              search for guides
            </button>
          </form>
          {availableGuides.length === 0 ? (
            DObooking === "" ? (
              <h6>Enter Date</h6>
            ) : (
              <h6 style={{ color: "red" }}>
                No guides found! please choose diffrent date
              </h6>
            )
          ) : (
            <div>
              <h4>Guides: </h4>
              <div className="row">
                {availableGuides.map((guide) => (
                  <ConnectedGuide
                    key={guide.id}
                    guideId={guide.id}
                    handleCheckbox={handleCheckbox}
                    isBook={false}
                    className="col"
                  />
                ))}
              </div>
            </div>
          )}
          <hr />
          {status === mutations.REQUIRED_MORE_GUIDE ? (
            <h6 style={{ color: "red" }}>Need More Guides</h6>
          ) : null}
          <form
            onSubmit={(e) => handleBooking(e, DObooking, place.price, user)}
            className="form-inline"
          >
            <span>
              <b>Total Members: </b>
            </span>
            <input
              type="number"
              placeholder="0"
              name="members"
              min="1"
              required
              className="form-control ml-2"
            />
            <button type="submit" className="btn btn-primary ml-2">
              {" "}
              Book Guide
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const user = state.user;
  const id = ownProps.match.params.id;
  const place = state.places.find((place) => place.id === id);
  const availableGuides = state.availableGuides;

  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const date = `${yyyy}-${mm}-${dd}`;
  return {
    user,
    place,
    city: state.city,
    states: state.state,
    status: state.guideCheck.status,
    date,
    availableGuides,
    DObooking: state.DObooking,
    images: state.images,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let selectedGuides = {};
  const placeId = ownProps.match.params.id;
  return {
    handleDate(e) {
      e.preventDefault();
      dispatch(mutations.resetAvailableGuides());
      const date = e.target["date"].value;
      dispatch(mutations.availableGuide(date, placeId));
    },
    handleCheckbox(e) {
      selectedGuides[e.target.value] = e.target.checked;
    },
    handleBooking(e, date, price, user) {
      e.preventDefault();
      const members = e.target["members"].value;
      let guideIds = [];
      for (const guide in selectedGuides) {
        if (selectedGuides[guide] === true) guideIds = [...guideIds, guide];
      }
      dispatch(
        mutations.checkGuides(guideIds, members, placeId, date, price, user)
      );
    },
  };
};

Place.propTypes = {
  user: PropTypes.object,
  place: PropTypes.object,
  availableGuides: PropTypes.array,
  city: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleBooking: PropTypes.func.isRequired,
  handleDate: PropTypes.func.isRequired,
  status: PropTypes.string,
  date: PropTypes.string.isRequired,
  DObooking: PropTypes.string,
};

export const ConnectedPlace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Place);

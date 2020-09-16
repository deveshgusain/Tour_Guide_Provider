import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

import { ConnectedGuide } from "./GuideDetail";

const Place = ({
  place,
  guides,
  city,
  stateObj,
  handleCheckbox,
  handleBooking,
  handleDate,
  status,
  date,
  availableGuides,
  booked,
  DObooking,
}) => (
  <div>
    <hr />
    <h2>{place.name}</h2>
    <p>
      <b>State:</b> {stateObj[city.stateId]}
    </p>
    <p>
      <b>City:</b> {city.name}
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
    <form onSubmit={(e) => handleDate(e, guides, booked)}>
      <input type="date" name="date" min={date} />
      <button type="submit">search for guides</button>
    </form>
    <hr />
    {availableGuides.length === 0 ? (
      DObooking === "" ? (
        <h6>Enter Date</h6>
      ) : (
        <h6>No guides found</h6>
      )
    ) : (
      <div>
        <h4>Guides: </h4>
        <div className="row">
          {availableGuides.map((guide) => (
            <ConnectedGuide
              key={guide}
              guideId={guide}
              handleCheckbox={handleCheckbox}
              isBook={false}
              className="col"
            />
          ))}
        </div>
      </div>
    )}
    <form onSubmit={(e) => handleBooking(e, DObooking)}>
      <span>
        <b>Total Members: </b>
      </span>
      <input type="number" placeholder="0" name="members" min="1" required />
      {status === mutations.REQUIRED_MORE_GUIDE ? (
        <p>Need More Guides</p>
      ) : null}
      <button type="submit">Book Guide</button>
    </form>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const place = state.places.find((place) => place.id === id);
  const guides = state.guides.filter((guide) => guide.placeId === id); // backend
  const availableGuides = state.availableGuides;
  const booked = state.booked; // backend
  const city = state.city[place.cityId];
  const stateObj = state.state;
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
  console.log("date ", date);
  return {
    place,
    guides,
    city,
    stateObj,
    status: state.guideCheck.status,
    date,
    booked,
    availableGuides,
    DObooking: state.DObooking,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let selectedGuides = {};
  const placeId = ownProps.match.params.id;
  return {
    handleDate(e, guides, booked) {
      e.preventDefault();
      dispatch(mutations.resetAvailableGuides());
      const date = e.target["date"].value;
      dispatch(mutations.availableGuide(date, guides, booked));
    },
    handleCheckbox(e) {
      selectedGuides[e.target.value] = e.target.checked;
    },
    handleBooking(e, date) {
      e.preventDefault();
      const members = e.target["members"].value;
      console.log(selectedGuides, " ", members);
      dispatch(mutations.checkGuides(selectedGuides, members, placeId, date));
    },
  };
};

Place.propTypes = {
  place: PropTypes.object.isRequired,
  guides: PropTypes.array,
  booked: PropTypes.array,
  availableGuides: PropTypes.array,
  city: PropTypes.object.isRequired,
  stateObj: PropTypes.object.isRequired,
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

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mutations from "../store/mutations";

import { ConnectedGuide } from "./GuideDetail";

const Place = ({
  user,
  place,
  city,
  states,
  handleCheckbox,
  handleBooking,
  handleDate,
  status,
  date,
  availableGuides,
  DObooking,
}) => (
  <div>
    {place === undefined ? null : (
      <div>
        <hr />
        <h2>{place.name}</h2>
        <p>
          <b>State:</b> {states[city.stateId]}
        </p>
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
        <form onSubmit={(e) => handleDate(e)}>
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
        <form onSubmit={(e) => handleBooking(e, DObooking, place.price, user)}>
          <span>
            <b>Total Members: </b>
          </span>
          <input
            type="number"
            placeholder="0"
            name="members"
            min="1"
            required
          />
          {status === mutations.REQUIRED_MORE_GUIDE ? (
            <p>Need More Guides</p>
          ) : null}
          <button type="submit">Book Guide</button>
        </form>
      </div>
    )}
  </div>
);

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
      console.log(selectedGuides, " ", members);
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

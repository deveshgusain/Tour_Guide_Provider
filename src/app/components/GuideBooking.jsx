import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as mutations from "../store/mutations";

import Grid from "@material-ui/core/Grid";

const GuideBooking = ({ booked, places, handleOtp, handleComplete }) => (
  <div className="row">
    {booked.length === 0 ? (
      <h4 className="pt-3 pl-6">No content Found</h4>
    ) : null}
    {booked.map((visit) => (
      <Grid item key={visit.id} xs={12} sm={3} md={5}>
        <div key={visit.id} className="col card p-2 m-2">
          <h6>Place: </h6>
          <Link to={`../place/${visit.placeId}`}>
            {places[visit.placeId].name}
          </Link>
          <h6 className="pt-2">Date: </h6>
          <p>{visit.date}</p>
          <h6>Totol Members: </h6>
          <p>{visit.members}</p>
          {visit.progress === "0" ? (
            <form
              onSubmit={(e) => handleOtp(e, visit.id, visit)}
              className="form-inline"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                className="form-control ml-2"
              />
              <button type="submit" className="btn btn-primary ml-2">
                submit
              </button>
            </form>
          ) : visit.progress === "1" ? (
            <button
              onClick={() => handleComplete(visit.id, visit)}
              className="btn btn-primary mt-3"
            >
              Complete Visit
            </button>
          ) : null}
        </div>
      </Grid>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  const booked = state.guideBooked;
  const places = {};
  for (let visit in booked) {
    const place = state.places.find(
      (place) => place.id === booked[visit].placeId
    );
    places[booked[visit].placeId] = place;
  }
  return {
    booked,
    places,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOtp(e, bookId, book) {
      e.preventDefault();
      const otp = e.target["otp"].value;
      e.target["otp"].value = null;
      dispatch(mutations.checkOTP(otp, bookId, book));
    },
    handleComplete(bookId, book) {
      dispatch(mutations.requestCompleteVisit(bookId, book));
    },
  };
};

GuideBooking.propTypes = {
  booked: PropTypes.array.isRequired,
  places: PropTypes.object.isRequired,
  handleOtp: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export const ConnectedGuideBooking = connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideBooking);

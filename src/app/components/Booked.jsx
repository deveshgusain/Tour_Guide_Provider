import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { ConnectedGuide } from "./GuideDetail";

const Booked = ({ booked, places }) => (
  <div className="row">
    {booked.map((visit) => (
      <div key={visit.id} className="col card p-2 m-2">
        <h6>Place: </h6>
        <Link to={`place/${visit.placeId}`}>{places[visit.placeId].name}</Link>
        <h6 className="pt-2">Date: </h6>
        <p>{visit.date}</p>
        <h6>Amount Paid: </h6>
        <p>{visit.amount}</p>
        <h6>Totol Members: </h6>
        <p>{visit.members}</p>
        <div className="row">
          {visit.guideIds.map((guide) => (
            <ConnectedGuide
              key={guide}
              guideId={guide}
              isBook={true}
              className="col"
            />
          ))}
        </div>
        <h6>OTP: {visit.otp}</h6>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  const booked = state.booked;
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

Booked.propTypes = {
  booked: PropTypes.array.isRequired,
  places: PropTypes.object.isRequired,
};

export const ConnectedBooked = connect(mapStateToProps)(Booked);

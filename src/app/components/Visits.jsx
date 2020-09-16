import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { ConnectedGuide } from "./GuideDetail";

const Visits = ({ visits, places }) => (
  <div className="row">
    {visits.map((visit) => (
      <div key={visit.id} className="col card p-2 m-2">
        <h6>Place: </h6>
        <Link to={`place/${visit.placeId}`}>{places[visit.placeId].name}</Link>
        <h6 className="pt-2">Date: </h6>
        <p>{visit.date}</p>
        <h6>Amount Paid: </h6>
        <p>{visit.amount}</p>
        <h6>Total Members: </h6>
        <p>{visit.members}</p>
        <div className="row">
          {visit.guideIds.map((guide) => (
            <ConnectedGuide
              key={guide}
              guideId={guide}
              isBook={false}
              className="col"
              visitId={visit.id}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  const visits = state.visits;
  const places = {};
  for (let visit in visits) {
    const place = state.places.find(
      (place) => place.id === visits[visit].placeId
    );
    places[visits[visit].placeId] = place;
  }
  return {
    visits,
    places,
  };
};

Visits.propTypes = {
  visits: PropTypes.array.isRequired,
  places: PropTypes.object.isRequired,
};

export const ConnectedVisits = connect(mapStateToProps)(Visits);

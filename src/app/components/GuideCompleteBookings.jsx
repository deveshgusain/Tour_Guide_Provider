import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GuideCompleteBookings = ({ visits, places, ratings }) => (
  <div className="row">
    {visits.map((visit) => (
      <div key={visit.id} className="col card p-2 m-2">
        <h6>Place: </h6>
        <Link to={`../place/${visit.placeId}`}>
          {places[visit.placeId].name}
        </Link>
        <h6 className="pt-2">Date: </h6>
        <p>{visit.date}</p>
        <h6>Totol Members: </h6>
        <p>{visit.members}</p>

        {ratings[visit.id].isSubmit !== false ? (
          <div>
            <p>
              <b>Rating : {ratings[visit.id].score}</b>
            </p>
          </div>
        ) : (
          <p>Waiting for rating</p>
        )}
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  const visits = state.guideVisits;
  const places = {};
  const ratings = {};
  const userId = state.user.username;
  for (let visit in visits) {
    const place = state.places.find(
      (place) => place.id === visits[visit].placeId
    );
    places[visits[visit].placeId] = place;

    const rating = state.ratings.find(
      (rating) =>
        rating.visitId === visits[visit].id && rating.guideId === userId
    );
    ratings[visits[visit].id] = rating;
  }
  return {
    visits,
    places,
    ratings,
  };
};

GuideCompleteBookings.propTypes = {
  visits: PropTypes.array,
  places: PropTypes.object,
  ratings: PropTypes.object,
};

export const ConnectedGuideCompleteBookings = connect(mapStateToProps)(
  GuideCompleteBookings
);

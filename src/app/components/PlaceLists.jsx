import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PlaceLists = ({ places, city, state }) => (
  <div className="row">
    {places.map((place) => (
      <div key={place.id} className="col card p-2 m-2">
        <Link to={`/place/${place.id}`}>
          <div>{place.name}</div>
        </Link>
        <hr />
        <h6>state: </h6>
        <p>{state[city[place.cityId].stateId]}</p>

        <h6>City: </h6>
        <p>{city[place.cityId].name}</p>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  return {
    places: state.places,
    city: state.city,
    state: state.state,
  };
};

PlaceLists.propTypes = {
  places: PropTypes.array.isRequired,
  city: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export const ConnectedPlaceLists = connect(mapStateToProps)(PlaceLists);

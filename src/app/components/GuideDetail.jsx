import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ConnectedRating } from "./Rating";
import * as mutations from "../store/mutations";

const Guide = ({
  guide,
  languages,
  handleCheckbox,
  isBook,
  visitId,
  rating,
  handleSubmitRating,
}) => (
  <div className="card p-2 m-2">
    <h6>Name: {guide.name}</h6>
    <h6>Languages: </h6>
    {guide.languageIds.map((language) => (
      <p key={language}>{languages[language]}</p>
    ))}
    {isBook === true ? (
      <div>
        <h6>Phone Number: </h6>
        <p>{guide.phoneNo}</p>
      </div>
    ) : visitId === undefined ? (
      <input
        type="checkbox"
        value={guide.id}
        defaultChecked={false}
        onChange={(e) => {
          handleCheckbox(e);
        }}
      />
    ) : rating.isSubmit === true ? (
      <div>
        <b>Rating: {rating.score}</b>
      </div>
    ) : (
      <div>
        <ConnectedRating rating={rating} />
      </div>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const guideId = ownProps.guideId;
  const isBook = ownProps.isBook;
  const visitId = ownProps.visitId;
  let guide = state.guides.find((guide) => guide.id === guideId);
  const user = state.users.find((user) => user.username === guideId);
  const handleCheckbox = ownProps.handleCheckbox;
  guide = { ...guide, ...user };

  //Ratings
  let rating = {};
  if (visitId !== undefined) {
    rating = state.ratings.find(
      (rating) => rating.visitId === visitId && rating.guideId === guideId
    );
  }

  return {
    guide,
    languages: state.languages,
    handleCheckbox,
    isBook,
    rating,
    visitId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitRating(rating, visitId, guideId) {
      dispatch(mutations.requestAddRating(visitId, guideId, rating));
    },
  };
};

Guide.propTypes = {
  guide: PropTypes.object.isRequired,
  languages: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func,
  isBook: PropTypes.bool.isRequired,
  visitId: PropTypes.string,
  rating: PropTypes.object,
  handleSubmitRating: PropTypes.func.isRequired,
};

export const ConnectedGuide = connect(
  mapStateToProps,
  mapDispatchToProps
)(Guide);

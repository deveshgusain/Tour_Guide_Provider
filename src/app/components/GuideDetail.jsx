import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ConnectedRating } from "./Rating";

const Guide = ({
  guide,
  languages,
  handleCheckbox,
  isBook,
  visitId,
  rating,
}) => (
  <div className="card p-2 m-2">
    <h5>Name: {guide.name}</h5>
    <h6 className="mt-2">Languages: </h6>
    <table>
      {guide.languageIds.map((language) => (
        <tc key={language}>
          {languages[language]}
          {`  `}
        </tc>
      ))}
    </table>
    {isBook === true ? (
      <div className="mt-3">
        <h5>Phone Number: </h5>
        <p>{guide.phoneNo}</p>
      </div>
    ) : visitId === undefined ? (
      <input
        className="mt-3"
        type="checkbox"
        value={guide.id}
        defaultChecked={false}
        onChange={(e) => {
          handleCheckbox(e);
        }}
      />
    ) : rating.isSubmit === true ? (
      <div className="mt-5">
        <b>Rating: {rating.score}</b>
      </div>
    ) : (
      <div className="mt-3">
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

Guide.propTypes = {
  guide: PropTypes.object.isRequired,
  languages: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func,
  isBook: PropTypes.bool.isRequired,
  visitId: PropTypes.string,
  rating: PropTypes.object,
  handleSubmitRating: PropTypes.func,
};

export const ConnectedGuide = connect(mapStateToProps)(Guide);

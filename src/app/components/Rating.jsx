import React from "react";
import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as mutations from "../store/mutations";

const HoverRating = ({ handleSubmitRating, handleChangeRating, rating }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmitRating(rating.score);
    }}
  >
    <Rating
      id={rating.id}
      name={`rating${rating.id}`}
      value={Number(rating.score)}
      precision={1}
      onChange={handleChangeRating}
    />
    <button type="submit" className="btn btn-primary ml-2">
      Rate
    </button>
  </form>
);

const mapStateToProps = (state, ownProps) => {
  return {
    rating: ownProps.rating,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const ratingId = ownProps.rating.id;
  return {
    handleChangeRating(e) {
      const score = e.target.value;
      dispatch(mutations.changeRating(ratingId, score));
    },
    handleSubmitRating(score) {
      dispatch(mutations.submitRating(ratingId, score));
    },
  };
};

HoverRating.propTypes = {
  handleSubmitRating: PropTypes.func.isRequired,
  handleChangeRating: PropTypes.func.isRequired,
  rating: PropTypes.object.isRequired,
};

export const ConnectedRating = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoverRating);

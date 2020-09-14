import React from "react";
import { connect } from "react-redux";
import PropTypes, { bool } from "prop-types";

const Guide = ({ guide, languages, handleCheckbox, isPhone }) => (
  <div className="card p-2 m-2">
    <h6>Name: {guide.name}</h6>
    <h6>Languages: </h6>
    {guide.languageIds.map((language) => (
      <p key={language}>{languages[language]}</p>
    ))}
    {isPhone === true ? (
      <div>
        <h6>Phone Number: </h6>
        <p>{guide.phoneNo}</p>
      </div>
    ) : (
      <input
        type="checkbox"
        value={guide.id}
        defaultChecked={false}
        onChange={(e) => {
          handleCheckbox(e);
        }}
      />
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const guideId = ownProps.guideId;
  const isPhone = ownProps.isPhone;
  let guide = state.guides.find((guide) => guide.id === guideId);
  const user = state.users.find((user) => user.username === guideId);
  const handleCheckbox = ownProps.handleCheckbox;
  guide = { ...guide, ...user };
  return {
    guide,
    languages: state.languages,
    handleCheckbox,
    isPhone,
  };
};

Guide.propTypes = {
  guide: PropTypes.object.isRequired,
  languages: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func,
  isPhone: PropTypes.bool.isRequired,
};

export const ConnectedGuide = connect(mapStateToProps)(Guide);

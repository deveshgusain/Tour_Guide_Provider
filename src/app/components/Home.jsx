import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ConnectedPlaceLists } from "./PlaceLists";

const Home = () => (
  <div>
    <ConnectedPlaceLists />
  </div>
);

const mapStateToProps = (state) => state;

Home.propTypes = {
  places: PropTypes.array.isRequired,
};

export const ConnectedHome = connect(mapStateToProps)(Home);

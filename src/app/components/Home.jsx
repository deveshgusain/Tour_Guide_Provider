import React from "react";
import { connect } from "react-redux";

import { ConnectedPlaceLists } from "./PlaceLists";

const Home = () => (
  <div>
    <ConnectedPlaceLists />
  </div>
);

const mapStateToProps = (state) => state;

export const ConnectedHome = connect(mapStateToProps)(Home);

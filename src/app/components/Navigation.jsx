import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {"  |  "}
      <NavLink to="/visits" activeStyle={activeStyle} exact>
        Visits
      </NavLink>
      {"  |  "}
      <NavLink to="/booked" activeStyle={activeStyle} exact>
        Booked Trips
      </NavLink>
    </nav>
  );
};

const mapStateToProps = (state) => state;

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

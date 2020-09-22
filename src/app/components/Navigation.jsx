import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import PropTypes from "prop-types";

const Navigation = ({ user }) => {
  const activeStyle = { color: "#F15B2A", fontWeight: "bold" };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{ fontSize: "20px" }}>
        <div className="mr-auto">
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>
          {user.name !== undefined ? "  |  " : null}

          {user.name !== undefined ? (
            <NavLink to="/visits" activeStyle={activeStyle} exact>
              Visits
            </NavLink>
          ) : null}

          {user.name !== undefined ? "  |  " : null}

          {user.name !== undefined ? (
            <NavLink to="/booked" activeStyle={activeStyle} exact>
              Booked Trips
            </NavLink>
          ) : null}

          {user.name !== undefined && user.role === "guide" ? "  |  " : null}
          {user.name !== undefined && user.role === "guide" ? (
            <NavLink to="/guide/booking" activeStyle={activeStyle} exact>
              Guide Bookings
            </NavLink>
          ) : null}

          {user.name !== undefined && user.role === "guide" ? "  |  " : null}
          {user.name !== undefined && user.role === "guide" ? (
            <NavLink to="/guide/complete" activeStyle={activeStyle} exact>
              Guide complete Bookings
            </NavLink>
          ) : null}
        </div>
        <div>
          {user.name === undefined ? (
            <NavLink
              to="/signin"
              activeStyle={activeStyle}
              exact
              className="justify-content-end"
            >
              SignIn
            </NavLink>
          ) : (
            <nav>
              <NavLink
                to="/profile" // change it later
                activeStyle={activeStyle}
                exact
                className="justify-content-end"
              >
                {user.name}
              </NavLink>
              {"  |  "}
              <a href="/">Signout</a>
            </nav>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

Navigation.propTypes = {
  user: PropTypes.object,
};

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

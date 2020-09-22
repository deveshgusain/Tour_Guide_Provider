import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";

import { history } from "../store/history";
import { ConnectedHome } from "./Home";
import { ConnectedPlace } from "./Place";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedVisits } from "./Visits";
import { ConnectedBooked } from "./Booked";
import { ConnectedPaymentGateway } from "./PaymentGateway";
import { ConnectedGuideBooking } from "./GuideBooking";
import { ConnectedGuideCompleteBookings } from "./GuideCompleteBookings";
import { ConnectedSignIn } from "./SignIn";

import * as mutations from "../store/mutations";
import { ConnectedSignUp } from "./signup";

const InitialRouteGuard = (Component) => ({ match }) => {
  if (store.getState().places.length === 0) {
    store.dispatch(mutations.requestInitialState());
    return <Component match={match} />;
  } else {
    return <Component match={match} />;
  }
};

const UserRouteGuard = (Component) => ({ match }) => {
  if (Object.keys(store.getState().user).length === 0) {
    return <Redirect to="/signin" />;
  } else {
    return <Component match={match} />;
  }
};

const GuideRouteGuard = (Component) => ({ match }) => {
  if (
    Object.keys(store.getState().user).length === 0 ||
    store.getState().user.role !== "guide"
  ) {
    return <Redirect to="/signin" />;
  } else {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={InitialRouteGuard(ConnectedHome)} />
        <Route
          exact
          path="/place/:id"
          component={InitialRouteGuard(ConnectedPlace)}
        />
        <Route
          exact
          path="/visits"
          component={UserRouteGuard(ConnectedVisits)}
        />
        <Route
          exact
          path="/booked"
          component={UserRouteGuard(ConnectedBooked)}
        />
        <Route
          exact
          path="/payment"
          component={UserRouteGuard(ConnectedPaymentGateway)}
        />
        <Route
          exact
          path="/guide/booking"
          component={GuideRouteGuard(ConnectedGuideBooking)}
        />
        <Route
          exact
          path="/guide/complete"
          component={GuideRouteGuard(ConnectedGuideCompleteBookings)}
        />
        <Route exact path="/signin" component={ConnectedSignIn} />
        <Route exact path="/signup" component={ConnectedSignUp} />
      </div>
    </Provider>
  </Router>
);

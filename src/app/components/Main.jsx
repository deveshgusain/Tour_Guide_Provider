import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";

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

const RouteGuard = (Component) => ({ match }) => {
  if (store.getState().places.length === 0) {
    store.dispatch(mutations.requestInitialState());
    return <Component match={match} />;
  }
  {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={RouteGuard(ConnectedHome)} />
        <Route exact path="/place/:id" component={RouteGuard(ConnectedPlace)} />
        <Route exact path="/visits" component={ConnectedVisits} />
        <Route exact path="/booked" component={ConnectedBooked} />
        <Route exact path="/payment" component={ConnectedPaymentGateway} />
        <Route exact path="/guide/booking" component={ConnectedGuideBooking} />
        <Route
          exact
          path="/guide/complete"
          component={ConnectedGuideCompleteBookings}
        />
        <Route exact path="/signin" component={ConnectedSignIn} />
      </div>
    </Provider>
  </Router>
);

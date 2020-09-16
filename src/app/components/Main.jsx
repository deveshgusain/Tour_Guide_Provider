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

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedHome}></Route>
        <Route exact path="/place/:id" component={ConnectedPlace}></Route>
        <Route exact path="/visits" component={ConnectedVisits} />
        <Route exact path="/booked" component={ConnectedBooked} />
        <Route exact path="/payment" component={ConnectedPaymentGateway} />
        <Route exact path="/guide/booking" component={ConnectedGuideBooking} />
        <Route
          exact
          path="/guide/complete"
          component={ConnectedGuideCompleteBookings}
        />
      </div>
    </Provider>
  </Router>
);

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
      </div>
    </Provider>
  </Router>
);

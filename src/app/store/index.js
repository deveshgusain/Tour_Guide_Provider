import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { defaultState } from "../../server/defaultState";

const sagaMiddleware = createSagaMiddleware();

import * as sagas from "./sagas";
import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    visits(visits = defaultState.visits) {
      return visits;
    },
    booked(booked = defaultState.booked, action) {
      const {
        type,
        id,
        user,
        placeId,
        date,
        amount,
        members,
        guideIds,
      } = action;
      switch (type) {
        case mutations.ADD_BOOKING:
          return [
            ...booked,
            {
              id,
              user,
              placeId,
              date,
              amount,
              members,
              guideIds,
            },
          ];
        default:
          return booked;
      }
    },
    guides(guides = defaultState.guides) {
      return guides;
    },
    places(places = defaultState.places) {
      return places;
    },
    feedbacks(feedbacks = defaultState.feedbacks) {
      return feedbacks;
    },
    languages(languages = defaultState.languages) {
      return languages;
    },
    state(state = defaultState.state) {
      return state;
    },
    city(city = defaultState.city) {
      return city;
    },
    users(user = defaultState.users) {
      return user;
    },
    guideCheck(guideCheck = {}, action) {
      let { type, status } = action;
      switch (type) {
        case mutations.REQUEST_GUIDE_CHECKING:
          return {
            ...guideCheck,
            status: mutations.VALIDATING_GUIDE_CHECKING,
          };
        case mutations.PROCESSING_GUIDE_CHECKING:
          return { ...guideCheck, status };
        default:
          return guideCheck;
      }
    },
    availableGuides(availableGuides = [], action) {
      switch (action.type) {
        case mutations.ADD_AVAILABLE_GUIDES:
          return [...availableGuides, ...action.availableGuides];
        case mutations.RESET_AVAILABLE_GUIDES:
          return [];
        default:
          return availableGuides;
      }
    },
    DObooking(DObooking = "", action) {
      switch (action.type) {
        case mutations.CHANGE_DOBOOKING:
          return action.date;
        default:
          return DObooking;
      }
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

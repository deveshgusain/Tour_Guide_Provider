import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { defaultState } from "../../server/defaultState";

const sagaMiddleware = createSagaMiddleware();

import * as sagas from "./sagas";
import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    visits(visits = defaultState.visits, action) {
      switch (action.type) {
        case mutations.ADD_VISITS:
          return [
            ...visits,
            {
              id: action.visit.id,
              user: action.visit.user,
              placeId: action.visit.placeId,
              date: action.visit.date,
              amount: action.visit.amount,
              members: action.visit.members,
              guideIds: action.visit.guideIds,
            },
          ];
        default:
          return visits;
      }
    },
    booked(booked = defaultState.booked, action) {
      switch (action.type) {
        case mutations.ADD_BOOKING:
          return [
            ...booked,
            {
              id: action.book.id,
              user: action.book.user,
              placeId: action.book.placeId,
              date: action.book.date,
              amount: action.book.amount,
              members: action.book.members,
              guideIds: action.book.guideIds,
              otp: action.book.otp,
              progress: action.book.progress,
            },
          ];
        case mutations.UPDATE_BOOK_PROGRESS:
          return booked.map((book) => {
            return book.id === action.bookId
              ? { ...book, progress: action.progress }
              : book;
          });
        case mutations.DELETE_BOOKING:
          return booked.filter((book) => book.id !== action.bookId);
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
    ratings(ratings = defaultState.ratings, action) {
      switch (action.type) {
        case mutations.ADD_RATING:
          return [
            ...ratings,
            {
              id: action.id,
              visitId: action.visitId,
              guideId: action.guideId,
              score: action.rating,
              isSubmit: action.isSubmit,
            },
          ];
        case mutations.CHANGE_RATING:
          return ratings.map((rating) => {
            return rating.id === action.id
              ? { ...rating, score: action.rating }
              : rating;
          });
        case mutations.SUBMIT_RATING:
          return ratings.map((rating) => {
            return rating.id === action.id
              ? { ...rating, isSubmit: true }
              : rating;
          });
        default:
          return ratings;
      }
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

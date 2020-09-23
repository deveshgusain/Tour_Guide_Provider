import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

// import { defaultState } from "../../server/defaultState";

const sagaMiddleware = createSagaMiddleware();

import * as sagas from "./sagas";
import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    session(userSession = {}, action) {
      let { type, status } = action;
      switch (type) {
        case mutations.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, status: mutations.AUTHENTICATING };
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, status };
        default:
          return userSession;
      }
    },
    visits(visits = [], action) {
      switch (action.type) {
        case mutations.SET_USER_STATE:
          return action.state.visits;
        default:
          return visits;
      }
    },
    booked(booked = [], action) {
      switch (action.type) {
        case mutations.SET_USER_STATE:
          return action.state.booked;
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
        default:
          return booked;
      }
    },
    guides(guides = [], action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.guides;
        default:
          return guides;
      }
    },
    places(places = [], action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.places;
        default:
          return places;
      }
    },
    images(images = {}, action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.images;
        default:
          return images;
      }
    },
    ratings(ratings = [], action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.ratings;
        case mutations.ADD_RATING:
          return [
            ...ratings,
            {
              id: action.id,
              visitId: action.visitId,
              guideId: action.guideId,
              score: action.score,
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
            return rating.id === action.ratingId
              ? { ...rating, isSubmit: true }
              : rating;
          });
        default:
          return ratings;
      }
    },
    languages(languages = {}, action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.languages;
        default:
          return languages;
      }
    },
    state(state = {}, action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.state;
        default:
          return state;
      }
    },
    city(city = {}, action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.city;
        default:
          return city;
      }
    },
    users(users = [], action) {
      switch (action.type) {
        case mutations.SET_INITIAL_STATE:
          return action.state.users;
        default:
          return users;
      }
    },
    user(user = {}, action) {
      switch (action.type) {
        case mutations.SET_USER_STATE:
          return action.state.user;
        case mutations.EDIT_USER:
          return { ...user, name: action.name, phoneNo: action.phoneNo };
        default:
          return user;
      }
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
    guideVisits(guideVisits = [], action) {
      switch (action.type) {
        case mutations.SET_USER_STATE:
          return action.state.guideVisits;
        case mutations.ADD_VISITS:
          return [
            ...guideVisits,
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
          return guideVisits;
      }
    },
    guideBooked(guideBooked = [], action) {
      switch (action.type) {
        case mutations.SET_USER_STATE:
          return action.state.guideBooked;
        case mutations.UPDATE_BOOK_PROGRESS:
          return guideBooked.map((book) => {
            return book.id === action.bookId
              ? { ...book, progress: action.progress }
              : book;
          });
        case mutations.DELETE_BOOKING:
          return guideBooked.filter((book) => book.id !== action.bookId);
        default:
          return guideBooked;
      }
    },
  }),
  applyMiddleware(sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

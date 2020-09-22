import { put, take, select } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import { history } from "./history";
import axios from "axios";

import * as mutations from "./mutations";

const url = process.env.NODE_ENV == `production` ? "" : "http://localhost:7777";

export function* requestGuideCheckingSaga() {
  while (true) {
    let { guideIds, members, placeId, date, price, user } = yield take(
      mutations.REQUEST_GUIDE_CHECKING
    );
    try {
      if (Object.keys(user).length === 0) {
        throw new Error();
      }
      let selected = guideIds.length;
      if (selected * 10 < members) {
        throw new Error();
      }
      yield put(mutations.processingGuideChecking(mutations.ENOUGH_GUIDES));

      const id = uuid();
      user = user.username;
      const progress = "0";
      let otp = Math.floor(100000 + Math.random() * 900000);
      otp = otp.toString();
      const amount = price * selected; // axios backend for amount
      const NewBooking = {
        id,
        user,
        placeId,
        date,
        amount,
        members,
        guideIds,
        otp,
        progress,
      };

      const { data } = yield axios.post(url + `/booking/add`, {
        NewBooking,
      });
      console.log("Booking Completed ", data);
      yield put(mutations.addBooking(NewBooking));

      yield put(mutations.resetAvailableGuides());
      yield put(mutations.changeDObooking(""));

      history.push("/booked");
    } catch (error) {
      if (Object.keys(user).length === 0) {
        yield put(mutations.resetAvailableGuides());
        history.push("/signin");
      } else {
        console.log("Not Enough Guides");
        yield put(
          mutations.processingGuideChecking(mutations.REQUIRED_MORE_GUIDE)
        );
      }
    }
  }
}

export function* requestAvailableGuideSaga() {
  while (true) {
    const { date, placeId } = yield take(mutations.REQUEST_AVAILABLE_GUIDES);
    let availableGuide = [];
    try {
      if (date === "") {
        throw new Error();
      }

      const { data } = yield axios.post(url + `/guide/available`, {
        date,
        placeId,
      });
      availableGuide = data;
      yield put(mutations.addAvailableGuides(availableGuide));
      yield put(mutations.changeDObooking(date));
      console.info("availble Guides added ", availableGuide);
    } catch (error) {
      yield put(mutations.addAvailableGuides(availableGuide));
    }
  }
}

export function* checkOTPSaga() {
  while (true) {
    const { otp, bookId, book } = yield take(mutations.CHECK_OTP); //book from server
    if (book.otp === otp) {
      const progress = "1";
      yield put(mutations.updateBookProgress(bookId, progress));
      yield axios.post(url + `/booked/update`, {
        bookId,
        progress,
      });
    } else {
      alert("Wrong OTP! Try again...");
    }
  }
}

export function* requestCompleteVisitSaga() {
  while (true) {
    const { bookId, book } = yield take(mutations.REQUEST_COMPLETE_VISIT);
    // add in visits
    const NewVisit = {
      id: book.id,
      user: book.user,
      placeId: book.placeId,
      date: book.date,
      amount: book.amount,
      members: book.members,
      guideIds: book.guideIds,
    };
    yield put(mutations.addVisits(NewVisit));
    yield axios.post(url + `/visit/add`, {
      NewVisit,
    });
    // add rating
    for (let guide in NewVisit.guideIds) {
      const NewRating = {
        id: uuid(),
        visitId: NewVisit.id,
        guideId: NewVisit.guideIds[guide],
        score: 2,
        isSubmit: false,
      };
      // yield put(
      //   mutations.requestAddRating(NewVisit.id, NewVisit.guideIds[guide])
      // );
      yield put(mutations.addRating(NewRating));
      yield axios.post(url + `/rating/add`, {
        NewRating,
      });
      console.info("Rating added.. ", NewRating);
    }
    // delete from bookings
    yield put(mutations.deleteBooking(bookId));
    history.push("/guide/complete");
    yield axios.post(url + `/booked/delete`, {
      bookId,
    });
  }
}

export function* addRatingSaga() {
  while (true) {
    const { visitId, guideId } = yield take(mutations.REQUEST_ADD_RATING);
    const score = 2;
    const id = uuid();
    const isSubmit = false;
    const NewRating = {
      id,
      visitId,
      guideId,
      score,
      isSubmit,
    };
    yield put(mutations.addRating(NewRating));
    yield axios.post(url + `/rating/add`, {
      NewRating,
    });
    console.info("Rating added.. ", NewRating);
  }
}

export function* submitRatingSaga() {
  while (true) {
    const { ratingId, score } = yield take(mutations.SUBMIT_RATING);
    const { data } = yield axios.post(url + `/rating/submit`, {
      ratingId,
      score,
    });
    console.info("submitted rating ", data);
  }
}

export function* authenticateUserSaga() {
  while (true) {
    const { email, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    try {
      // backend check
      const { data } = yield axios.post(url + `/signin`, {
        email,
        password,
      });
      if (!data) {
        throw new Error();
      }
      console.log("Authenticated ", data);
      yield put(mutations.setUserState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/");
    } catch (error) {
      console.log("Not Authenticated ", error);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export function* addInitialStateSaga() {
  while (true) {
    yield take(mutations.REQUEST_INITIAL_STATE);
    const { data } = yield axios.post(url + `/`, {});
    console.info("Inital state ", data);
    yield put(mutations.setInitialState(data));
  }
}

export function* createUserSaga() {
  while (true) {
    const { name, email, password, phoneNo } = yield take(
      mutations.CREATE_USER
    );
    try {
      const username = email.split("@")[0];
      const role = "user";
      const { data } = yield axios.post(url + `/user/new`, {
        name,
        username,
        password,
        email,
        phoneNo,
        role,
      });
      console.log("Created ", data);
      yield put(mutations.setUserState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/");
    } catch (e) {
      yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
    }
  }
}

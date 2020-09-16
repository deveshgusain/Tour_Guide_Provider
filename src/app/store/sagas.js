import { func } from "prop-types";
import { put, take, select } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import { history } from "./history";

import * as mutations from "./mutations";

export function* requestGuideCheckingSaga() {
  while (true) {
    const { selectedGuides, members, placeId, date } = yield take(
      mutations.REQUEST_GUIDE_CHECKING
    );
    try {
      let selected = 0;
      for (const guide in selectedGuides) {
        if (selectedGuides[guide] === true) selected += 1;
      }
      console.log(selected, " ", members);
      if (selected * 10 < members) {
        throw new Error();
      }
      yield put(mutations.processingGuideChecking(mutations.ENOUGH_GUIDES));

      const id = uuid();
      const user = "test";
      const progress = "0";
      let otp = Math.floor(100000 + Math.random() * 900000);
      otp = otp.toString();
      let guideIds = [];
      for (const guide in selectedGuides) {
        if (selectedGuides[guide] === true) guideIds = [...guideIds, guide];
      }
      const amount = "0500"; // axios backend for amount
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
      yield put(mutations.addBooking(NewBooking));
      console.log("Booking Completed ", NewBooking);

      yield put(mutations.resetAvailableGuides());
      yield put(mutations.changeDObooking(""));

      history.push("/booked");
    } catch (error) {
      console.log("Not Enough Guides");
      yield put(
        mutations.processingGuideChecking(mutations.REQUIRED_MORE_GUIDE)
      );
    }
  }
}

export function* requestAvailableGuideSaga() {
  while (true) {
    const { date, guides, booked } = yield take(
      mutations.REQUEST_AVAILABLE_GUIDES
    );

    let availableGuide = [];
    try {
      if (date === "") {
        throw new Error();
      }
      let f = 0;
      // check whether a guide available or not
      for (const guide in guides) {
        f = 0;
        for (const book in booked) {
          for (const bookedGuide in booked[book].guideIds) {
            if (
              booked[book].guideIds[bookedGuide] === guides[guide].id &&
              booked[book].date === date
            ) {
              f = 1;
              break;
            }
          }
          if (f === 1) break;
        }
        if (f == 0) {
          availableGuide = [...availableGuide, guides[guide].id];
        }
      }
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
    } else {
      alert("Wrong OTP! Try again...");
    }
  }
}

export function* requestCompleteVisitSaga() {
  while (true) {
    const { bookId, book } = yield take(mutations.REQUEST_COMPLETE_VISIT);
    // add in visits
    yield put(mutations.addVisits(book));
    // add rating
    for (let guide in book.guideIds) {
      yield put(mutations.requestAddRating(bookId, book.guideIds[guide]));
    }
    // delete from bookings
    yield put(mutations.deleteBooking(bookId));
    history.push("/guide/complete");
  }
}

export function* addRatingSaga() {
  while (true) {
    const { visitId, guideId } = yield take(mutations.REQUEST_ADD_RATING);
    const score = 2;
    const id = uuid();
    const isSubmit = false;
    const Newrating = {
      id,
      visitId,
      guideId,
      score,
      isSubmit,
    };
    yield put(mutations.addRating(Newrating));
    console.info("Rating added.. ", Newrating);
  }
}

export const REQUEST_GUIDE_CHECKING = "REQUEST_GUIDE_CHECKING";
export const VALIDATING_GUIDE_CHECKING = "VALIDATING_GUIDE_CHECKING";
export const PROCESSING_GUIDE_CHECKING = "PROCESSING_GUIDE_CHECKING";
export const REQUIRED_MORE_GUIDE = "REQUIRED_MORE_GUIDE";
export const ENOUGH_GUIDES = "ENOUGH_GUIDES";
export const BOOKING_FAILED = "BOOKING_FAILED";
export const BOOKING_COMPLETE = "BOOKING_COMPLETE";
export const CONFIRM_BOOKING = "CONFIRM_BOOKING";
export const CANCLE_BOOKING = "CANCLE_BOOKING";
export const PROCESS_BOOKING = "PROCESS_BOOKING";
export const ADD_BOOKING = "ADD_BOOKING";
export const REQUEST_AVAILABLE_GUIDES = "REQUEST_AVAILABLE_GUIDES";
export const ADD_AVAILABLE_GUIDES = "ADD_AVAILABLE_GUIDES";
export const RESET_AVAILABLE_GUIDES = "RESET_AVAILABLE_GUIDES";
export const CHANGE_DOBOOKING = "CHANGE_DOBOOKING";
export const CHECK_OTP = "CHECK_OTP";
export const PROCESS_OTP = "PROCESS_OTP";
export const WRONG_OTP = "WRONG_OTP";
export const CHECKING_OTP = "CHECKING_OTP";
export const UPDATE_BOOK_PROGRESS = "UPDATE_BOOK_PROGRESS";
export const REQUEST_COMPLETE_VISIT = "REQUEST_COMPLETE_VISIT";
export const ADD_VISITS = "ADD_VISITS";
export const DELETE_BOOKING = "DELETE_BOOKING";
//Rating
export const REQUEST_ADD_RATING = "REQUEST_ADD_RATING";
export const ADD_RATING = "ADD_RATING";
export const CHANGE_RATING = "CHANGE_RATING";
export const SUBMIT_RATING = "SUBMIT_RATING";
//SignIn
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
export const REQUEST_AUTHENTICATE_USER = "REQUEST_AUTHENTICATE_USER";
export const PROCESSING_AUTHENTICATE_USER = "PROCESS_AUTHENTICATE_USER";
//Initial State
export const REQUEST_INITIAL_STATE = "REQUEST_INITIAL_STATE";
export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const SET_USER_STATE = "SET_USER_STATE";

export const checkGuides = (guideIds, members, placeId, date, price, user) => ({
  type: REQUEST_GUIDE_CHECKING,
  guideIds,
  members,
  placeId,
  date,
  price,
  user,
});

export const processingGuideChecking = (
  status = VALIDATING_GUIDE_CHECKING,
  bookingSession = null
) => ({
  type: PROCESSING_GUIDE_CHECKING,
  status,
  bookingSession,
});

export const confirmBooking = (status = BOOKING_COMPLETE) => ({
  type: CONFIRM_BOOKING,
  status,
});

export const cancleBooking = (status = BOOKING_FAILED) => ({
  type: CANCLE_BOOKING,
  status,
});

export const processBooking = (status) => ({
  type: PROCESS_BOOKING,
  status,
});

export const addBooking = (book) => ({
  type: ADD_BOOKING,
  book,
});

export const availableGuide = (date, placeId) => ({
  type: REQUEST_AVAILABLE_GUIDES,
  date,
  placeId,
});

export const addAvailableGuides = (availableGuides = []) => ({
  type: ADD_AVAILABLE_GUIDES,
  availableGuides,
});

export const resetAvailableGuides = () => ({
  type: RESET_AVAILABLE_GUIDES,
});

export const changeDObooking = (date) => ({
  type: CHANGE_DOBOOKING,
  date,
});

export const checkOTP = (otp, bookId, book) => ({
  type: CHECK_OTP,
  otp,
  bookId,
  book,
});

export const updateBookProgress = (bookId, progress) => ({
  type: UPDATE_BOOK_PROGRESS,
  bookId,
  progress,
});

export const requestCompleteVisit = (bookId, book) => ({
  type: REQUEST_COMPLETE_VISIT,
  bookId,
  book,
});

export const addVisits = (visit) => ({
  type: ADD_VISITS,
  visit,
});

export const deleteBooking = (bookId) => ({
  type: DELETE_BOOKING,
  bookId,
});

export const requestAddRating = (visitId, guideId) => ({
  type: REQUEST_ADD_RATING,
  visitId,
  guideId,
});

export const addRating = ({ id, visitId, guideId, score, isSubmit }) => ({
  type: ADD_RATING,
  id,
  visitId,
  guideId,
  score,
  isSubmit,
});

export const changeRating = (id, rating) => ({
  type: CHANGE_RATING,
  id,
  rating,
});

export const submitRating = (ratingId, score) => ({
  type: SUBMIT_RATING,
  ratingId,
  score,
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password,
});

export const processAuthenticateUser = (status) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  status,
});

export const requestInitialState = () => ({
  type: REQUEST_INITIAL_STATE,
});

export const setInitialState = (state = {}) => ({
  type: SET_INITIAL_STATE,
  state,
});

export const setUserState = (state = {}) => ({
  type: SET_USER_STATE,
  state,
});

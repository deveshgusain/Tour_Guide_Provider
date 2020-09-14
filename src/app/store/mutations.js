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

export const checkGuides = (selectedGuides, members, placeId, date) => ({
  type: REQUEST_GUIDE_CHECKING,
  selectedGuides,
  members,
  placeId,
  date,
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

export const addBooking = ({
  id,
  user,
  placeId,
  date,
  amount,
  members,
  guideIds,
}) => ({
  type: ADD_BOOKING,
  id,
  user,
  placeId,
  date,
  amount,
  members,
  guideIds,
});

export const availableGuide = (date, guides, booked) => ({
  type: REQUEST_AVAILABLE_GUIDES,
  date,
  guides,
  booked,
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

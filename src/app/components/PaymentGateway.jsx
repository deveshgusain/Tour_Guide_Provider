import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as mutations from "../store/mutations";

const PaymentGateway = ({ handleCancle, handleConfirm }) => (
  <div>
    <h4>Paytm Karo</h4>
    <h6>Do you want to proceed the payment</h6>
    <button onClick={handleConfirm} name="yes">
      Yes
    </button>
    <button onClick={handleCancle} name="no">
      No
    </button>
  </div>
);

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    handleCancle(e) {
      e.preventDefault();
      dispatch(mutations.cancleBooking());
    },
    handleConfirm(e) {
      e.preventDefault();
      dispatch(mutations.confirmBooking());
    },
  };
};

PaymentGateway.propTypes = {
  handleCancle: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export const ConnectedPaymentGateway = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentGateway);

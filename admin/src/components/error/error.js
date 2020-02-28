import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import Loader from "../loader/loader";

const Error = ({ title, message }) =>
  title ? (
    <Message negative>
      <Message.Header>{title}</Message.Header>
      {message && <p>{message}</p>}
    </Message>
  ) : null;

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

Error.defaultProps = {
  title: "",
  message: ""
};

const mapStateToProps = state => ({
  title: state.global.error
});

const ConnectedError = connect(mapStateToProps)(Loader);

export default Error;

export { ConnectedError };

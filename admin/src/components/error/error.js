import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message as UIMessage } from "semantic-ui-react";

const Message = ({ title, message, negative }) =>
  title ? (
    <UIMessage negative={negative} positive={!negative}>
      <UIMessage.Header>{title}</UIMessage.Header>
      {message && <p>{message}</p>}
    </UIMessage>
  ) : null;

Message.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  negative: PropTypes.bool
};

Message.defaultProps = {
  title: "",
  message: "",
  negative: false
};

const mapStateToPropsError = state => ({
  title: state.global.error,
  negative: true
});
const mapStateToPropsSuccess = state => ({
  title: state.global.success
});

const ConnectedError = connect(mapStateToPropsError)(Message);
const ConnectedSuccess = connect(mapStateToPropsSuccess)(Message);

export default Message;

export { ConnectedError, ConnectedSuccess };

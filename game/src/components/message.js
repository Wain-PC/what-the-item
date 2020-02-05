/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";

const Message = ({ message }) => {
  let text = "";

  if (message.answered === true) {
    text = "Правильный ответ!";
  } else if (message.answered === false) {
    text = "Неверный ответ!";
  }

  return <h1>{text}</h1>;
};

Message.propTypes = {
  message: PropTypes.string
};

Message.defaultProps = {
  message: ""
};

export default Message;

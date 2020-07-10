/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./wideButton.module.css";

const WideButton = ({ text, onClick }) => {
  return (
    <div
      className={cn(styles.root, styles[text])}
      onClick={() => {
        onClick();
      }}
    />
  );
};

WideButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default WideButton;

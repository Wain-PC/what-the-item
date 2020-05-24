/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import styles from "./nickName.module.css";

const NickName = ({ value, onChange, disabled }) => {
  return (
    <input
      type="text"
      disabled={disabled}
      className={styles.input}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
};

NickName.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NickName;

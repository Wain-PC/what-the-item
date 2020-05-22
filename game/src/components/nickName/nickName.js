/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import styles from "./nickName.module.css";

const NickName = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
};

NickName.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NickName;

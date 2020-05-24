import React from "react";
import PropTypes from "prop-types";
import styles from "./root.module.css";

const Root = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

Root.propTypes = {
  children: PropTypes.element.isRequired
};

export default Root;

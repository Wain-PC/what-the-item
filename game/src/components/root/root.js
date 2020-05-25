import React from "react";
import PropTypes from "prop-types";
import styles from "./root.module.css";

const Root = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

Root.propTypes = {
  children: PropTypes.node.isRequired
};

export default Root;

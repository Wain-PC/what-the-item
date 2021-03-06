import React from "react";
import PropTypes from "prop-types";
import LoaderComponent from "react-loader-spinner";
import styles from "./loader.module.css";

const Loader = ({ type }) => {
  return (
    <div className={styles.loader}>
      <LoaderComponent type={type} width="100%" height="100%" color="#FFFFFF" />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.string
};

Loader.defaultProps = {
  type: "Puff"
};

export default Loader;

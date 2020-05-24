import React from "react";
import PropTypes from "prop-types";
import LoaderComponent from "react-loader-spinner";
import styles from "./loader.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = ({ type }) => {
  return (
    <div className={styles.loader}>
      <LoaderComponent type={type} />
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

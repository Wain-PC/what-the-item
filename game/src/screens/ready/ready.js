import React from "react";
import PropTypes from "prop-types";
import styles from "./ready.module.css";
import WideButton from "../../components/wideButton/wideButton";

const Ready = ({ setScreenControls }) => {
  return (
    <div className={styles.root}>
      <div className={styles.shapes} />
      <div className={styles.header}>
        <div className={styles.headerInner} />
      </div>
      <div className={styles.button}>
        <WideButton text="start" onClick={setScreenControls} />
      </div>
    </div>
  );
};

Ready.propTypes = {
  setScreenControls: PropTypes.func.isRequired
};

export default Ready;

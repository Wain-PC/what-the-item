import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import topStyles from "../top/top.module.css";
import styles from "./ready.module.css";
import WideButton from "../../components/wideButton/wideButton";

const Ready = ({ setScreenControls }) => {
  return (
    <div className={styles.root}>
      <div className={cn(styles.header, topStyles.headerAnimation)} />
      <div className={cn(styles.okButton)}>
        <WideButton text="start" onClick={setScreenControls} />
      </div>
    </div>
  );
};

Ready.propTypes = {
  setScreenControls: PropTypes.func.isRequired
};

export default Ready;

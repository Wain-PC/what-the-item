import React from "react";
import PropTypes from "prop-types";
import styles from "./ready.module.css";
import WideButton from "../../components/wideButton/wideButton";
import Shapes from "../../components/shapes/shapes";
import Header from "../../components/header/header";
import Root from "../../components/root/root";

const Ready = ({ setScreenControls }) => {
  return (
    <Root>
      <Shapes />
      <Header text="ready" />
      <div className={styles.button}>
        <WideButton text="start" onClick={setScreenControls} />
      </div>
    </Root>
  );
};

Ready.propTypes = {
  setScreenControls: PropTypes.func.isRequired
};

export default Ready;

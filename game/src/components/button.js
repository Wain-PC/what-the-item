import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.css";

import button1 from "../images/buttons/1.png";
import button2 from "../images/buttons/2.png";
import button3 from "../images/buttons/3.png";
import button4 from "../images/buttons/4.png";

const buttons = [button1, button2, button3, button4];

const Button = ({ index, text }) => {
  return (
    <div className={styles.root}>
      <img src={buttons[index]} alt="button" className={styles.button} />
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
};

Button.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string
};

Button.defaultProps = {
  index: 0,
  text: ""
};

export default Button;

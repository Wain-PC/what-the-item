import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./button.module.css";

import button1 from "../../images/buttons/1.png";
import button2 from "../../images/buttons/2.png";
import button3 from "../../images/buttons/3.png";
import button4 from "../../images/buttons/4.png";
import right from "../../images/buttons/right.png";
import wrong from "../../images/buttons/wrong.png";

const buttons = [button1, button2, button3, button4];

const Button = ({ index, text, correct }) => {
  return (
    <div className={styles.root}>
      {correct === undefined ? (
        <img src={buttons[index]} alt="button" className={styles.button} />
      ) : null}
      {correct === true ? (
        <img src={right} alt="correct answer" className={styles.button} />
      ) : null}
      {correct === false ? (
        <img src={wrong} alt="incorrect answer" className={styles.button} />
      ) : null}
      {text && (
        <div
          className={cn(styles.text, {
            [styles.correct]: correct === true,
            [styles.incorrect]: correct === false
          })}
        >
          {text}
        </div>
      )}
    </div>
  );
};

Button.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string,
  correct: PropTypes.bool
};

Button.defaultProps = {
  index: 0,
  text: "",
  correct: undefined
};

export default Button;

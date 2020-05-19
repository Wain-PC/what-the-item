import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./button.module.css";

import button1 from "../../images/buttons/1.png";
import button2 from "../../images/buttons/2.png";
import button3 from "../../images/buttons/3.png";
import button4 from "../../images/buttons/4.png";
import right from "../../images/buttons/check.svg";
import wrong from "../../images/buttons/cross.svg";

const buttons = [button1, button2, button3, button4];

const Button = ({ index, text, correct, onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div className={styles.root} role="button" onClick={onClick}>
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
  correct: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  index: 0,
  text: "",
  correct: undefined,
  onClick: Function.prototype
};

export default Button;

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./button.module.css";

const Button = ({ index, text, correct, onClick }) => {
  let image;

  if (correct === true) {
    image = <div className={cn(styles.image, styles.button_correct)} />;
  } else if (correct === false) {
    image = <div className={cn(styles.image, styles.button_incorrect)} />;
  } else {
    image = <div className={cn(styles.image, styles[`button_${index + 1}`])} />;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div className={styles.root} role="button" onClick={onClick}>
      {image}
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

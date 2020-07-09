import React from "react";
import PropTypes from "prop-types";
import styles from "./controls.module.css";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";
import Shapes from "../../components/shapes/shapes";
import Root from "../../components/root/root";
import WideButton from "../../components/wideButton/wideButton";

const Controls = ({
  timer: { timer },
  loading: { loading },
  setScreenGame
}) => {
  let content;

  if (loading) {
    content = <Loader />;
  } else if (timer) {
    content = <div className={styles.timer}>{timer}</div>;
  } else {
    content = (
      <div className={styles.text}>
        Cannot load game =(
        <br />
        Please update the page to try again
      </div>
    );
  }

  return (
    <Root>
      <Shapes />
      <div className={styles.centered}>
        {content}
        <div className={styles.heading}>
          Choose a correct answer faster to receive more points!
          <br />
          Use buttons 1-4 on your keyboard or a mouse!
        </div>
        <div className={styles.buttons}>
          <Button index={0} />
          <Button index={1} />
          <Button index={2} />
          <Button index={3} />
        </div>
      </div>
      <div className={styles.button}>
        <WideButton text="start" onClick={setScreenGame} />
      </div>
    </Root>
  );
};

Controls.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired,
  loading: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  setScreenGame: PropTypes.func.isRequired
};

export default Controls;

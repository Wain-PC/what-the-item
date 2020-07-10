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
  translation: {
    data: { cantLoad, pleaseUpdatePage, chooseAnswer, buttons }
  },
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
        {cantLoad}
        <br />
        {pleaseUpdatePage}
      </div>
    );
  }

  return (
    <Root>
      <Shapes />
      <div className={styles.centered}>
        {content}
        <div className={styles.heading}>
          {chooseAnswer}
          <br />
          {buttons}
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
  translation: PropTypes.shape({
    data: PropTypes.shape({
      cantLoad: PropTypes.string.isRequired,
      pleaseUpdatePage: PropTypes.string.isRequired,
      chooseAnswer: PropTypes.string.isRequired,
      buttons: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setScreenGame: PropTypes.func.isRequired
};

export default Controls;

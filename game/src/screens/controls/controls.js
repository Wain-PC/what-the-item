import React from "react";
import PropTypes from "prop-types";
import styles from "./controls.module.css";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";
import Shapes from "../../components/shapes/shapes";
import Root from "../../components/root/root";

const Controls = ({ timer: { timer }, loading: { loading } }) => {
  let content;

  if (loading) {
    content = <Loader />;
  } else if (timer) {
    content = <div className={styles.timer}>{timer}</div>;
  } else {
    content = (
      <div className={styles.text}>
        Не получилось загрузить игру =(
        <br />
        Обновите страницу и попробуйте ещё раз
      </div>
    );
  }

  return (
    <Root>
      <Shapes />
      {content}
      <div className={styles.heading}>
        Выбирай правильный ответ быстрее, чтобы получить больше очков!
        <br />
        Используй клавиши 1-4 или курсор!
      </div>
      <div className={styles.buttons}>
        <Button index={0} />
        <Button index={1} />
        <Button index={2} />
        <Button index={3} />
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
  }).isRequired
};

export default Controls;

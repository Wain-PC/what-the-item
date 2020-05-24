import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import TopTable from "../../components/topTable/topTable";
import WideButton from "../../components/wideButton/wideButton";
import Loader from "../../components/loader/loader";
import styles from "./top.module.css";

const Top = props => {
  const {
    top: { players },
    config: {
      gameplay: { topPlayers }
    },
    loading: { loading },
    setScreenReady
  } = props;

  let content;

  if (loading) {
    content = <Loader />;
  } else if (topPlayers) {
    content = (
      <>
        <div className={styles.table}>
          <div className={styles.text}>TOP-{topPlayers}</div>
          <TopTable players={players} />
        </div>
        <div className={styles.button}>
          <WideButton text="start" onClick={setScreenReady} />
        </div>
      </>
    );
  } else {
    content = (
      <div className={cn(styles.text)}>
        Игра сейчас недоступна.
        <br />
        Пожалуйста, зайдите позднее.
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <a href="https://avito.tech" target="_blank" rel="noopener noreferrer">
          avito.tech
        </a>
      </div>
      <div className={cn(styles.header)}>
        <div className={styles.headerInner} />
      </div>
      {content}
    </div>
  );
};

Top.propTypes = {
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,

  config: PropTypes.shape({
    gameplay: PropTypes.shape({
      topPlayers: PropTypes.number
    }).isRequired
  }).isRequired,
  loading: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  setScreenReady: PropTypes.func.isRequired
};

export default Top;

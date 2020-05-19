import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import TopTable from "../../components/topTable/topTable";
import styles from "./top.module.css";

const Top = props => {
  const {
    top: { players },
    config: {
      gameplay: { topPlayers }
    },
    setScreenReady
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.shapes} />
      <div className={styles.title}>
        <a href="https://avito.tech" target="_blank" rel="noopener noreferrer">
          avito.tech
        </a>
      </div>
      <div className={cn(styles.header, styles.headerAnimation)} />
      <div className={styles.table}>
        <div className={styles.text}>TOP-{topPlayers}</div>
        <TopTable players={players} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.startButton}
        onClick={() => {
          setScreenReady();
        }}
      />
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
  setScreenReady: PropTypes.func.isRequired
};

export default Top;

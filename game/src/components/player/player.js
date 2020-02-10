import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./player.module.css";
import Avatar from "../avatar/avatar";

const Player = ({ ready, name, index, score }) => {
  return (
    <div className={styles.container}>
      <Avatar index={index} size="large" />
      <div className={styles.name}>{name}</div>
      {ready !== undefined ? (
        <div className={cn(styles.ready, { [styles.notReady]: !ready })}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {ready ? "READY" : "PRESS START"}
        </div>
      ) : null}
      {score !== undefined ? (
        <div className={styles.scoreContainer}>
          <div className={styles.score}>{score}</div>
          <div className={styles.scoreText}>Score</div>
        </div>
      ) : null}
    </div>
  );
};

Player.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ready: PropTypes.bool,
  score: PropTypes.number
};

Player.defaultProps = {
  ready: undefined,
  score: undefined
};

export default Player;

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./winner.module.css";
import Avatar from "../../components/avatar/avatar";

const Winner = props => {
  const {
    game: {
      player: { index, score }
    }
  } = props;

  return (
    <div className={styles.root}>
      <Avatar index={index} size="large" />
      <div className={cn(styles.header, styles.winner1)} />
      <div className={styles.scoreContainer}>
        <div className={styles.score}>{score}</div>
        <div className={styles.scoreText}>Final Score</div>
      </div>
    </div>
  );
};

Winner.propTypes = {
  game: PropTypes.shape({
    player: PropTypes.shape({
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      nickName: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default Winner;

import React from "react";
import PropTypes from "prop-types";
import styles from "./topTable.module.css";
import Avatar from "./avatar/avatar";

const TopTable = props => {
  const { players } = props;

  const tableRows = players.map(
    ({ name, score, currentGame = false }, index) => {
      return (
        <div key={name + score} className={styles.grid}>
          <div className={styles.icon}>
            <Avatar index={index} size="small" />
          </div>
          <div className={styles.name}>{name}</div>
          <div className={styles.spacer} />
          <div className={styles.score}>{score}</div>
        </div>
      );
    }
  );

  return <div className={styles.container}>{tableRows}</div>;
};

TopTable.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      currentGame: PropTypes.bool
    })
  ).isRequired
};

export default TopTable;

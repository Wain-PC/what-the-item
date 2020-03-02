import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./topTable.module.css";
import Avatar from "../avatar/avatar";

const TopTable = props => {
  const { id, players, avatarSize } = props;

  const tableRows = players.map(({ name, score, gameId }, index) => {
    const currentGame = id === gameId;
    return (
      <div
        key={gameId}
        className={cn(styles.grid, { [styles.selected]: currentGame })}
      >
        <div className={styles.icon}>
          <Avatar index={index} size={avatarSize} />
        </div>
        <div className={styles.name}>{currentGame ? "You" : name}</div>
        <div className={styles.spacer} />
        <div className={styles.score}>{score}</div>
      </div>
    );
  });

  return <div className={styles.container}>{tableRows}</div>;
};

TopTable.propTypes = {
  id: PropTypes.string,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      gameId: PropTypes.string
    })
  ).isRequired,
  avatarSize: PropTypes.oneOf(["small", "medium", "large"])
};

TopTable.defaultProps = {
  id: "",
  avatarSize: "small"
};

export default TopTable;

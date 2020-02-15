import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./topTable.module.css";
import Avatar from "./avatar/avatar";

const TopTable = props => {
  const { players, avatarSize } = props;

  const tableRows = players.map(
    ({ name, score, currentGame = false }, index) => {
      return (
        <div
          key={name + score}
          className={cn(styles.grid, { [styles.selected]: index === 2 })}
        >
          <div className={styles.icon}>
            <Avatar index={index} size={avatarSize} />
          </div>
          <div className={styles.name}>{currentGame ? "You" : name}</div>
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
  ).isRequired,
  avatarSize: PropTypes.oneOf(["small", "medium", "large"])
};

TopTable.defaultProps = {
  avatarSize: "small"
};

export default TopTable;

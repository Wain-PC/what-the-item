import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import topStyles from "../top/top.module.css";
import styles from "./ready.module.css";

const Player = ({ player: { ready, name, index } }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`../../images/Avatar/0${index + 1}.png`}
        alt="avatar"
      />
      <div className={styles.name}>{name}</div>
      <div className={styles.ready}>{ready ? "READY" : "PRESS START"}</div>
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired
  }).isRequired
};

const Ready = props => {
  const {
    players: { list }
  } = props;

  return (
    <div className={styles.root}>
      <div className={cn(styles.header, topStyles.headerAnimation)} />
      <div className={styles.players}>
        {list[0] && <Player player={list[0]} />}
        {list[1] && <Player player={list[1]} />}
      </div>
    </div>
  );
};

Ready.propTypes = {
  players: PropTypes.shape({
    list: PropTypes.arrayOf(Player.propTypes.player).isRequired
  }).isRequired
};

export default Ready;

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import topStyles from "../top/top.module.css";
import styles from "./ready.module.css";
import Avatar from "../../components/avatar";

const Player = ({ player: { ready, name, index } }) => {
  return (
    <div className={styles.container}>
      <Avatar index={index} />
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

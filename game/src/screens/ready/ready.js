import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import topStyles from "../top/top.module.css";
import styles from "./ready.module.css";
import Player from "../../components/player/player";

const Ready = props => {
  const {
    players: { list }
  } = props;

  return (
    <div className={styles.root}>
      <div className={cn(styles.header, topStyles.headerAnimation)} />
      <div className={styles.players}>
        {list[0] && (
          <Player
            index={list[0].index}
            name={list[0].name}
            ready={list[0].ready}
          />
        )}
        {list[1] && (
          <Player
            index={list[1].index}
            name={list[1].name}
            ready={list[1].ready}
          />
        )}
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

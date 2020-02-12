import React from "react";
import PropTypes from "prop-types";
import TopTable from "../../components/topTable";
import NickName from "../../components/nickName";

import styles from "./gameEnd.module.css";

const GameEnd = props => {
  const {
    winner: { activeLetter, nickName },
    top: { players }
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.text}>Top-5</div>
      <TopTable players={players} avatarSize="medium" />
      <div className={styles.nickNameHeader}>Enter Your Nickname:</div>
      <NickName activeLetter={activeLetter} nickName={nickName} />
      <div className={styles.controlsHeader}>Press Start to Finish</div>
    </div>
  );
};

GameEnd.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    activeLetter: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired
  }).isRequired,
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default GameEnd;

import React from "react";
import PropTypes from "prop-types";
import NickName from "../../components/nickName/nickName";

import styles from "./gameEnd.module.css";

const GameEnd = props => {
  const {
    game: {
      player: { name, contact, nameFilled }
    },
    config: {
      gameplay: { winnerNickNameMaxLetters, contactMaxLetters }
    }
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.nickNameHeader}>Enter Your Nickname:</div>
      <div className={styles.nickName}>
        <NickName
          value={name}
          length={winnerNickNameMaxLetters}
          active={!nameFilled}
        />
      </div>
      <div className={styles.nickNameHeader}>Enter Your Email or Telegram:</div>
      <div className={styles.nickName}>
        <NickName
          value={contact}
          length={contactMaxLetters}
          active={nameFilled}
        />
      </div>

      <div className={styles.controlsHeader}>Press Start to Finish</div>
    </div>
  );
};

GameEnd.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
      nameFilled: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired,
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  config: PropTypes.shape({
    gameplay: PropTypes.arrayOf(
      PropTypes.shape({
        winnerNickNameMaxLetters: PropTypes.number.isRequired,
        contactMaxLetters: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default GameEnd;

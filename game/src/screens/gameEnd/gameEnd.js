import React from "react";
import PropTypes from "prop-types";
import NickName from "../../components/nickName/nickName";

import styles from "./gameEnd.module.css";
import WideButton from "../../components/wideButton/wideButton";

const GameEnd = props => {
  const {
    game: {
      player: { name, contact, place }
    },
    config: {
      gameplay: { topPlayers }
    },
    changeName,
    changeContact,
    saveName
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <div className={styles.header}>
          Ты занял {place} место в топ-{topPlayers}!
        </div>
        <div className={styles.nickNameHeader}>Введи имя</div>
        <NickName value={name} onChange={changeName} />
        <div className={styles.nickNameHeader}>Твоя почта или Telegram</div>
        <NickName value={contact} onChange={changeContact} />
        <div className={styles.button}>
          <WideButton onClick={saveName} text="ok" />
        </div>
      </div>
    </div>
  );
};

GameEnd.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
      place: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  config: PropTypes.shape({
    gameplay: PropTypes.arrayOf(
      PropTypes.shape({
        topPlayers: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  saveName: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeContact: PropTypes.func.isRequired
};

export default GameEnd;

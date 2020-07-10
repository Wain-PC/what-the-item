import React from "react";
import PropTypes from "prop-types";
import NickName from "../../components/nickName/nickName";

import styles from "./gameEnd.module.css";
import WideButton from "../../components/wideButton/wideButton";
import Loader from "../../components/loader/loader";
import Root from "../../components/root/root";
import Shapes from "../../components/shapes/shapes";

import { replace } from "../../utils/translation";

const GameEnd = props => {
  const {
    game: {
      player: { name, contact, place }
    },
    config: {
      gameplay: { topPlayers }
    },
    loading: { loading },
    translation: { data: { youScored, bestAttempt, name: trName, contact: trContact }},
    changeName,
    changeContact,
    saveName
  } = props;

  let content;

  if (loading) {
    content = <Loader />;
  } else {
    content = <WideButton onClick={saveName} text="ok" />;
  }

  return (
    <Root>
      <Shapes />
      <div className={styles.column}>
        <div className={styles.inputs}>
          <div className={styles.header}>
            {replace(youScored, { topPlayers, place })}
          </div>
          <div className={styles.nickNameHeader}>{trName}</div>
          <NickName value={name} onChange={changeName} disabled={loading} />
          <div className={styles.nickNameHeader}>{trContact}</div>
          <NickName
            value={contact}
            onChange={changeContact}
            disabled={loading}
          />
          <div className={styles.text}>{bestAttempt}</div>
        </div>
      </div>
      <div className={styles.button}>{content}</div>
    </Root>
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
    gameplay: PropTypes.shape({
      topPlayers: PropTypes.number.isRequired
    })
  }).isRequired,
  loading: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  translation: PropTypes.shape({
    youScored: PropTypes.string.isRequired,
    bestAttempt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired
  }).isRequired,
  saveName: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeContact: PropTypes.func.isRequired
};

export default GameEnd;

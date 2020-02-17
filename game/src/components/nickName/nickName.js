/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./nickName.module.css";

const NickName = ({ nickName, activeLetter }) => {
  const word = nickName.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className={cn({ [styles.blink]: index === activeLetter })}
      >
        {letter}
      </span>
    );
  });

  return <div>{word}</div>;
};

NickName.propTypes = {
  nickName: PropTypes.string.isRequired,
  activeLetter: PropTypes.number.isRequired
};

export default NickName;

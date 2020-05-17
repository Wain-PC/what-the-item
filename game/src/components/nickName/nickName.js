/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./nickName.module.css";

const NickName = ({ value, length, active }) => {
  const word = value.padEnd(length, "_");

  const input = word.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className={cn({ [styles.blink]: active && index === value.length })}
      >
        {letter}
      </span>
    );
  });

  return <div>{input}</div>;
};

NickName.propTypes = {
  value: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired
};

export default NickName;

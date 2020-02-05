/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";

const NickName = ({ nickName, activeLetter }) => {
  const word = nickName.split("").map((letter, index) => {
    if (index === activeLetter) {
      return (
        <span key={index} style={{ textDecoration: "underline" }}>
          <strong>{letter}</strong>
        </span>
      );
    }
    return <span key={index}>{letter}</span>;
  });

  return <div>{word}</div>;
};

NickName.propTypes = {
  nickName: PropTypes.string.isRequired,
  activeLetter: PropTypes.number.isRequired
};

export default NickName;

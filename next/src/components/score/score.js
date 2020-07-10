import React from "react";
import PropTypes from "prop-types";
import styles from "./score.module.css";

const Score = ({ text, count, countAdd }) => {
  return (
    <div className={styles.root}>
      <div className={styles.lines}>
        <div className={styles.text}>{text}</div>
        <div className={styles.count}>{count}</div>
      </div>

      {countAdd ? <div className={styles.countAdd}>+{countAdd}</div> : null}
    </div>
  );
};

Score.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  countAdd: PropTypes.number
};

Score.defaultProps = {
  countAdd: 0
};

export default Score;

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import TopTable from "../../components/topTable";
import styles from "./top.module.css";

const Top = props => {
  const {
    top: { players }
  } = props;

  return (
    <>
      <div className={styles.shapes} />
      <div className={styles.title}>
        <a href="https://avito.tech" target="_blank" rel="noopener noreferrer">
          avito.tech
        </a>
      </div>
      <div className={cn(styles.header, styles.headerAnimation)} />
      <div className={styles.table}>
        <div className={styles.text}>TOP-5</div>
        <TopTable players={players} />
      </div>
      <div className={cn(styles.text, styles.footer)}>
        - PRESS START TO CONTINUE -
      </div>
    </>
  );
};

Top.propTypes = {
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Top;

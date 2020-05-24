import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./header.module.css";

const Header = ({ text }) => {
  return (
    <div className={styles.header}>
      <div className={cn(styles.headerInner, styles[text])} />
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string
};

Header.defaultProps = {
  text: "what-the-item"
};

export default Header;

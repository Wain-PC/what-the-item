import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./thumb.module.css";

const Thumb = ({ down }) => {
  return (
    <div
      className={cn(styles.root, { [styles.up]: !down, [styles.down]: down })}
    />
  );
};

Thumb.propTypes = {
  down: PropTypes.bool
};

Thumb.defaultProps = {
  down: false
};

export default Thumb;

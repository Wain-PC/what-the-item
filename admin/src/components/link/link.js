import React from "react";
import PropTypes from "prop-types";
import { Link as DOMLink } from "react-router-dom";
import { Label } from "semantic-ui-react";
import styles from "./link.module.css";

const Link = ({ id }) => {
  return (
    <DOMLink to={`/game/${id}`}>
      <span className={styles.link}>
        <Label>{id.slice(-5)}</Label>
      </span>
    </DOMLink>
  );
};

Link.propTypes = {
  id: PropTypes.string.isRequired
};

export default Link;

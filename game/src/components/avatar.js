import React from "react";
import PropTypes from "prop-types";
import styles from "./avatar.module.css";

import avatar1 from "../images/avatar/01.png";
import avatar2 from "../images/avatar/02.png";
import avatar3 from "../images/avatar/03.png";
import avatar4 from "../images/avatar/04.png";
import avatar5 from "../images/avatar/05.png";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

const Avatar = ({ index }) => {
  return <img src={avatars[index]} alt="avatar" className={styles.avatar} />;
};

Avatar.propTypes = {
  index: PropTypes.number
};

Avatar.defaultProps = {
  index: 0
};

export default Avatar;

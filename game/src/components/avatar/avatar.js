import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./avatar.module.css";

import avatar1 from "../../images/avatar/01.svg";
import avatar2 from "../../images/avatar/02.svg";
import avatar3 from "../../images/avatar/03.svg";
import avatar4 from "../../images/avatar/04.svg";
import avatar5 from "../../images/avatar/05.svg";
import avatar6 from "../../images/avatar/06.svg";
import avatar7 from "../../images/avatar/07.svg";
import avatar8 from "../../images/avatar/08.svg";
import avatar9 from "../../images/avatar/09.svg";
import avatar10 from "../../images/avatar/10.svg";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10
];

const Avatar = ({ index, size }) => {
  return (
    <img
      src={avatars[index]}
      alt="avatar"
      className={cn(styles.avatar, styles[size])}
    />
  );
};

Avatar.propTypes = {
  index: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"])
};

Avatar.defaultProps = {
  index: 0,
  size: "medium"
};

export default Avatar;

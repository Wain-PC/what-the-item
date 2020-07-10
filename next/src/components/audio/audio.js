import React from "react";
import PropTypes from "prop-types";

const Audio = ({ src }) => {
  if (src) {
    // eslint-disable-next-line jsx-a11y/media-has-caption
    return <audio src={`/sounds/${src}.mp3`} autoPlay />;
  }

  return null;
};

Audio.propTypes = {
  src: PropTypes.string
};

Audio.defaultProps = {
  src: ""
};

export default Audio;

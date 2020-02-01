import React from "react";
import PropTypes from "prop-types";

const Controls = props => {
  const {
    timer: { timer }
  } = props;

  return (
    <>
      <div>Картинка с контроллером и управлением здесь</div>
      <div>Mеханика игры объясняется здесь</div>
      <div>
        Игра начинается через:
        <strong>{timer}</strong>
      </div>
    </>
  );
};

Controls.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired
};

export default Controls;

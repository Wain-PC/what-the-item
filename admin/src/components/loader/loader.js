import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Loader as LoaderComponent, Dimmer } from "semantic-ui-react";

const Loader = ({ active }) => {
  return (
    <Dimmer active={active}>
      <LoaderComponent size="big">Загрузка...</LoaderComponent>
    </Dimmer>
  );
};

Loader.propTypes = {
  active: PropTypes.bool
};

Loader.defaultProps = {
  active: false
};

const mapStateToProps = state => ({
  active: state.global.loading
});

const ConnectedLoader = connect(mapStateToProps)(Loader);

export default Loader;
export { ConnectedLoader };

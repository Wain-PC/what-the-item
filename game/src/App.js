import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "./actions/index";
import * as controllers from "./controllers";
import KeyboardController from "./keyboardController";
import * as screens from "./screens";
import styles from "./App.module.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    // Start keyboard listener
    this.keyboardController = new KeyboardController();
    this.keyboardController.onPress(this.onButtonPress.bind(this));
  }

  onButtonPress(button) {
    const state = this.props;
    const {
      screen: { id }
    } = state;

    if (controllers[id]) {
      controllers[id]({
        state,
        actions: state,
        message: {
          type: "button",
          ...button
        }
      });
    }
  }

  renderScreen() {
    const {
      screen: { id },
      ...restProps
    } = this.props;

    const Screen = screens[id];

    if (Screen) {
      return <Screen {...restProps} />;
    }

    return <div>Unknown screen id: {id}</div>;
  }

  render() {
    return <div className={styles.app}>{this.renderScreen()}</div>;
  }
}

App.propTypes = {
  screen: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  setScreenTop: PropTypes.func.isRequired,
  getConfig: PropTypes.func.isRequired
};

const mapStateToProps = state => state;
const mapDispatchToProps = actions;
export default connect(mapStateToProps, mapDispatchToProps)(App);

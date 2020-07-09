import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "./actions/index";
import * as controllers from "./controllers";
import KeyboardController from "./keyboardController";
import * as screens from "./screens";
import config from "./utils/config";
import styles from "./App.module.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    // Start keyboard listener
    this.keyboardController = new KeyboardController();
    this.keyboardController.onPress(this.onButtonPress.bind(this));

    this.state = {
      language: config.language,
      translation: {}
    };
  }

  async componentDidMount() {
    // Acquire top players
    const { setScreenTop } = this.props;
    await setScreenTop();
    await this.loadTranslation();
  }

  async loadTranslation() {
    const { language } = this.state;

    try {
      const translation = await import(`./languages/${language}.json`);
      this.setState({
        translation
      });
    } catch (e) {
      console.error(e);
    }
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

    const {translation} = this.state;

    const Screen = screens[id];

    if (Screen) {
      return <Screen {...restProps} translation={translation} />;
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

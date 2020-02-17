import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "./actions";
import * as screens from "./screens";
import styles from "./App.module.css";

class App extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    setScreenDashboard: PropTypes.func.isRequired,
    screen: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  };

  componentDidMount() {
    // Acquire top players
    const { setScreenDashboard } = this.props;
    setScreenDashboard();
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

const mapStateToProps = state => state;
const mapDispatchToProps = actions;
export default connect(mapStateToProps, mapDispatchToProps)(App);

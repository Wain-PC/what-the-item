import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Menu, Sidebar, Icon } from "semantic-ui-react";
import * as actions from "./actions";
import * as screens from "./screens";
import styles from "./App.module.css";
import "semantic-ui-css/semantic.min.css";
import AdminMenu from "./components/menu/menu";

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
    const {
      screen: { id },
      ...restProps
    } = this.props;

    return (
      <Grid padded columns={2}>
        <Grid.Column width={4}>
          <AdminMenu actions={restProps} screenId={id} />
        </Grid.Column>
        <Grid.Column width={12}>{this.renderScreen()}</Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = actions;
export default connect(mapStateToProps, mapDispatchToProps)(App);

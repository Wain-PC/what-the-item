import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box, Grid, Grommet, Header, Heading, Image } from "grommet";
import { grommet } from "grommet/themes";
import * as actions from "./actions";
import * as controllers from "./controllers";
import GamepadController from "./gamepadController";
import KeyboardController from "./keyboardController";
import Player from "./components/player";
import * as screens from "./screens";
import logo from "./avito.svg";
import Controls from "./components/controls";
import Timer from "./components/timer";

class App extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    screen: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    game: PropTypes.shape({
      round: PropTypes.number.isRequired
    }).isRequired,
    players: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
    }).isRequired,
    timer: PropTypes.shape({
      timer: PropTypes.number.isRequired
    }).isRequired,
    setScreenTop: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // Start gamepads listener
    this.gamepadController = new GamepadController();
    this.gamepadController.onPress(this.onButtonPress);

    // Start keyboard listener
    this.keyboardController = new KeyboardController();
    this.keyboardController.onPress(this.onButtonPress);
  }

  componentDidMount() {
    // Acquire top players
    const { setScreenTop } = this.props;
    setScreenTop();
  }

  onButtonPress = button => {
    // Send every button press to backend.
    // It should process the input and return the updated state.
    console.log(button);
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
  };

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
    // eslint-disable-next-line react/destructuring-assignment
    const {
      game: { round },
      players: { list },
      screen: { id },
      timer: { timer }
    } = this.props;

    return (
      <Grommet theme={grommet} style={{ height: "100%" }}>
        <Box align="center" alignSelf="stretch" fill>
          <Grid
            fill
            align="stretch"
            alignSelf="stretch"
            columns={["medium", "auto", "medium"]}
            rows={["xxsmall", "xxsmall", "flex", "small"]}
            gap="none"
            areas={[
              ["header_left", "header_center", "header_right"],
              [".", ".", "."],
              ["left", "main", "right"],
              ["left", "footer", "right"]
            ]}
          >
            <Box gridArea="header_left" background="light-3">
              <Header
                pad={{ horizontal: "medium", vertical: "xsmall" }}
                gap="small"
                align="start"
                justify="start"
              >
                <Image src={logo} opacity="strong" style={{ height: 36 }} />
                <Heading size="small" level={3} margin="xsmall">
                  What the Item?!
                </Heading>
              </Header>
            </Box>
            <Box gridArea="header_center" align="center" background="light-3">
              <Timer timer={timer} />
            </Box>
            <Box gridArea="header_right" background="light-3" />
            <Box
              gridArea="left"
              background="light-1"
              margin={{ horizontal: "medium" }}
            >
              <Player player={list[0] || {}} gameStarted={round > 0} />
            </Box>
            <Box gridArea="main">{this.renderScreen()}</Box>
            <Box
              gridArea="right"
              background="light-1"
              margin={{ horizontal: "medium" }}
            >
              <Player player={list[1] || {}} />
            </Box>
            <Box
              align="center"
              gridArea="footer"
              background="light-3"
              margin={{ horizontal: "medium" }}
            >
              <Controls screen={id} />
            </Box>
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = actions;
export default connect(mapStateToProps, mapDispatchToProps)(App);

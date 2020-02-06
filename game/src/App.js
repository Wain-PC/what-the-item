import React, { PureComponent } from "react";
import { Grommet, Box, Main, Header, Heading, Image, Grid } from "grommet";
import { grommet } from "grommet/themes";
import Socket from "./socket";
import GamepadController from "./gamepadController";
import KeyboardController from "./keyboardController";
import Player from "./components/player";
import * as screens from "./screens";
import logo from "./avito.svg";
import Controls from "./components/controls";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      screen: {
        id: null
      }
    };

    // Start Websocket connection
    this.socket = new Socket();
    this.socket.onMessage(this.onMessage);

    // Start gamepads listener
    this.gamepadController = new GamepadController();
    this.gamepadController.onPress(this.onButtonPress);

    // Start keyboard listener
    this.keyboardController = new KeyboardController();
    this.keyboardController.onPress(this.onButtonPress);
  }

  onMessage = message => {
    console.log("received message", message);
    this.setState(message);
  };

  onButtonPress = button => {
    // Send every button press to backend.
    // It should process the input and return the updated state.
    this.socket.send({ type: "button", ...button });
  };

  renderScreen() {
    const {
      screen: { id },
      ...restProps
    } = this.state;

    const Screen = screens[id];

    if (Screen) {
      return <Screen {...restProps} />;
    }

    return <div>Unknown screen id: {id}</div>;
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const {
      players: { list = [] } = {},
      screen: { id }
    } = this.state;

    return (
      <Grommet theme={grommet} style={{ height: "100%" }}>
        <Box align="center" alignSelf="stretch" fill>
          <Grid
            fill
            align="stretch"
            alignSelf="stretch"
            columns={["medium", "auto", "medium"]}
            rows={["xxsmall", "flex", "small"]}
            gap="small"
            areas={[
              ["header", "header", "header"],
              ["left", "main", "right"],
              ["left", "footer", "right"]
            ]}
          >
            <Box gridArea="header" background="light-3">
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
            <Box
              gridArea="left"
              background="light-1"
              margin={{ horizontal: "medium" }}
            >
              <Player player={list[0] || {}} />
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

import React, { PureComponent } from "react";
import Socket from "./socket";
import GamepadController from "./gamepadController";
import * as screens from "./screens";
import "./App.css";

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
    // this.gamepadController.onRelease(this.onButtonRelease);
  }

  onMessage = message => {
    console.log(
      "received message",
      message.winner.nickName,
      message.winner.activeLetter
    );
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
    return (
      <div className="App">
        <header className="App-header">{this.renderScreen()}</header>
      </div>
    );
  }
}

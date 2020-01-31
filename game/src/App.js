import React, {PureComponent} from 'react';
import Socket from './socket';
import GamepadController from './gamepadController';
import './App.css';

import TopScreen from './screens/top';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };

    // Start Websocket connection
    this.socket = new Socket();
    this.socket.onMessage(this.onMessage);

    // Start gamepads listener
    this.gamepadController = new GamepadController();
    this.gamepadController.onPress(this.onButtonPress);
    this.gamepadController.onRelease(this.onButtonRelease);
  }

  onMessage = (message) => {
    this.setState({
      ...this.state,
      ...message
    })
  };

  onButtonPress = (button) => {
    // Send every button press to backend.
    // It should process the input and return the updated state.
    this.socket.send(button);
  };

  onButtonRelease = (button) => {
    // Do something on button release
  };

  render() {
    return (
        <div className="App">
          <header className="App-header">
            {this.renderScreen()}
          </header>
        </div>
    );
  }

  renderScreen() {
    const {screen, ...restProps} = this.state;

    switch(screen) {
      case "top": {
        return <TopScreen {...restProps}/>
      }
      default: {
        return null;
      }
    }
  }
}

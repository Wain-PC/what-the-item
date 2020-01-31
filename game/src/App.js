import React, {PureComponent} from 'react';
import Socket from './socket';
import './App.css';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };

    // Start Websocket connection
    this.socket = new Socket();
    this.socket.onMessage(this.onMessage);
  }

  onMessage = (message) => {
    this.setState({
      ...this.state,
      ...message
    })
  };

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p>
              {JSON.stringify(this.state)}
            </p>
          </header>
        </div>
    );
  }
}

export default class Socket {
  constructor() {
    this.socket = null;
    this.address =
      window.location.hostname === "localhost"
        ? "ws://localhost:3333/ws"
        : `wss://${window.location.host}/ws`;
    this.connect();
  }

  connect(reconnect = false) {
    this.socket = new WebSocket(this.address);
    this.socket.onopen = this._onOpen;
    this.socket.onclose = this._onClose;
    this.socket.onerror = this._onError;
    this.socket.onmessage = this._onMessage;
    this.listener = reconnect ? this.listener : () => {};
  }

  send(message) {
    if (!message) {
      return;
    }

    if (typeof message === "object") {
      this.socket.send(JSON.stringify(message));
    } else if (typeof message === "string") {
      this.socket.send(message);
    }
  }

  onMessage(listener) {
    this.listener = listener;
  }

  _onOpen = () => {
    // Socket connected
    console.log("[open] Соединение установлено");
  };

  _onClose = event => {
    if (event.wasClean) {
      console.log(
        `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
      );
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log("[close] Соединение прервано, пробуем реконнект.");
      this.connect(true);
    }
  };

  _onError = error => {
    // Log error
    console.log(`[error] ${error.message}`);
  };

  _onMessage = event => {
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(event.data);
    } catch (err) {
      console.error("[error] Не удалось распарсить входящее сообщение:", event);
    }

    if (parsedMessage) {
      this.listener(parsedMessage);
    }
  };
}

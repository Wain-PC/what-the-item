let socket = null;

const requests = new Map();
let requestId = 0;

const connect = () => {
  return new Promise(resolve => {
    const protocol =
      window.location.protocol.indexOf("https") === 0 ? "wss" : "ws";
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onopen = () => {
      resolve();
    };

    socket.onclose = () => {
      setTimeout(() => {
        console.log("Реконнект соединения...");
        connect();
      }, 1000);
    };

    socket.onmessage = event => {
      const { id, payload, error } = JSON.parse(event.data);
      if (requests.has(id)) {
        if (error) {
          requests.get(id).reject(payload);
        } else {
          requests.get(id).resolve(payload);
        }
        requests.delete(id);
      }
    };

    socket.onerror = error => {
      console.log(`Ошибка сокета ${error.message}`);
    };
  });
};

const send = async (path = "", data = {}) => {
  if (!socket) {
    await connect();
  }

  return new Promise((resolve, reject) => {
    requestId += 1;
    const request = {
      id: requestId,
      path,
      data,
      resolve,
      reject
    };

    requests.set(requestId, request);

    const payload = {
      id: requestId,
      path,
      data
    };

    socket.send(JSON.stringify(payload));
  });
};

export { connect, send };

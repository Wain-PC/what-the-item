let socket = null;

const requests = new Map();
let requestId = 0;

const connect = () => {
  return new Promise(resolve => {
    socket = new WebSocket(`ws://${window.location.hostname}:3333/ws`);

    socket.onopen = () => {
      console.log("Соединение установлено.");
      resolve();
    };

    socket.onclose = event => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения"); // например, "убит" процесс сервера
      }
      console.log(`Код: ${event.code} причина: ${event.reason}`);
      setTimeout(() => {
        console.log("Реконнект соединения...");
        connect();
      }, 1000);
    };

    socket.onmessage = event => {
      const { id, payload, error } = JSON.parse(event.data);
      if (requests.has(id)) {
        if (error) {
          requests.get(id).reject(new Error(error));
        } else {
          requests.get(id).resolve(payload);
        }
        requests.delete(id);
      }
    };

    socket.onerror = error => {
      console.log(`Ошибка ${error.message}`);
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

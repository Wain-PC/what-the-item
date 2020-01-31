const WebSocket = require('ws');

module.exports = () => {
    const wss = new WebSocket.Server({ port: '3334' });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.send('hello!');
    });
};

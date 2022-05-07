import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    const dataObject = JSON.parse(data)
    if (dataObject.type === 'chat') {
      chat(dataObject);
    } else
  });

  ws.send('something');
});

export default wss;
function chat(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log('chat data', data);
      client.send(data);
    }
  })
}
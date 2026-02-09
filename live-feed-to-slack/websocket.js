const WebSocket = require('ws');
const config = require('./config');

/**
 * Connect to the BuiltWith Live Feed WebSocket and return the connection.
 * Handles automatic reconnection on close/error.
 */
function connect(onMessage) {
  console.log(`Connecting to BuiltWith Live Feed...`);

  const ws = new WebSocket(config.websocketUrl);

  ws.on('open', () => {
    console.log('Connected to BuiltWith Live Feed.');

    // Subscribe to each configured channel
    for (const channel of config.channels) {
      const msg = JSON.stringify({ action: 'subscribe', channel });
      ws.send(msg);
      console.log(`Subscribed to channel: ${channel}`);
    }
  });

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      onMessage(data);
    } catch (err) {
      console.error('Failed to parse message:', raw.toString());
    }
  });

  ws.on('close', (code, reason) => {
    console.log(`WebSocket closed (code=${code}). Reconnecting in ${config.reconnectDelay / 1000}s...`);
    setTimeout(() => connect(onMessage), config.reconnectDelay);
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err.message);
    // The 'close' event will fire after this, triggering reconnection.
  });

  return ws;
}

module.exports = { connect };

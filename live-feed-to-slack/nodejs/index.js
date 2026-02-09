const config = require('./config');
const { connect } = require('./websocket');
const { postToSlack, formatDomainMessage } = require('./slack');

console.log('BuiltWith Live Feed -> Slack');
console.log(`Channels: ${config.channels.join(', ')}`);
console.log('---');

connect((data) => {
  // Skip subscription confirmations and other control messages
  if (data.action || data.status) {
    console.log('Control message:', JSON.stringify(data));
    return;
  }

  const domain = data.D || data.domain || null;
  if (!domain) {
    console.log('Non-domain message:', JSON.stringify(data));
    return;
  }

  console.log(`Domain: ${domain}`);

  const payload = formatDomainMessage(data);

  postToSlack(payload).catch((err) => {
    console.error(`Failed to post ${domain} to Slack:`, err.message);
  });
});

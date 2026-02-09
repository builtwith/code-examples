require('dotenv').config({ path: '../.env' });

const apiKey = process.env.BUILTWITH_API_KEY;
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const channels = (process.env.BUILTWITH_CHANNELS || 'new')
  .split(',')
  .map((ch) => ch.trim())
  .filter(Boolean);

if (!apiKey || apiKey === 'your-api-key-here') {
  console.error('Error: Set a valid BUILTWITH_API_KEY in your .env file.');
  console.error('Get your API key at https://api.builtwith.com');
  process.exit(1);
}

if (!slackWebhookUrl || slackWebhookUrl === 'your-slack-webhook-url-here') {
  console.error('Error: Set a valid SLACK_WEBHOOK_URL in your .env file.');
  console.error('Create a webhook at https://api.slack.com/messaging/webhooks');
  process.exit(1);
}

module.exports = {
  apiKey,
  slackWebhookUrl,
  channels,
  websocketUrl: `wss://sync.builtwith.com/wss/new?KEY=${apiKey}`,
  reconnectDelay: 5000,
};

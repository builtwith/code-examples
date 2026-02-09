const https = require('https');
const { URL } = require('url');
const config = require('./config');

/**
 * Post a message to Slack via an Incoming Webhook.
 * Uses only built-in Node.js modules (no axios/node-fetch needed).
 */
function postToSlack(payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const parsed = new URL(config.slackWebhookUrl);

    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Slack responded with ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/**
 * Format a BuiltWith Live Feed domain message into a Slack Block Kit payload.
 */
function formatDomainMessage(data) {
  const domain = data.D || data.domain || 'unknown';
  const channel = data.C || data.channel || '';
  const techs = data.T || data.technologies || [];

  const techList =
    techs.length > 0
      ? techs.map((t) => `  - ${t}`).join('\n')
      : '  (none listed)';

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*New Domain Detected* — <https://${domain}|${domain}>`,
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Channel:*\n${channel}` },
          { type: 'mrkdwn', text: `*Technologies:*\n${techList}` },
        ],
      },
      { type: 'divider' },
    ],
  };
}

module.exports = { postToSlack, formatDomainMessage };

require('dotenv').config({ path: '../.env' });

function toBool(value, defaultValue = false) {
  if (value == null) return defaultValue;
  const normalized = String(value).trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'y' || normalized === 'yes';
}

const apiKey = process.env.BUILTWITH_API_KEY;
const channels = (process.env.BUILTWITH_CHANNELS || 'new')
  .split(',')
  .map((ch) => ch.trim())
  .filter(Boolean);

const sfLoginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
const sfApiVersion = process.env.SF_API_VERSION || 'v61.0';
const sfClientId = process.env.SF_CLIENT_ID;
const sfClientSecret = process.env.SF_CLIENT_SECRET;
const sfUsername = process.env.SF_USERNAME;
const sfPassword = process.env.SF_PASSWORD;
const sfSecurityToken = process.env.SF_SECURITY_TOKEN || '';
const sfUpsertByWebsite = toBool(process.env.SF_UPSERT_BY_WEBSITE, true);
const sfLeadSource = process.env.SF_LEAD_SOURCE || 'BuiltWith Live Feed';

if (!apiKey || apiKey === 'your-api-key-here') {
  console.error('Error: Set a valid BUILTWITH_API_KEY in your .env file.');
  console.error('Get your API key at https://api.builtwith.com');
  process.exit(1);
}

if (!sfClientId || !sfClientSecret || !sfUsername || !sfPassword) {
  console.error('Error: Set SF_CLIENT_ID, SF_CLIENT_SECRET, SF_USERNAME, and SF_PASSWORD in your .env file.');
  process.exit(1);
}

module.exports = {
  apiKey,
  channels,
  websocketUrl: `wss://sync.builtwith.com/wss/new?KEY=${apiKey}`,
  reconnectDelay: 5000,
  domainApiOptions: {
    liveOnly: toBool(process.env.DOMAIN_API_LIVEONLY, true),
    noPii: toBool(process.env.DOMAIN_API_NOPII, false),
    noMeta: toBool(process.env.DOMAIN_API_NOMETA, false),
    noAttr: toBool(process.env.DOMAIN_API_NOATTR, true),
  },
  salesforce: {
    loginUrl: sfLoginUrl.replace(/\/$/, ''),
    apiVersion: sfApiVersion,
    clientId: sfClientId,
    clientSecret: sfClientSecret,
    username: sfUsername,
    password: sfPassword,
    securityToken: sfSecurityToken,
    upsertByWebsite: sfUpsertByWebsite,
    leadSource: sfLeadSource,
  },
};

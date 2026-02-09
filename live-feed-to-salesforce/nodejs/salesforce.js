const config = require('./config');
const { requestJson } = require('./http');

let cachedToken = null;
let cachedInstanceUrl = null;
let tokenExpiryTime = 0;

function toIsoTimestamp(secondsFromNow) {
  return Date.now() + Math.max(0, secondsFromNow - 60) * 1000;
}

async function authenticate() {
  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: config.salesforce.clientId,
    client_secret: config.salesforce.clientSecret,
    username: config.salesforce.username,
    password: `${config.salesforce.password}${config.salesforce.securityToken}`,
  }).toString();

  const { data } = await requestJson(
    'POST',
    `${config.salesforce.loginUrl}/services/oauth2/token`,
    body,
    { 'Content-Type': 'application/x-www-form-urlencoded' }
  );

  if (!data || !data.access_token || !data.instance_url) {
    throw new Error(`Salesforce auth response missing fields: ${JSON.stringify(data)}`);
  }

  cachedToken = data.access_token;
  cachedInstanceUrl = data.instance_url;
  tokenExpiryTime = toIsoTimestamp(data.expires_in || 7200);
}

async function getAuth() {
  if (cachedToken && cachedInstanceUrl && Date.now() < tokenExpiryTime) {
    return { token: cachedToken, instanceUrl: cachedInstanceUrl };
  }
  await authenticate();
  return { token: cachedToken, instanceUrl: cachedInstanceUrl };
}

async function queryLeadIdByWebsite(website, auth) {
  if (!website) return null;
  const escapedWebsite = String(website).replace(/'/g, "\\'");
  const soql = `SELECT Id FROM Lead WHERE Website = '${escapedWebsite}' ORDER BY CreatedDate DESC LIMIT 1`;
  const url = `${auth.instanceUrl}/services/data/${config.salesforce.apiVersion}/query?q=${encodeURIComponent(soql)}`;
  const { data } = await requestJson('GET', url, null, { Authorization: `Bearer ${auth.token}` });

  if (!data || !Array.isArray(data.records) || data.records.length === 0) return null;
  return data.records[0].Id || null;
}

async function createLead(lead, auth) {
  const url = `${auth.instanceUrl}/services/data/${config.salesforce.apiVersion}/sobjects/Lead`;
  const { data } = await requestJson('POST', url, lead, { Authorization: `Bearer ${auth.token}` });
  return { id: data.id, action: 'created' };
}

async function updateLead(leadId, lead, auth) {
  const url = `${auth.instanceUrl}/services/data/${config.salesforce.apiVersion}/sobjects/Lead/${leadId}`;
  await requestJson('PATCH', url, lead, { Authorization: `Bearer ${auth.token}` });
  return { id: leadId, action: 'updated' };
}

async function saveLead(lead) {
  const auth = await getAuth();

  if (config.salesforce.upsertByWebsite && lead.Website) {
    const existingLeadId = await queryLeadIdByWebsite(lead.Website, auth);
    if (existingLeadId) {
      return updateLead(existingLeadId, lead, auth);
    }
  }

  return createLead(lead, auth);
}

module.exports = { saveLead };

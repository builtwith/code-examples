const config = require('./config');
const { connect } = require('./websocket');
const { getDomainProfile } = require('./domain-api');
const { mapToLead } = require('./mapper');
const { saveLead } = require('./salesforce');

console.log('BuiltWith Live Feed -> Salesforce');
console.log(`Channels: ${config.channels.join(', ')}`);
console.log('---');

connect(async (data) => {
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

  try {
    const profile = await getDomainProfile(domain);
    const lead = mapToLead(data, profile);
    const result = await saveLead(lead);
    console.log(`Salesforce lead ${result.action}: ${result.id} (${domain})`);
  } catch (err) {
    console.error(`Failed to process ${domain}:`, err.message);
  }
});

const config = require('./config');

function pickFirst(items) {
  return Array.isArray(items) && items.length > 0 ? items[0] : null;
}

function formatDate(epochMs) {
  if (!epochMs || Number.isNaN(Number(epochMs))) return '';
  return new Date(Number(epochMs)).toISOString().slice(0, 10);
}

function collectTechnologyNames(result) {
  const seen = new Set();
  const names = [];
  const paths = Array.isArray(result.Paths) ? result.Paths : [];

  for (const path of paths) {
    const techs = Array.isArray(path.Technologies) ? path.Technologies : [];
    for (const tech of techs) {
      if (!tech || !tech.Name) continue;
      if (seen.has(tech.Name)) continue;
      seen.add(tech.Name);
      names.push(tech.Name);
      if (names.length >= 25) return names;
    }
  }

  return names;
}

function deriveLastName(meta, domain) {
  const firstNameRecord = pickFirst(meta.Names);
  if (firstNameRecord && firstNameRecord.Name) {
    const parts = String(firstNameRecord.Name).trim().split(/\s+/);
    if (parts.length > 1) return parts[parts.length - 1];
    return parts[0];
  }
  return domain;
}

function mapToLead(liveFeedMessage, domainProfileEnvelope) {
  const domain = liveFeedMessage.D || liveFeedMessage.domain || domainProfileEnvelope.Lookup || 'unknown';
  const channel = liveFeedMessage.C || liveFeedMessage.channel || '';
  const result = domainProfileEnvelope.Result || {};
  const meta = domainProfileEnvelope.Meta || {};

  const company = meta.CompanyName || domain;
  const email = pickFirst(meta.Emails);
  const phone = pickFirst(meta.Telephones);
  const technologyNames = collectTechnologyNames(result);
  const lastName = deriveLastName(meta, domain);
  const firstIndexed = formatDate(domainProfileEnvelope.FirstIndexed);
  const lastIndexed = formatDate(domainProfileEnvelope.LastIndexed);

  const details = [
    `BuiltWith Live Feed channel: ${channel || '(unknown)'}`,
    `Lookup domain: ${domain}`,
    `Vertical: ${meta.Vertical || 'unknown'}`,
    `ARank: ${meta.ARank ?? 'n/a'}, QRank: ${meta.QRank ?? 'n/a'}`,
    `Spend estimate: ${domainProfileEnvelope.SalesRevenue ?? result.Spend ?? 0}`,
    `FirstIndexed: ${firstIndexed || 'n/a'}, LastIndexed: ${lastIndexed || 'n/a'}`,
    `Top technologies: ${technologyNames.length > 0 ? technologyNames.join(', ') : '(none)'}`,
  ];

  return {
    LastName: lastName,
    Company: company,
    Website: `https://${domain}`,
    Email: email || undefined,
    Phone: phone || undefined,
    City: meta.City || undefined,
    State: meta.State || undefined,
    Country: meta.Country || undefined,
    LeadSource: config.salesforce.leadSource,
    Description: details.join('\n'),
  };
}

module.exports = { mapToLead };

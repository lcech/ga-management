'use strict';

const { google } = require('googleapis');
const path = require('path');

async function doStuff() {
  // Create a new JWT client using the key file downloaded from the Google Developer Console
  const client = await google.auth.getClient({
    keyFile: path.join(__dirname, 'jwt.keys.json'),
    scopes: [
      'https://www.googleapis.com/auth/analytics',
      'https://www.googleapis.com/auth/analytics.edit'
    ],
  });

  const analytics = google.analytics({
    version: 'v3',
    auth: client
  });

  const properties = await analytics.management.webproperties.list({
    accountId: '139263833'
  });

  properties.data.items.forEach((property) => {
    console.log(property.id);
  });

  for (let i = 0; i < 5; i++) {
    let results = await analytics.management.webproperties.insert({
      'accountId': '139263833',
      'resource': {
        'name': 'Generated-Property-#' + (i + 1)
      }
    });
    console.log(results);
  }
}

if (module === require.main) {
  doStuff().catch(console.error);
}

// Exports for unit testing purposes
module.exports = {doStuff};
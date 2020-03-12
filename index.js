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

  let response = await analytics.management.webproperties.get({
    'accountId': '139263833',
    'webPropertyId': 'UA-139263833-2'
  });

  console.log(response.data);

  response = await analytics.management.webproperties.list({
    'accountId': '139263833'
  });
  console.log(response.data);

  let propertyIds = response.data.items.map((property) => { return property.id; });
  
  for (let i = 0; i < propertyIds.length; i++) {
    /*let result = await analytics.management.webproperties.patch({
      'accountId': '139263833',
      'webPropertyId': propertyIds[i],
      'resource': {
        'name': propertyIds[i],
        //'kind': 'analytics#webproperty',
        'websiteUrl': 'http://plemium.demogram.cz',
        'industryVertical': 'AUTOMOTIVE'
      }
    });*/
    let result = await analytics.management.profiles.insert({
      'accountId': '139263833',
      'webPropertyId': propertyIds[i],
      'resource': {
        'name': propertyIds[i],
        'kind': 'analytics#profile',
        'websiteUrl': 'http://plemium.demogram.cz',
        'industryVertical': 'AUTOMOTIVE'
      }
    });
    console.log(result.data);
  }
  
}

if (module === require.main) {
  doStuff().catch(console.error);
}

// Exports for unit testing purposes
module.exports = {doStuff};
const fs = require('fs');
const { google } = require('googleapis');
require('dotenv').config();

async function parseBalance() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALС,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const range = 'Balance!A:Z';  

  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = res.data.values;
    if (!rows.length) {
      console.log('No data found.');
      return;
    }

    const balanceConfig = {};
    const header = rows[0];

    const balanceTypeStartIndex = header.findIndex(col => col.includes('BalanceType'));
    const numColumns = balanceTypeStartIndex > -1 ? balanceTypeStartIndex : header.length;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const date = row[0];
      const dateTimestamp = new Date(date).getTime();

      for (let j = 1; j < numColumns; j++) {
        const country = header[j];
        const balanceTypes = row[j] ? row[j].split(',').map(bt => bt.trim()) : [];

        balanceTypes.forEach((balanceType) => {
          if (!balanceType) return;

          const countryKey = `${country}_Balance`;
          if (!balanceConfig[countryKey]) {
            balanceConfig[countryKey] = {};
          }

          if (!balanceConfig[countryKey][balanceType]) {
            balanceConfig[countryKey][balanceType] = [];
          }

          const balanceEntries = balanceConfig[countryKey][balanceType];

          if (balanceEntries.length > 0) {
            const lastEntry = balanceEntries[balanceEntries.length - 1];
            const lastEndDateTimestamp = new Date(lastEntry.end_date).getTime();

            if (dateTimestamp === lastEndDateTimestamp + 86400000) { // 86400000ms = 1 day
              lastEntry.end_date = date;
            } else {
              balanceEntries.push({ start_date: date, end_date: date });
            }
          } else {
            balanceEntries.push({ start_date: date, end_date: date });
          }
        });
      }
    }

    const finalBalanceConfig = Object.entries(balanceConfig).reduce((acc, [countryKey, balances]) => {
      acc[countryKey] = [];

      Object.entries(balances).forEach(([balanceType, entries]) => {
        entries.forEach(entry => {
          acc[countryKey].push({
            start_date: entry.start_date,
            end_date: entry.end_date,
            balance: balanceType
          });
        });
      });

      return acc;
    }, {});

    fs.writeFileSync('balance_config.json', JSON.stringify(finalBalanceConfig, null, 2));
    console.log('The JSON configuration has been successfully generated and saved to balance_config.json');
  } catch (error) {
    console.error('Error retrieving data from Google Sheets:', error);
  }
}

parseBalance().catch(console.error);

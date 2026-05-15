// Google Apps Script Web App for DA-RFO2 Monitoring shared Google Sheet storage.
// Deploy: Extensions > Apps Script > paste this file > Deploy > Web app.
// Execute as: Me. Who has access: anyone in the shared Drive/team policy.

const DATABASE_NAME = 'DA-RFO2 El Nino Monitoring Database';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const ss = openOrCreateSpreadsheet(payload.sheetUrl, payload.driveFolderUrl);

    if (payload.mode === 'replaceAll') {
      Object.keys(payload.tables || {}).forEach(function(tableName) {
        replaceTable(ss, tableName, payload.tables[tableName] || []);
      });
    }

    if (payload.mode === 'queue') {
      (payload.events || []).forEach(function(evt) {
        const tableName = tableNameFromKey(evt.table);
        if (evt.action === 'remove') removeRecord(ss, tableName, evt.record.id);
        if (evt.action === 'upsert') upsertRecord(ss, tableName, evt.record);
      });
    }

    return json({ ok: true, sheetUrl: ss.getUrl(), updatedAt: new Date().toISOString() });
  } catch (err) {
    return json({ ok: false, message: err.message });
  }
}

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    if (params.mode === 'read') {
      const ss = openExistingSpreadsheet(params.sheetUrl);
      return json({
        ok: true,
        sheetUrl: ss.getUrl(),
        tables: readAllTables(ss),
        pulledAt: new Date().toISOString()
      });
    }
    return json({ ok: true, message: 'DA-RFO2 Monitoring database endpoint is running.' });
  } catch (err) {
    return json({ ok: false, message: err.message });
  }
}

function openOrCreateSpreadsheet(sheetUrl, folderUrl) {
  const id = extractId(sheetUrl);
  if (id) return SpreadsheetApp.openById(id);

  const ss = SpreadsheetApp.create(DATABASE_NAME);
  const folderId = extractId(folderUrl);
  if (folderId) {
    const file = DriveApp.getFileById(ss.getId());
    const folder = DriveApp.getFolderById(folderId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
  }
  return ss;
}

function openExistingSpreadsheet(sheetUrl) {
  const id = extractId(sheetUrl);
  if (!id) throw new Error('Paste the Google Sheet URL before pulling records.');
  return SpreadsheetApp.openById(id);
}

function replaceTable(ss, tableName, records) {
  const sheet = ensureSheet(ss, tableName);
  sheet.clearContents();
  if (!records.length) {
    sheet.getRange(1, 1, 1, 1).setValue('id');
    return;
  }
  const headers = collectHeaders(records);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, records.length, headers.length).setValues(records.map(function(record) {
    return headers.map(function(header) { return normalizeValue(record[header]); });
  }));
  sheet.setFrozenRows(1);
}

function upsertRecord(ss, tableName, record) {
  const sheet = ensureSheet(ss, tableName);
  const existing = readTable(sheet);
  const idx = existing.records.findIndex(function(row) { return String(row.id) === String(record.id); });
  if (idx >= 0) existing.records[idx] = Object.assign({}, existing.records[idx], record);
  else existing.records.push(record);
  replaceTable(ss, tableName, existing.records);
}

function removeRecord(ss, tableName, id) {
  const sheet = ensureSheet(ss, tableName);
  const existing = readTable(sheet);
  replaceTable(ss, tableName, existing.records.filter(function(row) { return String(row.id) !== String(id); }));
}

function readTable(sheet) {
  const values = sheet.getDataRange().getValues();
  if (!values.length) return { headers: [], records: [] };
  const headers = values[0].map(String);
  const records = values.slice(1).filter(function(row) {
    return row.some(function(cell) { return cell !== ''; });
  }).map(function(row) {
    const record = {};
    headers.forEach(function(header, i) {
      record[header] = parseValue(row[i]);
    });
    return record;
  });
  return { headers: headers, records: records };
}

function readAllTables(ss) {
  const tables = {};
  ss.getSheets().forEach(function(sheet) {
    tables[sheet.getName()] = readTable(sheet).records;
  });
  return tables;
}

function ensureSheet(ss, tableName) {
  return ss.getSheetByName(tableName) || ss.insertSheet(tableName);
}

function collectHeaders(records) {
  const seen = {};
  const headers = ['id', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'];
  headers.forEach(function(h) { seen[h] = true; });
  records.forEach(function(record) {
    Object.keys(record || {}).forEach(function(key) {
      if (!seen[key]) {
        headers.push(key);
        seen[key] = true;
      }
    });
  });
  return headers.filter(function(header) {
    return records.some(function(record) { return Object.prototype.hasOwnProperty.call(record, header); }) || header === 'id';
  });
}

function tableNameFromKey(key) {
  return String(key || '').replace(/^darfo2_/, '').replace(/[^a-z0-9_]/gi, '_').toUpperCase();
}

function normalizeValue(value) {
  if (Array.isArray(value) || (value && typeof value === 'object')) return JSON.stringify(value);
  return value == null ? '' : value;
}

function parseValue(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return '';
  if ((trimmed[0] === '[' && trimmed[trimmed.length - 1] === ']') || (trimmed[0] === '{' && trimmed[trimmed.length - 1] === '}')) {
    try { return JSON.parse(trimmed); } catch (err) {}
  }
  return value;
}

function extractId(url) {
  if (!url) return '';
  const text = String(url);
  const match = text.match(/[-\w]{25,}/);
  return match ? match[0] : '';
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

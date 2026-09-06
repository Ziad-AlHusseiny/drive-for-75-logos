// Drive for 75 — vote collector (Google Apps Script)
// 1. Create a new Google Sheet. Extensions > Apps Script. Paste this file. Save.
// 2. Deploy > New deployment > Type: Web app. Execute as: Me. Who has access: Anyone. Deploy.
// 3. Copy the Web app URL into VOTE_ENDPOINT in index.html.

const SHEET_NAME = "votes";

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["timestamp", "name", "first", "second", "third", "ids", "comment"]);
  }
  return sh;
}

function doPost(e) {
  const v = JSON.parse(e.postData.contents);
  const sh = sheet_();
  // one vote per name: replace an earlier row from the same person
  const rows = sh.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    if (String(rows[i][1]).trim().toLowerCase() === String(v.name).trim().toLowerCase()) sh.deleteRow(i + 1);
  }
  sh.appendRow([v.ts || new Date().toISOString(), v.name, v.picks[0] || "", v.picks[1] || "", v.picks[2] || "", (v.ids || []).join(","), v.note || ""]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const rows = sheet_().getDataRange().getValues().slice(1);
  const votes = rows.map(r => ({ ts: r[0], name: r[1], picks: [r[2], r[3], r[4]].filter(Boolean), ids: String(r[5]).split(",").filter(Boolean), note: r[6] }));
  return ContentService.createTextOutput(JSON.stringify({ votes })).setMimeType(ContentService.MimeType.JSON);
}

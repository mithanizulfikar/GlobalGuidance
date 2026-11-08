// Google Apps Script: receives the website form and adds a row to "Website Queries".
// Setup: open the sheet > Extensions > Apps Script > paste this > Deploy > New deployment
// > type "Web app" > Execute as: Me > Who has access: Anyone > Deploy.
// Copy the Web App URL into GGH_FORM_ENDPOINT in index.html.
// Also add the header "Budget" in cell L1 of the sheet.

var SHEET_ID = '12VeALf6QsUZ7CFTz8k9R6IL1SjXaYInglC6cduQxTHw';
var SHEET_NAME = 'Sheet1';

function clean(v) {
  v = String(v || '').trim().slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v; // stops formula injection, keeps +92 numbers as text
}

function doPost(e) {
  var p = e.parameter || {};
  if (p.website) return ContentService.createTextOutput('ok'); // honeypot
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow([
    new Date(),            // A Date
    clean(p.fullName),     // B Full Name
    clean(p.phone),        // C Phone Number
    clean(p.email),        // D Email Address
    clean(p.city),         // E City of Residence
    clean(p.level),        // F Current Level of Ed
    clean(p.institution),  // G Institution
    clean(p.cgpa),         // H CGPA
    clean(p.completionYear), // I Completion Year
    clean(p.country),      // J Country of Interest
    clean(p.program),      // K Program Interested in
    clean(p.budget)        // L Budget
  ]);
  return ContentService.createTextOutput('ok');
}

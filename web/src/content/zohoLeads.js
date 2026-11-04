// Sends a Contact Us submission to Zoho CRM as a Lead, through the
// "Sjkwebsite" Web-to-Lead form (Zoho CRM → Setup → Developer Hub →
// Webforms). The IDs below come from that form's embed code; they identify
// the form, not an account login, and are meant to be public. If the form
// is edited or recreated in Zoho, copy the new values from its embed code.
//
// The Zoho form must keep these fields: First Name, Last Name, Company,
// Email, Mobile, City, Description, Lead Source, Lead Creation (LEADCF11)
// and "Which best describes your interest?" (LEADCF32).

const ZOHO_FORM = {
  action: "https://crm.zoho.com/crm/WebToLeadForm",
  xnQsjsdp: "1d0a521b7db791372a7036cf17c30904b3a43e55165a191fb44f498dc032172b",
  xmIwtLD: "34d9841903f685189673856161258e5b24acd8f0336f5ad7912a3444a8e184afdce1f36b3dc8f03f70cdc52c226bcbf4",
  actionType: "TGVhZHM=", // "Leads"
  returnURL: "https://sjkguahan.com/contact?sent=1"
};

// Which business a website interest belongs to, for the Lead Creation field.
// Interests that fit neither (parts, partnerships, general) are left blank
// for the sales team to route.
const LEAD_CREATION = {
  "Golf Carts / Electric Vehicles": "GCPH",
  "Turf & Golf Course Equipment": "GMPH",
  "Grounds & Landscaping": "GMPH",
  "Compact Equipment": "GMPH"
};

// Zoho needs a Last Name; the website asks for one Name field, so the last
// word becomes the last name and the rest the first name.
function splitName(full) {
  const parts = full.trim().split(/\s+/);
  const last = parts.pop() || "";
  return { first: parts.join(" "), last };
}

// `fields` is the website form's values: name, company, email, mobile,
// location, interest, message. Company and Description are mandatory in the
// Zoho form but optional on the website, so they get a placeholder when
// left blank.
export async function sendLeadToZoho(fields) {
  const { first, last } = splitName(fields.name);
  const body = new window.URLSearchParams({
    xnQsjsdp: ZOHO_FORM.xnQsjsdp,
    zc_gad: "",
    xmIwtLD: ZOHO_FORM.xmIwtLD,
    actionType: ZOHO_FORM.actionType,
    returnURL: ZOHO_FORM.returnURL,
    "First Name": first,
    "Last Name": last,
    Company: fields.company.trim() || "Not provided",
    Email: fields.email.trim(),
    Mobile: fields.mobile.trim(),
    City: fields.location.trim(),
    Description: fields.message.trim() || `Website enquiry: ${fields.interest}`,
    "Lead Source": "Website",
    LEADCF11: LEAD_CREATION[fields.interest] || "-None-",
    LEADCF32: fields.interest,
    aG9uZXlwb3Q: "" // Zoho's own spam trap; must stay empty
  });

  // Zoho does not allow reading its reply from another site, so the request
  // is sent "no-cors": it succeeds unless the network fails.
  await window.fetch(ZOHO_FORM.action, { method: "POST", mode: "no-cors", body });
}

# WhatsApp enquiry notifications: setup

The contact form notifies the owner on WhatsApp (and sends a full email backup). The default provider is the
**WhatsApp Business Cloud API (Meta)**, which uses a pre-approved **template** because business-initiated messages
outside the 24-hour window must be templates.

## 1. Template to submit in Meta Business Manager

| Field | Value |
|---|---|
| Name | `new_website_lead` |
| Category | **Utility** |
| Language | English (`en`) |
| Header / footer / buttons | none |

**Body** (paste exactly; `{{n}}` are variables):

```
New website enquiry
Name: {{1}}
Email: {{2}}
Company: {{3}}
Budget range: {{4}}
How can I help: {{5}}
Received: {{6}} | marketing.adithyareddy.online
```

**Sample values** (Meta asks for one example per variable):

| Variable | Meaning | Sample |
|---|---|---|
| `{{1}}` | Name | Priya Sharma |
| `{{2}}` | Email | priya@example.com |
| `{{3}}` | Company | Sample Institute |
| `{{4}}` | Budget range | Not sure yet |
| `{{5}}` | How can I help | We would like to improve our admission enquiries. |
| `{{6}}` | Received (Asia/Kolkata) | 10 Oct 2026, 03:45 PM |

Notes:
- Meta may re-classify the template as *Marketing*. Notification messages to yourself are utility in nature; if it is
  re-classified, you can appeal or accept the category (pricing differs).
- Meta rejects templates that have too many variables for the amount of fixed text. If that happens, shorten the labels
  less or merge variables (the code reads its variables in order, so change `templateParams` in `lib/notify/whatsapp.ts` to match).
- Template parameters may not contain newlines, tabs or runs of more than four spaces. The code strips them
  (newlines become " / "), removes markup and links, shortens the message to about 500 characters with
  "(full message in email)", and uses "Not provided" for an empty company.

## 2. Meta setup steps

1. In Meta Business Manager, create (or open) a **WhatsApp Business Account** and add a **phone number for the Cloud API**.
   The sender number cannot also be logged in to the normal WhatsApp or WhatsApp Business app. The owner number
   (+91 87125 69303) is the *recipient*, so it can stay on your phone.
2. Create the template above and wait for approval (usually minutes to a day).
3. Create a **System User** with `whatsapp_business_messaging` permission and generate a **permanent access token**.
4. Copy the **Phone number ID** from WhatsApp Manager → API setup.
5. While testing with Meta's free test number, add the owner number to the allowed recipient list.

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Value |
|---|---|
| `WHATSAPP_PROVIDER` | `meta` (default), `twilio` or `callmebot` |
| `META_WA_TOKEN` | permanent system-user token |
| `META_WA_PHONE_NUMBER_ID` | Phone number ID |
| `META_WA_TEMPLATE_NAME` | `new_website_lead` (default) |
| `META_WA_TEMPLATE_LANG` | `en` (default) |
| `OWNER_WHATSAPP_NUMBER` | `918712569303` (digits only, E.164 without +) |
| `OWNER_EMAIL` | where the full-message email goes |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_FROM_EMAIL` | optional, e.g. `Website <leads@yourdomain>` (default `onboarding@resend.dev`, which only delivers to your own Resend account email until a domain is verified) |
| `CONTACT_DRY_RUN` | `true` to print instead of send (details redacted in production) |

Alternative providers:
- **Twilio:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` (e.g. `whatsapp:+14155238886`), optional `TWILIO_CONTENT_SID` for an approved content template.
- **CallMeBot** (personal use, no business account): `CALLMEBOT_API_KEY`. Register the recipient number with CallMeBot first.

## 4. Testing

```bash
OWNER_WHATSAPP_NUMBER=918712569303 META_WA_PHONE_NUMBER_ID=<id> OWNER_EMAIL=you@example.com npm run contact:dry
```

prints the exact request and email for a sample submission without sending anything. After setting the variables on
Vercel, redeploy and submit the form once on `/contact/`.

## Delivery behaviour

- WhatsApp and email are sent in parallel.
- The visitor sees success if at least one of the two was delivered.
- If both fail, the visitor sees an error with the phone/WhatsApp fallback, and the server logs
  `[contact] LEAD NOT DELIVERED` with the time and provider error codes (never the visitor's details).

const nodemailer = require('nodemailer');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// ── PDF ticket generator ─────────────────────────────────────────────────────
async function generateTicketPdf({ firstName, lastName, registrationId, confirmedIntensiveName, rollNumber }) {
  const pdfDoc = await PDFDocument.create();
  
  // Load template image
  const templatePath = path.join(process.cwd(), 'ticket-template.png');
  const templateBytes = fs.readFileSync(templatePath);
  const templateImage = await pdfDoc.embedPng(templateBytes);
  
  // Create page matching aspect ratio 900x300
  const page = pdfDoc.addPage([900, 300]);
  page.drawImage(templateImage, { x: 0, y: 0, width: 900, height: 300 });
  
  // Fetch QR Code image
  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(registrationId)}`;
    const qrRes = await fetch(qrUrl);
    if (qrRes.ok) {
      const qrBytes = Buffer.from(await qrRes.arrayBuffer());
      const qrImage = await pdfDoc.embedPng(qrBytes);
      page.drawImage(qrImage, { x: 659, y: 26, width: 108, height: 108 });
    }
  } catch (qrErr) {
    console.error('Failed to embed QR code in PDF:', qrErr);
  }
  
  // Load fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  
  const x = 279;
  
  // 1. ATTENDEE PASS Label
  page.drawText('ATTENDEE PASS', {
    x,
    y: 190,
    size: 7,
    font: helveticaBold,
    color: rgb(169/255, 146/255, 133/255),
  });
  
  // 2. Attendee Name (Times-Roman Bold / serif style)
  page.drawText(`${firstName} ${lastName}`, {
    x,
    y: 168,
    size: 18,
    font: timesRomanBold,
    color: rgb(255/255, 215/255, 0/255),
  });
  
  // 3. TICKET ID Label & Value
  page.drawText('TICKET ID', {
    x,
    y: 140,
    size: 6,
    font: helveticaBold,
    color: rgb(169/255, 146/255, 133/255),
  });
  page.drawText(registrationId, {
    x,
    y: 126,
    size: 10,
    font: helveticaBold,
    color: rgb(232/255, 119/255, 34/255),
  });
  
  // 4. ROLL NUMBER Label & Value
  const rollX = x + 150;
  page.drawText('ROLL NUMBER', {
    x: rollX,
    y: 140,
    size: 6,
    font: helveticaBold,
    color: rgb(169/255, 146/255, 133/255),
  });
  page.drawText(rollNumber || '—', {
    x: rollX,
    y: 126,
    size: 10,
    font: helvetica,
    color: rgb(232/255, 229/255, 228/255),
  });
  
  // 5. INTENSIVES Label & Value
  page.drawText('INTENSIVES', {
    x,
    y: 98,
    size: 6,
    font: helveticaBold,
    color: rgb(169/255, 146/255, 133/255),
  });
  page.drawText(confirmedIntensiveName || 'General Entry', {
    x,
    y: 84,
    size: 9,
    font: helvetica,
    color: rgb(201/255, 168/255, 152/255),
  });
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

// ── CORS helper ──────────────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── Email HTML template ──────────────────────────────────────────────────────
function buildEmailHtml({ firstName, lastName, registrationId, confirmedIntensiveName, intensivePreferences, rollNumber, branch, yearOfStudy, type }) {
  const prefList = (intensivePreferences || [])
    .map((name, i) => `<li style="margin-bottom:4px;">${i + 1}. ${name}</li>`)
    .join('');

  const isUpdate = type === 'update';
  const subtitleText = isUpdate ? 'Intensive Updated' : 'Registration Confirmed';
  const titleText = isUpdate ? 'Intensive Updated — SPIC MACAY VNIT' : 'Registration Confirmed — SPIC MACAY VNIT';
  const greetingText = isUpdate
    ? `Your confirmed intensive for <strong style="color:#e87722;">SPIC MACAY Virasat 2026</strong> has been updated by the organizing team.`
    : `You are successfully registered for <strong style="color:#e87722;">SPIC MACAY Virasat 2026</strong> at VNIT Nagpur.
                Your intensive seat has been confirmed. Find all your details below.`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${titleText}</title>
</head>
<body style="margin:0;padding:0;background:#0f0c0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1a1512;border-radius:16px;overflow:hidden;border:1px solid rgba(232,119,34,0.2);">

          <!-- Header band -->
          <tr>
            <td style="background:linear-gradient(135deg,#1c1108 0%,#2a1a08 100%);padding:32px 40px;text-align:center;border-bottom:2px solid rgba(232,119,34,0.3);">
              <p style="margin:0 0 8px;font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:#e87722;font-weight:700;">SPIC MACAY — VNIT NAGPUR</p>
              <h1 style="margin:0;font-size:1.6rem;color:#ffd700;font-weight:800;letter-spacing:0.02em;">Virasat 2026</h1>
              <p style="margin:6px 0 0;font-size:0.85rem;color:#c9a898;">${subtitleText}</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 6px;font-size:1rem;color:#f5f0e8;">Dear <strong style="color:#ffd700;">${firstName} ${lastName}</strong>,</p>
              <p style="margin:0;font-size:0.875rem;color:#a09080;line-height:1.6;">
                ${greetingText}
              </p>
            </td>
          </tr>

          <!-- Ticket ID box -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(232,119,34,0.08);border:1px solid rgba(232,119,34,0.25);border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:#a09080;font-weight:700;">Ticket ID</p>
                    <p style="margin:0;font-size:1.4rem;font-family:monospace;font-weight:800;color:#e87722;letter-spacing:0.04em;">${registrationId}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmed intensive -->
          <tr>
            <td style="padding:20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:#86efac;font-weight:700;">Confirmed Intensive</p>
                    <p style="margin:0;font-size:1.05rem;font-weight:700;color:#a7f3d0;">${confirmedIntensiveName || 'General Entry'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details grid -->
          <tr>
            <td style="padding:20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${rollNumber && rollNumber !== '—' ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.07);">
                    <span style="font-size:0.75rem;color:#7a6a5a;text-transform:uppercase;letter-spacing:0.08em;">Roll Number</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.07);text-align:right;">
                    <span style="font-size:0.875rem;color:#f5f0e8;font-weight:600;">${rollNumber}</span>
                  </td>
                </tr>` : ''}
                ${branch && branch !== '—' ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.07);">
                    <span style="font-size:0.75rem;color:#7a6a5a;text-transform:uppercase;letter-spacing:0.08em;">Branch</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.07);text-align:right;">
                    <span style="font-size:0.875rem;color:#f5f0e8;font-weight:600;">${branch}</span>
                  </td>
                </tr>` : ''}
                ${yearOfStudy && yearOfStudy !== '—' ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.07);">
                    <span style="font-size:0.75rem;color:#7a6a5a;text-transform:uppercase;letter-spacing:0.08em;">Year of Study</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.07);text-align:right;">
                    <span style="font-size:0.875rem;color:#f5f0e8;font-weight:600;">${yearOfStudy}</span>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:0.75rem;color:#7a6a5a;text-transform:uppercase;letter-spacing:0.08em;">Chapter</span>
                  </td>
                  <td style="padding:10px 0;text-align:right;">
                    <span style="font-size:0.875rem;color:#f5f0e8;font-weight:600;">SPIC MACAY — VNIT Nagpur</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Preference list -->
          ${prefList ? `
          <tr>
            <td style="padding:20px 40px 0;">
              <p style="margin:0 0 8px;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:#7a6a5a;font-weight:700;">Your Preferences (submitted)</p>
              <ul style="margin:0;padding-left:18px;color:#a09080;font-size:0.8rem;line-height:1.7;">
                ${prefList}
              </ul>
            </td>
          </tr>` : ''}

          <!-- Important note -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(232,119,34,0.06);border-left:3px solid #e87722;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:0.8rem;color:#c9a898;line-height:1.6;">
                      Please carry this email or your printed ticket pass to the event for check-in.
                      Your Ticket ID <strong style="color:#e87722;">${registrationId}</strong> is your unique entry code.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;border-top:1px solid rgba(245,240,232,0.07);margin-top:24px;">
              <p style="margin:0 0 4px;font-size:0.8rem;color:#7a6a5a;">Questions? Contact us at</p>
              <a href="mailto:spicmacay@vnit.ac.in" style="color:#e87722;font-size:0.875rem;text-decoration:none;font-weight:600;">spicmacay@vnit.ac.in</a>
              <p style="margin:16px 0 0;font-size:0.7rem;color:#4a3a2a;">
                SPIC MACAY — VNIT Nagpur Chapter &nbsp;·&nbsp; Virasat 2026<br/>
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Vercel serverless handler ────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  setCors(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    to,
    firstName,
    lastName,
    registrationId,
    confirmedIntensiveName,
    intensivePreferences,   // array of name strings (not IDs)
    rollNumber,
    branch,
    yearOfStudy,
    type,
  } = req.body;

  // Basic validation
  if (!to || !registrationId || !firstName) {
    return res.status(400).json({ error: 'Missing required fields: to, registrationId, firstName' });
  }

  // Create Nodemailer transporter using Gmail App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,   // your Gmail address
      pass: process.env.GMAIL_PASS,   // Gmail App Password (16-char, no spaces)
    },
  });

  const html = buildEmailHtml({
    firstName, lastName, registrationId,
    confirmedIntensiveName, intensivePreferences,
    rollNumber, branch, yearOfStudy,
    type,
  });

  const isUpdate = type === 'update';
  const subject = isUpdate
    ? `Your Intensive Has Been Updated — ${registrationId}`
    : `Your Virasat 2026 Pass — ${registrationId}`;

  const plainText = isUpdate
    ? `Hi ${firstName},\n\nYour confirmed intensive for SPIC MACAY Virasat 2026 has been updated by the organizing team.\n\nTicket ID: ${registrationId}\nConfirmed Intensive: ${confirmedIntensiveName || 'General Entry'}\n\nPresent this ticket ID at check-in.\n\nContact: spicmacay@vnit.ac.in`
    : `Hi ${firstName},\n\nYou are registered for SPIC MACAY Virasat 2026 at VNIT Nagpur.\n\nTicket ID: ${registrationId}\nConfirmed Intensive: ${confirmedIntensiveName || 'General Entry'}\n\nPresent this ticket ID at check-in.\n\nContact: spicmacay@vnit.ac.in`;

  let pdfBuffer;
  try {
    pdfBuffer = await generateTicketPdf({
      firstName,
      lastName,
      registrationId,
      confirmedIntensiveName,
      rollNumber,
    });
  } catch (pdfErr) {
    console.error('PDF generation failed:', pdfErr);
  }

  try {
    const mailOptions = {
      from: `"SPIC MACAY VNIT Nagpur" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: 'spicmacay@vnit.ac.in',
      subject,
      html,
      text: plainText,
    };
    if (pdfBuffer) {
      mailOptions.attachments = [
        {
          filename: `Virasat_Pass_${registrationId}.pdf`,
          content: pdfBuffer,
        }
      ];
    }
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Confirmation email sent.' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email.', detail: err.message });
  }
};

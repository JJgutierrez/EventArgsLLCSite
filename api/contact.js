import nodemailer from 'nodemailer';

// Simple in-memory rate-limiting map
const rateLimitMap = new Map();
const LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

// Clean up stale rate limit entries periodically
if (typeof global.rateLimitCleanupInterval === 'undefined') {
  global.rateLimitCleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const fresh = timestamps.filter(ts => now - ts < LIMIT_WINDOW);
      if (fresh.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, fresh);
      }
    }
  }, 300000); // 5 minutes
}

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return true;
  }

  const timestamps = rateLimitMap.get(ip).filter(ts => now - ts < LIMIT_WINDOW);
  if (timestamps.length >= MAX_REQUESTS) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }

  // Get client IP for rate limiting
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown-ip';

  // Apply rate limiting
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again in a minute.',
    });
  }

  const { name, email, subject, service, stack, message, honeypot } = req.body;

  // Spam protection: check honeypot field
  // If the honeypot field is filled, silently succeed (behaving like a normal success) so bots don't know they were caught.
  if (honeypot && honeypot.trim() !== '') {
    console.warn(`[Spam Blocked] Honeypot field filled by IP: ${ip}`);
    return res.status(200).json({
      success: true,
      message: 'Thanks — your message was sent. I’ll get back to you soon.',
    });
  }

  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Name is required.' });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'Message is required.' });
  }

  // Sanitize inputs
  const cleanName = name.replace(/[<>]/g, '').trim();
  const cleanEmail = email.trim();
  const cleanSubject = subject ? subject.replace(/[<>]/g, '').trim() : '';
  const cleanService = service ? service.replace(/[<>]/g, '').trim() : '';
  const cleanStack = stack ? stack.replace(/[<>]/g, '').trim() : '';
  const cleanMessage = message.replace(/[<>]/g, '').trim();

  // Create Nodemailer Transporter
  const smtpHost = process.env.SMTP_HOST || 'mail.privateemail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 465;
  const smtpSecure = process.env.SMTP_SECURE === 'false' ? false : true;
  const smtpUser = process.env.SMTP_USER || 'jjgutierrez@eventargs.llc';
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO || 'jjgutierrez@eventargs.llc';

  if (!smtpPass) {
    console.error('SMTP credentials missing. Please set SMTP_PASS env variable.');
    return res.status(500).json({
      success: false,
      message: 'Email service is currently misconfigured. Please try booking a call instead.',
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure, // true for 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  // Construct Email Subject and HTML Body
  const emailSubject = cleanSubject || `Website Contact: ${cleanService || 'New Message'} from ${cleanName}`;
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.5; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          h2 { color: #1f768c; margin-top: 0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; background: #f8f9fa; padding: 10px; border-radius: 4px; border: 1px solid #eee; }
          .message { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Website Contact Form Submission</h2>
          
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${cleanName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></div>
          </div>
          
          ${cleanService ? `
          <div class="field">
            <div class="label">Service Needed:</div>
            <div class="value">${cleanService}</div>
          </div>
          ` : ''}
          
          ${cleanStack ? `
          <div class="field">
            <div class="label">Current Stack:</div>
            <div class="value">${cleanStack}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Message / Requirements:</div>
            <div class="value message">${cleanMessage}</div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Website Contact" <${smtpUser}>`,
      to: contactTo,
      replyTo: cleanEmail,
      subject: emailSubject,
      html: emailHtml,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nService: ${cleanService}\nStack: ${cleanStack}\nMessage:\n${cleanMessage}`,
    });

    console.log(`[Email Sent] Message ID: ${info.messageId} from ${cleanEmail}`);

    return res.status(200).json({
      success: true,
      message: 'Thanks — your message was sent. I’ll get back to you soon.',
    });
  } catch (err) {
    console.error(`[Email Error] Failed to send email from ${cleanEmail} to ${contactTo}. Error:`, err.message);
    return res.status(500).json({
      success: false,
      message: 'Sorry, something went wrong sending your message. Please try again.',
    });
  }
}

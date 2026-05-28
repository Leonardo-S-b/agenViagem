import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

export const mailFrom = process.env.FROM_EMAIL || 'no-reply@agenviagem.local';

if (!host || !SMTP_USER || !SMTP_PASS) {
  console.warn('SMTP configuration is incomplete. Email sending will not work.');
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});
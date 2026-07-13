import { Resend } from 'resend';
import { escapeHtml } from './escapeHtml';

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@stubenboeck-telfs.com'; // domain stays ASCII for email routing

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('de-AT', { dateStyle: 'long' }).format(d);
}

export async function sendBookingRequestEmails(booking: {
  id: number;
  token: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests?: number;
  message?: string | null;
  room: { name: string };
}) {
  const confirmUrl = `${BASE_URL}/de/admin/confirm/${booking.id}?token=${booking.token}`;
  const rejectUrl = `${BASE_URL}/de/admin/reject/${booking.id}?token=${booking.token}`;

  const safeGuestName = escapeHtml(booking.guestName);
  const safeGuestEmail = escapeHtml(booking.guestEmail);
  const safeGuestPhone = escapeHtml(booking.guestPhone);
  const safeMessage = booking.message ? escapeHtml(booking.message) : null;
  const safeRoomName = escapeHtml(booking.room.name);

  // Email to guest
  await resend.emails.send({
    from: 'Haus Stubenböck <noreply@stubenboeck-telfs.com>',
    to: booking.guestEmail,
    subject: 'Ihre Buchungsanfrage — Haus Stubenböck',
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1A1A">
        <h1 style="color:#1C2B1E;font-size:28px">Danke für Ihre Anfrage!</h1>
        <p>Liebe/r ${safeGuestName},</p>
        <p>wir haben Ihre Buchungsanfrage erhalten und melden uns in Kürze.</p>
        <table style="margin:24px 0;width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#6B7280">Zimmer:</td><td style="padding:8px;font-weight:bold">${safeRoomName}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Anreise:</td><td style="padding:8px">${formatDate(booking.checkIn)}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Abreise:</td><td style="padding:8px">${formatDate(booking.checkOut)}</td></tr>
        </table>
        <p>Mit freundlichen Grüßen,<br/>Maria Verena Stubenböck</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="font-size:12px;color:#6B7280">Haus Stubenböck &middot; Gießenweg 9, 6410 Telfs &middot; +43 676 8303 8325</p>
      </div>
    `,
  });

  // Email to admin
  await resend.emails.send({
    from: 'Haus Stubenböck System <noreply@stubenboeck-telfs.com>',
    to: ADMIN_EMAIL,
    subject: `Neue Buchungsanfrage: ${booking.guestName} — ${booking.room.name}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1A1A">
        <h1 style="color:#1C2B1E">Neue Buchungsanfrage</h1>
        <table style="margin:24px 0;width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#6B7280">Name:</td><td style="padding:8px">${safeGuestName}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">E-Mail:</td><td style="padding:8px">${safeGuestEmail}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Telefon:</td><td style="padding:8px">${safeGuestPhone}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Zimmer:</td><td style="padding:8px">${safeRoomName}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Gäste:</td><td style="padding:8px">${booking.guests ?? 1}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Anreise:</td><td style="padding:8px">${formatDate(booking.checkIn)}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Abreise:</td><td style="padding:8px">${formatDate(booking.checkOut)}</td></tr>
          ${safeMessage ? `<tr><td style="padding:8px;color:#6B7280">Nachricht:</td><td style="padding:8px">${safeMessage}</td></tr>` : ''}
        </table>
        <div style="margin:32px 0">
          <a href="${confirmUrl}" style="background:#1C2B1E;color:white;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">
            Bestätigen
          </a>
          <a href="${rejectUrl}" style="background:#dc2626;color:white;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;margin-left:16px">
            Ablehnen
          </a>
        </div>
      </div>
    `,
  });
}

export async function sendBookingConfirmedEmail(booking: {
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  room: { name: string };
}) {
  const safeGuestName = escapeHtml(booking.guestName);
  const safeRoomName = escapeHtml(booking.room.name);

  await resend.emails.send({
    from: 'Haus Stubenböck <noreply@stubenboeck-telfs.com>',
    to: booking.guestEmail,
    subject: 'Buchung bestätigt — Haus Stubenböck',
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1A1A">
        <h1 style="color:#1C2B1E">Ihre Buchung ist bestätigt!</h1>
        <p>Liebe/r ${safeGuestName},</p>
        <p>wir freuen uns, Ihre Buchung zu bestätigen. Wir heißen Sie herzlich willkommen!</p>
        <table style="margin:24px 0;width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#6B7280">Zimmer:</td><td style="padding:8px;font-weight:bold">${safeRoomName}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Anreise:</td><td style="padding:8px">${formatDate(booking.checkIn)}</td></tr>
          <tr><td style="padding:8px;color:#6B7280">Abreise:</td><td style="padding:8px">${formatDate(booking.checkOut)}</td></tr>
        </table>
        <p>Bei Fragen stehen wir gerne zur Verfügung.</p>
        <p>Mit freundlichen Grüßen,<br/>Maria Verena Stubenböck</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="font-size:12px;color:#6B7280">+43 676 8303 8325 &middot; info@stubenboeck-telfs.com</p>
      </div>
    `,
  });
}

export async function sendBookingRejectedEmail(booking: {
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  room: { name: string };
}) {
  const safeGuestName = escapeHtml(booking.guestName);

  await resend.emails.send({
    from: 'Haus Stubenböck <noreply@stubenboeck-telfs.com>',
    to: booking.guestEmail,
    subject: 'Buchungsanfrage — Haus Stubenböck',
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1A1A">
        <h1 style="color:#1C2B1E">Ihre Buchungsanfrage</h1>
        <p>Liebe/r ${safeGuestName},</p>
        <p>leider müssen wir Ihre Anfrage für den gewünschten Zeitraum (${formatDate(booking.checkIn)} &ndash; ${formatDate(booking.checkOut)}) absagen, da das Zimmer in diesem Zeitraum leider bereits belegt ist.</p>
        <p>Wir würden uns freuen, Sie zu einem anderen Zeitpunkt begrüßen zu dürfen. Bitte senden Sie uns eine neue Anfrage oder kontaktieren Sie uns direkt.</p>
        <p>Mit freundlichen Grüßen,<br/>Maria Verena Stubenböck</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="font-size:12px;color:#6B7280">+43 676 8303 8325 &middot; info@stubenboeck-telfs.com</p>
      </div>
    `,
  });
}

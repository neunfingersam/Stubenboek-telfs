import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml } from '@/lib/escapeHtml';

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@stubenboeck-telfs.com';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    await resend.emails.send({
      from: 'Haus Stubenböck Website <noreply@stubenboeck-telfs.com>',
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      html: `<p><strong>${safeName}</strong> (${safeEmail}) schreibt:</p><p>${safeMessage}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

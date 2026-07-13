import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@stubenboeck-telfs.com';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    await resend.emails.send({
      from: 'Haus Stubenböck Website <noreply@stubenboeck-telfs.com>',
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      html: `<p><strong>${name}</strong> (${email}) schreibt:</p><p>${message}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

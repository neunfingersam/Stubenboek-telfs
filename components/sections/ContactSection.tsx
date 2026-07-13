'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 9h3" />
    </svg>
  );
}

function IconEnvelope() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mx-auto mb-4 h-12 w-12 text-alpine">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function ContactSection() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-alpine focus:outline-none focus:ring-1 focus:ring-alpine';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'success' : 'error');
  }

  return (
    <SectionWrapper id="contact" className="bg-cream">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
            Kontakt
          </p>
          <h2 className="mb-8 font-serif text-4xl font-bold text-alpine md:text-5xl">
            {t('headline')}
          </h2>
          <div className="space-y-4 text-gray-600">
            <p className="font-semibold text-alpine">{t('owner')}</p>
            <p>
              Gießenweg 9
              <br />
              6410 Telfs, Tirol
            </p>
            <a href="tel:+4367683038325" className="flex items-center gap-2 hover:text-gold">
              <IconPhone /> +43 676 8303 8325
            </a>
            <a href="mailto:info@stubenboeck-telfs.com" className="flex items-center gap-2 hover:text-gold">
              <IconEnvelope /> info@stubenboeck-telfs.com
            </a>
          </div>
        </div>
        <div>
          {status === 'success' ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-md">
              <IconCheckCircle />
              <p className="font-serif text-xl text-alpine">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-8 shadow-md">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('name')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('message')}</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={inputClass}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '…' : t('send')}
              </Button>
              {status === 'error' && (
                <p className="text-center text-sm text-red-600">{t('error')}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

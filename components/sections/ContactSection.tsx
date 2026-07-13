'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

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
              📞 +43 676 8303 8325
            </a>
            <a
              href="mailto:info@stubenboeck-telfs.com"
              className="flex items-center gap-2 hover:text-gold"
            >
              ✉️ info@stubenboeck-telfs.com
            </a>
          </div>
        </div>
        <div>
          {status === 'success' ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-md">
              <div className="mb-4 text-4xl">✅</div>
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
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('email')}
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('message')}
                </label>
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
                <p className="text-center text-sm text-red-600">
                  {t('error')}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

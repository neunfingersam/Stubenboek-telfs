'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from './Button';

const ROOMS = [
  { slug: 'einzelzimmer', label: 'Einzelzimmer', labelEn: 'Single Room' },
  { slug: 'doppelzimmer', label: 'Doppelzimmer', labelEn: 'Double Room' },
  { slug: 'mehrbettzimmer', label: 'Mehrbettzimmer', labelEn: 'Multi-bed Room' },
];

interface BookedRange {
  checkIn: string;
  checkOut: string;
}

function toInputValue(d: Date): string {
  return d.toISOString().split('T')[0];
}

export default function BookingForm() {
  const t = useTranslations('booking');
  const [step, setStep] = useState(1);
  const [roomSlug, setRoomSlug] = useState('doppelzimmer');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [message, setMessage] = useState('');
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Listen to room selection events from Rooms section
  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setRoomSlug(slug);
      setStep(1);
    };
    window.addEventListener('selectRoom', handler);
    return () => window.removeEventListener('selectRoom', handler);
  }, []);

  // Fetch booked ranges when room changes
  useEffect(() => {
    fetch(`/api/bookings?roomSlug=${roomSlug}`)
      .then((r) => r.json())
      .then((data) => setBookedRanges(data.bookedRanges ?? []));
  }, [roomSlug]);

  const today = toInputValue(new Date());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomSlug, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, message }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-5xl">✉</div>
        <h3 className="mb-2 font-serif text-2xl font-bold text-alpine">{t('success')}</h3>
      </div>
    );
  }

  const inputClass = 'w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-alpine focus:outline-none focus:ring-1 focus:ring-alpine';
  const labelClass = 'mb-1 block text-sm font-medium text-gray-700';

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg">
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${step >= s ? 'bg-alpine text-white' : 'bg-gray-100 text-gray-400'}`}>
              {s}
            </div>
            <span className={`text-sm ${step >= s ? 'text-alpine' : 'text-gray-400'}`}>
              {s === 1 ? t('step1') : s === 2 ? t('step2') : t('step3')}
            </span>
            {s < 3 && <div className={`h-px w-8 ${step > s ? 'bg-alpine' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{t('selectRoom')}</label>
            <select value={roomSlug} onChange={(e) => setRoomSlug(e.target.value)} className={inputClass}>
              {ROOMS.map((r) => (
                <option key={r.slug} value={r.slug}>{r.label}</option>
              ))}
            </select>
          </div>
          <Button type="button" variant="primary" size="md" className="w-full" onClick={() => setStep(2)}>
            {t('next')}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t('checkIn')}</label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t('checkOut')}</label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>{t('guests')}</label>
            <input
              type="number"
              min={1}
              max={4}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          {bookedRanges.length > 0 && (
            <p className="text-xs text-amber-600">
              Einige Daten sind bereits belegt. Bitte prüfen Sie Ihre Auswahl.
            </p>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" size="md" onClick={() => setStep(1)}>{t('back')}</Button>
            <Button type="button" variant="primary" size="md" className="flex-1" onClick={() => setStep(3)} disabled={!checkIn || !checkOut}>{t('next')}</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{t('name')}</label>
            <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('email')}</label>
            <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('phone')}</label>
            <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('message')}</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={inputClass} />
          </div>
          {status === 'error' && <p className="text-sm text-red-600">{t('error')}</p>}
          <div className="flex gap-3">
            <Button type="button" variant="outline" size="md" onClick={() => setStep(2)}>{t('back')}</Button>
            <Button type="submit" variant="gold" size="md" className="flex-1" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : t('submit')}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

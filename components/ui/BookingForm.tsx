'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Button from './Button';

// ─── Types ────────────────────────────────────────────────────────────────────

const ROOMS = [
  { slug: 'einzelzimmer', maxGuests: 1 },
  { slug: 'doppelzimmer', maxGuests: 2 },
  { slug: 'mehrbettzimmer', maxGuests: 4 },
];

interface BookedRange {
  checkIn: string;
  checkOut: string;
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function sod(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function sameDay(a: Date, b: Date): boolean {
  return sod(a).getTime() === sod(b).getTime();
}

function isBooked(date: Date, ranges: BookedRange[]): boolean {
  const t = sod(date).getTime();
  return ranges.some((r) => {
    const from = sod(new Date(r.checkIn)).getTime();
    const to = sod(new Date(r.checkOut)).getTime();
    return t >= from && t < to;
  });
}

function rangeHasBooked(from: Date, to: Date, ranges: BookedRange[]): boolean {
  return ranges.some((r) => {
    const rFrom = sod(new Date(r.checkIn)).getTime();
    const rTo = sod(new Date(r.checkOut)).getTime();
    return rFrom < sod(to).getTime() && rTo > sod(from).getTime();
  });
}

function calDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7; // Mon = 0
  const count = new Date(year, month + 1, 0).getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= count; d++) days.push(new Date(year, month, d));
  return days;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconEnvelope() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mx-auto mb-5 h-14 w-14 text-alpine">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className ?? 'h-4 w-4'}>
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
    </svg>
  );
}

function IconBedSingle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19V9.75A2.25 2.25 0 015.25 7.5h13.5A2.25 2.25 0 0121 9.75V19M3 19h18M3 19v-2.25M21 19v-2.25M3 16.75h18M8.25 7.5V6a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v1.5" />
    </svg>
  );
}

function IconBedDouble() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19V9.75A2.25 2.25 0 015.25 7.5h13.5A2.25 2.25 0 0121 9.75V19M3 19h18M3 19v-2.25M21 19v-2.25M3 16.75h18M6.75 7.5V6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v1.5m3 0V6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v1.5" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

function IconSpinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

const ROOM_ICONS: Record<string, React.ReactNode> = {
  einzelzimmer: <IconBedSingle />,
  doppelzimmer: <IconBedDouble />,
  mehrbettzimmer: <IconUsers />,
};

// ─── Calendar component ───────────────────────────────────────────────────────

const WEEKDAYS_DE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const WEEKDAYS_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface CalendarProps {
  checkIn: string;
  checkOut: string;
  bookedRanges: BookedRange[];
  onDayClick: (date: Date) => void;
  locale: string;
}

function Calendar({ checkIn, checkOut, bookedRanges, onDayClick, locale }: CalendarProps) {
  const today = sod(new Date());
  const [cal, setCal] = useState(() => ({ year: today.getFullYear(), month: today.getMonth() }));

  const days = calDays(cal.year, cal.month);
  const checkInDate = checkIn ? sod(new Date(checkIn)) : null;
  const checkOutDate = checkOut ? sod(new Date(checkOut)) : null;

  const monthLabel = new Date(cal.year, cal.month).toLocaleString(
    locale === 'de' ? 'de-AT' : 'en-GB',
    { month: 'long', year: 'numeric' }
  );

  const canPrev = cal.year > today.getFullYear() || cal.month > today.getMonth();

  function prev() {
    setCal((c) => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  }
  function next() {
    setCal((c) => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });
  }

  const weekdays = locale === 'de' ? WEEKDAYS_DE : WEEKDAYS_EN;

  return (
    <div className="select-none">
      {/* Month nav */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path d="M9.78 4.22a.75.75 0 010 1.06L7.06 8l2.72 2.72a.75.75 0 11-1.06 1.06L5.47 8.53a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 0z" />
          </svg>
        </button>
        <span className="text-sm font-semibold capitalize text-gray-800">{monthLabel}</span>
        <button
          type="button"
          onClick={next}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06L7.28 11.78a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7">
        {weekdays.map((d) => (
          <div key={d} className="py-1 text-center text-xs font-medium text-gray-400">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const d = sod(date);
          const isPast = d < today;
          const booked = isBooked(date, bookedRanges);
          const disabled = isPast || booked;
          const isToday = sameDay(d, today);
          const isStart = checkInDate && sameDay(d, checkInDate);
          const isEnd = checkOutDate && sameDay(d, checkOutDate);
          const inRange =
            checkInDate && checkOutDate && d > checkInDate && d < checkOutDate;

          // Wrapper background for continuous range band
          let wrapperClass = 'relative flex items-center justify-center py-0.5';
          if (inRange) wrapperClass += ' bg-alpine/10';
          if (isStart && checkOutDate) wrapperClass += ' rounded-l-full bg-alpine/10';
          if (isEnd && checkInDate) wrapperClass += ' rounded-r-full bg-alpine/10';
          if (!inRange && !isStart && !isEnd) wrapperClass += ' rounded-full';

          let btnClass =
            'relative h-9 w-9 rounded-full text-sm transition-colors focus:outline-none';
          if (isStart || isEnd) {
            btnClass += ' bg-alpine text-white font-semibold shadow-sm';
          } else if (booked) {
            btnClass += ' text-gray-300 cursor-not-allowed';
          } else if (isPast) {
            btnClass += ' text-gray-300 cursor-not-allowed';
          } else if (inRange) {
            btnClass += ' text-alpine font-medium hover:bg-alpine/20';
          } else {
            btnClass += ' text-gray-700 hover:bg-alpine/15';
          }
          if (isToday && !isStart && !isEnd) {
            btnClass += ' font-bold underline decoration-gold underline-offset-2';
          }

          return (
            <div key={d.toISOString()} className={wrapperClass}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onDayClick(date)}
                className={btnClass}
              >
                {date.getDate()}
                {/* Red dot for booked dates */}
                {booked && (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-400" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-alpine" />
          {locale === 'de' ? 'Ausgewählt' : 'Selected'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="relative h-3 w-3 rounded-full bg-gray-200">
            <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-400" />
          </span>
          {locale === 'de' ? 'Belegt' : 'Booked'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-alpine/15" />
          {locale === 'de' ? 'Ihr Zeitraum' : 'Your stay'}
        </span>
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const t = useTranslations('booking');
  const tRooms = useTranslations('rooms');
  const locale = useLocale();

  const [step, setStep] = useState(1);
  const [roomSlug, setRoomSlug] = useState('doppelzimmer');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [picking, setPicking] = useState<'in' | 'out'>('in');
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [message, setMessage] = useState('');
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [rangeError, setRangeError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setRoomSlug(slug);
      setStep(1);
    };
    window.addEventListener('selectRoom', handler);
    return () => window.removeEventListener('selectRoom', handler);
  }, []);

  useEffect(() => {
    fetch(`/api/bookings?roomSlug=${roomSlug}`)
      .then((r) => r.json())
      .then((data) => setBookedRanges(data.bookedRanges ?? []));
  }, [roomSlug]);

  const maxGuests = ROOMS.find((r) => r.slug === roomSlug)?.maxGuests ?? 4;

  function handleDayClick(date: Date) {
    const today = sod(new Date());
    const d = sod(date);
    if (d < today || isBooked(date, bookedRanges)) return;
    setRangeError(false);

    if (picking === 'in' || !checkIn) {
      setCheckIn(toValue(d));
      setCheckOut('');
      setPicking('out');
    } else {
      const inDate = sod(new Date(checkIn));
      if (d <= inDate) {
        // Clicked same/before check-in → restart
        setCheckIn(toValue(d));
        setCheckOut('');
        setPicking('out');
      } else if (rangeHasBooked(inDate, d, bookedRanges)) {
        setRangeError(true);
      } else {
        setCheckOut(toValue(d));
        setPicking('in');
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomSlug, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, message }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
        <IconEnvelope />
        <h3 className="mb-2 font-serif text-2xl font-bold text-alpine">{t('success')}</h3>
        <p className="text-sm text-gray-500">{t('successText')}</p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-alpine focus:outline-none focus:ring-1 focus:ring-alpine transition-colors';
  const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500';

  // Formatted date display
  const fmtDate = (val: string) =>
    val
      ? new Date(val).toLocaleDateString(locale === 'de' ? 'de-AT' : 'en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : null;

  const nights =
    checkIn && checkOut
      ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
      : 0;

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
      {/* Step indicator */}
      <div className="mb-8 flex items-start">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center">
              <div className={`h-px flex-1 transition-colors ${s === 1 ? 'invisible' : step > s - 1 ? 'bg-alpine' : 'bg-gray-200'}`} />
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  step > s ? 'bg-alpine text-white' : step === s ? 'bg-alpine text-white ring-4 ring-alpine/15' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s ? <IconCheck /> : s}
              </div>
              <div className={`h-px flex-1 transition-colors ${s === 3 ? 'invisible' : step > s ? 'bg-alpine' : 'bg-gray-200'}`} />
            </div>
            <span className={`mt-2 text-xs ${step >= s ? 'font-medium text-alpine' : 'text-gray-400'}`}>
              {s === 1 ? t('step1') : s === 2 ? t('step2') : t('step3')}
            </span>
          </div>
        ))}
      </div>

      {/* ── Step 1: Room ── */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="space-y-2.5">
            {ROOMS.map((r) => (
              <button
                key={r.slug}
                type="button"
                onClick={() => setRoomSlug(r.slug)}
                className={`flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all ${
                  roomSlug === r.slug
                    ? 'border-alpine bg-alpine/5 text-alpine'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className={roomSlug === r.slug ? 'text-alpine' : 'text-gray-400'}>{ROOM_ICONS[r.slug]}</span>
                <span className="font-medium">{tRooms(`${r.slug}.name`)}</span>
                {roomSlug === r.slug && <span className="ml-auto text-alpine"><IconCheck /></span>}
              </button>
            ))}
          </div>
          <Button type="button" variant="primary" size="md" className="w-full" onClick={() => setStep(2)}>
            {t('next')}
          </Button>
        </div>
      )}

      {/* ── Step 2: Calendar + Guests ── */}
      {step === 2 && (
        <div className="space-y-5">
          {/* Selected dates display */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl border-2 px-4 py-3 transition-colors ${
                picking === 'in' && !checkIn ? 'border-alpine bg-alpine/5' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">{t('checkIn')}</p>
              {checkIn ? (
                <p className="text-sm font-semibold text-alpine">{fmtDate(checkIn)}</p>
              ) : (
                <p className="text-sm text-gray-400">{locale === 'de' ? 'Wählen' : 'Select'}</p>
              )}
            </div>
            <div
              className={`rounded-xl border-2 px-4 py-3 transition-colors ${
                picking === 'out' && checkIn ? 'border-alpine bg-alpine/5' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">{t('checkOut')}</p>
              {checkOut ? (
                <p className="text-sm font-semibold text-alpine">{fmtDate(checkOut)}</p>
              ) : (
                <p className="text-sm text-gray-400">{locale === 'de' ? 'Wählen' : 'Select'}</p>
              )}
            </div>
          </div>

          {/* Hint / nights summary */}
          <div className="text-center text-xs text-gray-500">
            {nights > 0 ? (
              <span className="font-medium text-alpine">
                {nights} {locale === 'de' ? (nights === 1 ? 'Nacht' : 'Nächte') : (nights === 1 ? 'night' : 'nights')}
              </span>
            ) : !checkIn ? (
              locale === 'de' ? 'Anreisedatum wählen' : 'Select check-in date'
            ) : (
              locale === 'de' ? 'Abreisedatum wählen' : 'Select check-out date'
            )}
          </div>

          {/* Calendar */}
          <Calendar
            checkIn={checkIn}
            checkOut={checkOut}
            bookedRanges={bookedRanges}
            onDayClick={handleDayClick}
            locale={locale}
          />

          {/* Range error */}
          {rangeError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-600">
              {locale === 'de'
                ? 'Dieser Zeitraum enthält bereits gebuchte Daten. Bitte wähle einen anderen Zeitraum.'
                : 'This period contains already booked dates. Please select a different range.'}
            </p>
          )}

          {/* Guests stepper */}
          <div>
            <label className={labelClass}>{t('guests')}</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-alpine hover:text-alpine disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="w-6 text-center text-lg font-semibold text-gray-800">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                disabled={guests >= maxGuests}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-alpine hover:text-alpine disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
              <span className="text-xs text-gray-400">max. {maxGuests}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" size="md" onClick={() => setStep(1)}>{t('back')}</Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => setStep(3)}
              disabled={!checkIn || !checkOut}
            >
              {t('next')}
            </Button>
          </div>
        </div>
      )}

      {/* ── Step 3: Contact ── */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="rounded-xl bg-alpine/5 px-4 py-3 text-xs text-alpine">
            <span className="font-semibold">{tRooms(`${roomSlug as 'einzelzimmer' | 'doppelzimmer' | 'mehrbettzimmer'}.name`)}</span>
            {' · '}
            {fmtDate(checkIn)} → {fmtDate(checkOut)}
            {nights > 0 && ` · ${nights} ${locale === 'de' ? (nights === 1 ? 'Nacht' : 'Nächte') : (nights === 1 ? 'night' : 'nights')}`}
          </div>

          <div>
            <label className={labelClass}>{t('name')}</label>
            <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t('email')}</label>
              <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('phone')}</label>
              <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{t('messageLabel')}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder={t('messagePlaceholder')}
              className={inputClass}
            />
          </div>
          {status === 'error' && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-600">{t('error')}</p>
          )}
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" size="md" onClick={() => setStep(2)}>{t('back')}</Button>
            <Button type="submit" variant="gold" size="md" className="flex-1" disabled={status === 'loading'}>
              {status === 'loading' ? <IconSpinner /> : t('submit')}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

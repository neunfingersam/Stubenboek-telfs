'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';

function IconMusic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  );
}

function IconMasks() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

function IconMountain() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M8.25 21V6.75L12 3l3.75 3.75V21M3.75 21L8.25 16.5M20.25 21l-4.5-4.5M12 12h.008v.008H12V12z" />
    </svg>
  );
}

function IconSki() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function IconBike() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function IconCity() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

type EventCard = {
  key: string;
  icon: React.ReactNode;
  badge: string;
  color: string;
  url: string;
};

const EVENTS: EventCard[] = [
  { key: 'volksschauspiele', icon: <IconMasks />, badge: '4. Jul – 29. Aug 2026', color: 'bg-alpine text-white', url: 'https://www.volksschauspiele.at/' },
  { key: 'festwochen', icon: <IconMusic />, badge: '24. Jul – 30. Aug 2026', color: 'bg-gold text-white', url: 'https://www.altemusik.at/' },
  { key: 'jazz', icon: <IconMusic />, badge: '30. Jul – 15. Aug 2026', color: 'bg-stone-700 text-white', url: 'https://www.tyrol.com/activities/events/all-events/outreach-music-festival' },
  { key: 'kitzbuhel', icon: <IconStar />, badge: '21. – 22. Aug 2026', color: 'bg-alpine text-white', url: 'https://kitzmusik.at/' },
];

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  hiking: <IconMountain />,
  skiing: <IconSki />,
  cycling: <IconBike />,
  innsbruck: <IconCity />,
};

export default function LocalEvents() {
  const t = useTranslations('events');
  const activityKeys = ['hiking', 'skiing', 'cycling', 'innsbruck'] as const;

  return (
    <SectionWrapper id="events">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-serif text-4xl font-bold text-alpine md:text-5xl">
          {t('headline')}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-stone-500">{t('subline')}</p>
      </div>

      {/* Event flyer cards */}
      <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-stone-400">
        {t('eventsLabel')}
      </h3>
      <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTS.map((ev, i) => (
          <motion.a
            key={ev.key}
            href={ev.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Date badge */}
            <div className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold ${ev.color}`}>
              {ev.icon}
              <span>{ev.badge}</span>
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <p className="mb-1 font-semibold text-alpine leading-snug">{t(`${ev.key}.title`)}</p>
              <p className="text-xs leading-relaxed text-stone-400 mt-1">{t(`${ev.key}.location`)}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-500 flex-1">{t(`${ev.key}.desc`)}</p>
              <p className="mt-3 text-xs font-medium text-gold">{t('more')} →</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Activities */}
      <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-stone-400">
        {t('activitiesLabel')}
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {activityKeys.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
            className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="mt-0.5 flex-shrink-0 text-gold">{ACTIVITY_ICONS[key]}</div>
            <div>
              <p className="mb-1 font-semibold text-alpine text-sm">{t(`${key}.title`)}</p>
              <p className="text-xs leading-relaxed text-stone-500">{t(`${key}.desc`)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-stone-400">{t('hint')}</p>
    </SectionWrapper>
  );
}

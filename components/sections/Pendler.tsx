'use client';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 shrink-0 text-gold">
      {children}
    </svg>
  );
}

const ICONS = [
  // weekly/monthly rates
  <Svg key="calendar">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
  </Svg>,
  // kitchen
  <Svg key="fire">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </Svg>,
  // parking
  <Svg key="truck">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </Svg>,
  // wifi
  <Svg key="wifi">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
  </Svg>,
  // laundry
  <Svg key="laundry">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </Svg>,
  // quiet / sleep
  <Svg key="moon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </Svg>,
];

export default function Pendler() {
  const t = useTranslations('pendler');
  const features = t.raw('features') as string[];

  return (
    <SectionWrapper id="pendler" dark>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
          Berufspendler & Monteure
        </p>
        <h2 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
          {t('headline')}
        </h2>
        <p className="mb-12 text-lg text-white/70">{t('subline')}</p>
        <div className="mb-12 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              {ICONS[i]}
              <span className="text-sm text-white/80">{f}</span>
            </div>
          ))}
        </div>
        <Button
          variant="gold"
          size="lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {t('cta')}
        </Button>
      </div>
    </SectionWrapper>
  );
}

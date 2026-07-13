'use client';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

const ICONS = ['📅', '🍳', '🚗', '📶', '🧺', '🌙'];

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
              <span className="text-2xl">{ICONS[i]}</span>
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

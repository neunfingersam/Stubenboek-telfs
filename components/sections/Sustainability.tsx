import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function Sustainability() {
  const t = useTranslations('sustainability');

  return (
    <SectionWrapper id="sustainability" dark>
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-6 inline-block text-5xl">🌿</span>
        <h2 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl">
          {t('headline')}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-white/75">{t('text')}</p>
        <blockquote className="font-serif text-2xl font-bold italic text-gold">
          &ldquo;{t('quote')}&rdquo;
        </blockquote>
      </div>
    </SectionWrapper>
  );
}

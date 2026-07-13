import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function Welcome() {
  const t = useTranslations('welcome');

  return (
    <SectionWrapper id="welcome">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
            Willkommen
          </p>
          <h2 className="mb-6 font-serif text-4xl font-bold text-alpine md:text-5xl">
            {t('headline')}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">{t('text')}</p>
          <div className="flex flex-wrap gap-3">
            {(['badge1', 'badge2', 'badge3'] as const).map((b) => (
              <span
                key={b}
                className="rounded-full border border-alpine/20 bg-alpine/5 px-4 py-2 text-sm font-medium text-alpine"
              >
                {t(b)}
              </span>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gold">★★★★★</span>
            {t('rating')}
          </p>
        </div>
        <div className="relative h-80 overflow-hidden rounded-2xl shadow-2xl md:h-[500px]">
          <Image
            src="https://www.stubenboeck-telfs.com/images/willkommen/bildergalerie/01_haus-stubenboeck_familie.jpg"
            alt="Familie Stubenböck"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

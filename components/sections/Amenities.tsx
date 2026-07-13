import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

const AMENITIES = [
  { key: 'parking', icon: '🚗' },
  { key: 'bike', icon: '🚲' },
  { key: 'kitchen', icon: '🍳' },
  { key: 'balcony', icon: '🌿' },
  { key: 'wifi', icon: '📶' },
  { key: 'breakfast', icon: '☕' },
  { key: 'welcomecard', icon: '🎫' },
  { key: 'pets', icon: '🐾' },
];

export default function Amenities() {
  const t = useTranslations('amenities');

  return (
    <SectionWrapper id="amenities" className="bg-cream">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl font-bold text-alpine md:text-5xl">{t('headline')}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {AMENITIES.map(({ key, icon }) => (
          <div
            key={key}
            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm"
          >
            <span className="text-3xl">{icon}</span>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <span className="text-sm font-medium text-alpine">{t(key as any)}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function Directions() {
  const t = useTranslations('directions');

  return (
    <SectionWrapper id="directions" className="bg-white">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl font-bold text-alpine md:text-5xl">{t('headline')}</h2>
        <p className="mt-4 text-gray-500">{t('address')}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-cream p-6">
            <h3 className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-alpine">
              🚗 {t('bycar')}
            </h3>
            <p className="text-gray-600">{t('bycarText')}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-cream p-6">
            <h3 className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-alpine">
              🚌 {t('bytrain')}
            </h3>
            <p className="text-gray-600">{t('bytrainText')}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-cream p-6">
            <p className="flex items-center gap-2 font-medium text-alpine">🅿️ {t('parking')}</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2680.5!2d11.07451!3d47.30638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE4JzIyLjkiTiAxMcKwMDQnMjguMiJF!5e0!3m2!1sde!2sat!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

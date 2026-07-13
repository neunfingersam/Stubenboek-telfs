import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

function IconCar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function IconBus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function IconParking() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H10.5a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h.75V12h2.25a3 3 0 000-6zM3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z" />
    </svg>
  );
}

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
              <IconCar /> {t('bycar')}
            </h3>
            <p className="text-gray-600">{t('bycarText')}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-cream p-6">
            <h3 className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-alpine">
              <IconBus /> {t('bytrain')}
            </h3>
            <p className="text-gray-600">{t('bytrainText')}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-cream p-6">
            <p className="flex items-center gap-2 font-medium text-alpine">
              <IconParking /> {t('parking')}
            </p>
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

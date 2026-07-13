import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';
import BookingForm from '@/components/ui/BookingForm';

export default function BookingSection() {
  const t = useTranslations('booking');

  return (
    <SectionWrapper id="booking" className="bg-cream">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
            Reservierung
          </p>
          <h2 className="font-serif text-4xl font-bold text-alpine md:text-5xl">{t('headline')}</h2>
          <p className="mt-4 text-gray-500">{t('subline')}</p>
        </div>
        <BookingForm />
      </div>
    </SectionWrapper>
  );
}

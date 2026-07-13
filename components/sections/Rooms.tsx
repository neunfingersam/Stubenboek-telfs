'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

const ROOMS = [
  {
    slug: 'einzelzimmer',
    image: 'https://a0.muscache.com/im/pictures/51771867/d68d743c_original.jpg',
    price: 45,
    perPerson: false,
  },
  {
    slug: 'doppelzimmer',
    image: 'https://a0.muscache.com/im/pictures/77853472/4cc007cb_original.jpg',
    price: 65,
    perPerson: false,
  },
  {
    slug: 'mehrbettzimmer',
    image: 'https://a0.muscache.com/im/pictures/77853648/d23f70ad_original.jpg',
    price: 35,
    perPerson: true,
  },
];

export default function Rooms() {
  const t = useTranslations('rooms');

  const scrollToBooking = (slug: string) => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    // Dispatch event so BookingForm can pre-select the room
    window.dispatchEvent(new CustomEvent('selectRoom', { detail: slug }));
  };

  return (
    <SectionWrapper id="rooms" className="bg-white">
      <div className="mb-16 text-center">
        <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
          Unterkunft
        </p>
        <h2 className="font-serif text-4xl font-bold text-alpine md:text-5xl">{t('headline')}</h2>
        <p className="mt-4 text-lg text-gray-500">{t('subline')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {ROOMS.map((room) => {
          const key = room.slug as 'einzelzimmer' | 'doppelzimmer' | 'mehrbettzimmer';
          const features = t.raw(`${key}.features`) as string[];

          return (
            <div
              key={room.slug}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={room.image}
                  alt={t(`${key}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-serif text-2xl font-bold text-alpine">
                  {t(`${key}.name`)}
                </h3>
                <p className="mb-4 text-sm text-gray-500">{t(`${key}.desc`)}</p>
                <ul className="mb-6 space-y-1">
                  {features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-400">{t('from')} </span>
                    <span className="font-serif text-3xl font-bold text-alpine">{room.price}€</span>
                    <span className="text-sm text-gray-400">
                      {room.perPerson ? t('perPerson') : t('perNight')}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => scrollToBooking(room.slug)}>
                    {t('checkAvailability')}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

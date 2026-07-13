'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Lightbox from '@/components/ui/Lightbox';

const BASE = 'https://www.stubenboeck-telfs.com/images/willkommen/bildergalerie';
const GALLERY_IMAGES = [
  `${BASE}/00_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/02_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/04_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/05_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/06_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/09_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/10_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/11_haus-stubenboeck_telfs_bildergalerie.jpg`,
  `${BASE}/12_haus-stubenboeck_telfs_bildergalerie.jpg`,
  'https://a0.muscache.com/im/pictures/51972121/4fa01043_original.jpg',
  'https://a0.muscache.com/im/pictures/77853472/4cc007cb_original.jpg',
  'https://a0.muscache.com/im/pictures/77853648/d23f70ad_original.jpg',
].map((src, i) => ({ src, alt: `Haus Stubenböck ${i + 1}` }));

export default function Gallery() {
  const t = useTranslations('gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="gallery" className="bg-white">
      <div className="mb-12 text-center">
        <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold">
          {t('subline')}
        </p>
        <h2 className="font-serif text-4xl font-bold text-alpine md:text-5xl">{t('headline')}</h2>
      </div>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            className="mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
          onNext={() => setLightboxIndex((i) => (i! + 1) % GALLERY_IMAGES.length)}
        />
      )}
    </SectionWrapper>
  );
}

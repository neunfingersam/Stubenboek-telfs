'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

const SLIDES = [
  {
    src: 'https://www.stubenboeck-telfs.com/images/willkommen/bildergalerie/00_haus-stubenboeck_telfs_bildergalerie.jpg',
    alt: 'Haus Stubenböck Außenansicht',
  },
  {
    src: 'https://www.stubenboeck-telfs.com/images/willkommen/bildergalerie/02_haus-stubenboeck_telfs_bildergalerie.jpg',
    alt: 'Zimmer',
  },
  {
    src: 'https://www.stubenboeck-telfs.com/images/willkommen/bildergalerie/04_haus-stubenboeck_telfs_bildergalerie.jpg',
    alt: 'Haus Stubenböck',
  },
  {
    src: 'https://a0.muscache.com/im/pictures/51972121/4fa01043_original.jpg',
    alt: 'Cosy room',
  },
];

export default function Hero() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-alpine/60 via-alpine/30 to-alpine/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="mb-4 font-sans text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Telfs · Tirol · Österreich
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {t('headline')}
          </h1>
          <p className="mb-10 font-sans text-lg text-white/80 md:text-xl">
            {t('subline')}
          </p>
          <Button
            variant="gold"
            size="lg"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('cta')}
          </Button>
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-gold' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

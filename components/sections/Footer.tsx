import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-alpine px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-2xl font-bold">Haus Stubenböck</p>
            <p className="mt-1 text-sm text-white/60">{t('tagline')}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <a href="#rooms" className="hover:text-gold">
              Zimmer
            </a>
            <a href="#gallery" className="hover:text-gold">
              Galerie
            </a>
            <a href="#booking" className="hover:text-gold">
              Buchen
            </a>
            <a href="#contact" className="hover:text-gold">
              Kontakt
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:justify-between">
          <p>{t('copyright')}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              {t('imprint')}
            </Link>
            <Link href="#" className="hover:text-white">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

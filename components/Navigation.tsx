'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#rooms', label: t('rooms') },
    { href: '#gallery', label: t('gallery') },
    { href: '#sustainability', label: t('sustainability') },
    { href: '#directions', label: t('directions') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-alpine/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-serif text-xl font-bold text-white">
          Haus Stubenböck
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right: lang switcher + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex gap-2 text-sm text-white/70">
            <Link
              href="/de"
              className={cn(locale === 'de' && 'font-bold text-gold')}
            >
              DE
            </Link>
            <span>/</span>
            <Link
              href="/en"
              className={cn(locale === 'en' && 'font-bold text-gold')}
            >
              EN
            </Link>
          </div>
          <Button variant="gold" size="sm" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('book')}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-alpine/98 px-4 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-white/90 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex gap-4">
            <Link href="/de" className={cn('text-white/70 text-sm', locale === 'de' && 'text-gold font-bold')}>DE</Link>
            <Link href="/en" className={cn('text-white/70 text-sm', locale === 'en' && 'text-gold font-bold')}>EN</Link>
          </div>
          <Button variant="gold" size="sm" className="mt-4 w-full" onClick={() => { setOpen(false); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t('book')}
          </Button>
        </div>
      )}
    </nav>
  );
}

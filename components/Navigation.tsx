'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (open) setOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: '#rooms', label: t('rooms') },
    { href: '#gallery', label: t('gallery') },
    { href: '#sustainability', label: t('sustainability') },
    { href: '#events', label: t('events') },
    { href: '#directions', label: t('directions') },
    { href: '#contact', label: t('contact') },
  ];

  // Strip hash from URL on load so refreshing doesn't jump to a section
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace('#', '');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, open ? 300 : 0);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || open ? 'bg-alpine shadow-lg' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-serif text-lg font-bold text-white sm:text-xl"
            onClick={() => setOpen(false)}
          >
            Haus Stubenböck
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href)}
                className="text-sm font-medium text-white/80 transition hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop right: lang + CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex gap-2 text-sm text-white/70">
              <Link href="/de" className={cn('transition hover:text-white', locale === 'de' && 'font-bold text-gold')}>DE</Link>
              <span>/</span>
              <Link href="/en" className={cn('transition hover:text-white', locale === 'en' && 'font-bold text-gold')}>EN</Link>
            </div>
            <Button
              variant="gold"
              size="sm"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('book')}
            </Button>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu — animated slide-down */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="px-4 pb-6 pt-2">
                {/* Nav links */}
                <div className="mb-5 space-y-0.5">
                  {links.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      className="flex items-center rounded-xl px-3 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-gold"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </div>

                {/* Divider + lang + CTA */}
                <div className="border-t border-white/10 pt-5">
                  <div className="mb-4 flex items-center gap-3">
                    <Link
                      href="/de"
                      onClick={() => setOpen(false)}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-sm transition',
                        locale === 'de'
                          ? 'bg-gold/20 font-bold text-gold'
                          : 'text-white/60 hover:text-white'
                      )}
                    >
                      Deutsch
                    </Link>
                    <span className="text-white/20">|</span>
                    <Link
                      href="/en"
                      onClick={() => setOpen(false)}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-sm transition',
                        locale === 'en'
                          ? 'bg-gold/20 font-bold text-gold'
                          : 'text-white/60 hover:text-white'
                      )}
                    >
                      English
                    </Link>
                  </div>
                  <Button
                    variant="gold"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 300);
                    }}
                  >
                    {t('book')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

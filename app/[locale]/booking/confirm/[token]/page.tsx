'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mb-6 h-16 w-16 text-alpine">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mb-6 h-16 w-16 text-amber-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

export default function ConfirmPage() {
  const t = useTranslations('confirm');
  const searchParams = useSearchParams();
  const already = searchParams.get('already') === '1';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <div className="max-w-md">
        <div className="flex justify-center">
          {already ? <IconWarning /> : <IconCheckCircle />}
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold text-alpine">
          {already ? t('alreadyHandled') : t('headline')}
        </h1>
        {!already && <p className="mb-8 text-gray-600">{t('text')}</p>}
        <Link href="/de" className="text-gold underline">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}

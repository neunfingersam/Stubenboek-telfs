'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function IconXCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mb-6 h-16 w-16 text-red-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

export default function RejectPage() {
  const t = useTranslations('reject');
  const searchParams = useSearchParams();
  const already = searchParams.get('already') === '1';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <div className="max-w-md">
        <div className="flex justify-center">
          {already ? <IconWarning /> : <IconXCircle />}
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

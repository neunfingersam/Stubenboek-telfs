'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RejectPage() {
  const t = useTranslations('reject');
  const searchParams = useSearchParams();
  const already = searchParams.get('already') === '1';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <div className="max-w-md">
        <div className="mb-6 text-6xl">{already ? '⚠️' : '🚫'}</div>
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

import Link from 'next/link';

export default function RejectPage({
  searchParams,
}: {
  searchParams: { already?: string };
}) {
  const already = searchParams.already === '1';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <div className="max-w-md">
        <div className="mb-6 text-6xl">{already ? '!' : 'X'}</div>
        <h1 className="mb-4 font-serif text-3xl font-bold text-alpine">
          {already
            ? 'Diese Buchung wurde bereits bearbeitet.'
            : 'Buchungsanfrage abgelehnt.'}
        </h1>
        {!already && (
          <p className="mb-8 text-gray-600">
            Der Gast wurde per E-Mail uber die Absage informiert.
          </p>
        )}
        <Link href="/de" className="text-gold underline">
          Zuruck zur Startseite
        </Link>
      </div>
    </main>
  );
}

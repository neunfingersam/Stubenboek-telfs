import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function AdminRejectPage({
  params,
  searchParams,
}: {
  params: { id: string; locale: string };
  searchParams: { token?: string };
}) {
  const booking = await prisma.booking.findFirst({
    where: { id: Number(params.id), token: searchParams.token ?? '' },
    include: { room: true },
  });

  if (!booking) return notFound();

  const already = booking.status !== 'PENDING';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="font-serif text-3xl font-bold text-alpine mb-6">
          {already ? 'Bereits bearbeitet' : 'Buchung ablehnen?'}
        </h1>
        {!already && (
          <>
            <div className="mb-6 space-y-2 text-gray-600">
              <p><strong>Gast:</strong> {booking.guestName}</p>
              <p><strong>Zimmer:</strong> {booking.room.name}</p>
              <p><strong>Anreise:</strong> {booking.checkIn.toLocaleDateString('de-AT')}</p>
              <p><strong>Abreise:</strong> {booking.checkOut.toLocaleDateString('de-AT')}</p>
            </div>
            <form action={`/api/bookings/${booking.id}/reject?token=${booking.token}`} method="POST">
              <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition">
                Buchung ablehnen
              </button>
            </form>
          </>
        )}
        {already && (
          <p className="text-gray-500">Diese Buchung wurde bereits bearbeitet (Status: {booking.status}).</p>
        )}
      </div>
    </main>
  );
}

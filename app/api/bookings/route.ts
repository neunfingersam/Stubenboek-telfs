import { NextRequest, NextResponse } from 'next/server';
import { getBookedRanges, createBooking } from '@/lib/booking';
import { sendBookingRequestEmails } from '@/lib/email';

export async function GET(request: NextRequest) {
  const roomSlug = request.nextUrl.searchParams.get('roomSlug');
  if (!roomSlug) {
    return NextResponse.json({ error: 'roomSlug required' }, { status: 400 });
  }
  const bookedRanges = await getBookedRanges(roomSlug);
  return NextResponse.json({ bookedRanges });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomSlug, checkIn, checkOut, guestName, guestEmail, guestPhone, message } = body;

    if (!roomSlug || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json({ error: 'Invalid dates' }, { status: 400 });
    }
    if (checkInDate >= checkOutDate) {
      return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 });
    }
    if (checkInDate < new Date()) {
      return NextResponse.json({ error: 'Check-in cannot be in the past' }, { status: 400 });
    }

    const booking = await createBooking({
      roomSlug,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: body.guests ?? 1,
      guestName,
      guestEmail,
      guestPhone,
      message,
    });

    await sendBookingRequestEmails(booking);

    return NextResponse.json({ id: booking.id, status: booking.status });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Room not available for selected dates') {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

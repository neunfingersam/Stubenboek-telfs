import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendBookingConfirmedEmail } from '@/lib/email';

async function handleConfirm(request: NextRequest, id: string) {
  const token = request.nextUrl.searchParams.get('token');
  const booking = await prisma.booking.findFirst({
    where: { id: Number(id), token: token ?? '' },
    include: { room: true },
  });

  if (!booking) {
    return NextResponse.redirect(new URL('/de', request.url));
  }

  if (booking.status !== 'PENDING') {
    return NextResponse.redirect(new URL(`/de/booking/confirm/${booking.token}?already=1`, request.url));
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: { status: 'CONFIRMED' },
  });

  await sendBookingConfirmedEmail(booking);

  return NextResponse.redirect(new URL(`/de/booking/confirm/${booking.token}`, request.url));
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handleConfirm(request, params.id);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return handleConfirm(request, params.id);
}

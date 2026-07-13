import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendBookingRejectedEmail } from '@/lib/email';

async function handleReject(request: NextRequest, id: string) {
  const token = request.nextUrl.searchParams.get('token');
  const booking = await prisma.booking.findFirst({
    where: { id: Number(id), token: token ?? '' },
    include: { room: true },
  });

  if (!booking) {
    return NextResponse.redirect(new URL('/de', request.url));
  }

  if (booking.status !== 'PENDING') {
    return NextResponse.redirect(new URL(`/de/booking/reject/${booking.token}?already=1`, request.url));
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: { status: 'REJECTED' },
  });

  await sendBookingRejectedEmail(booking);

  return NextResponse.redirect(new URL(`/de/booking/reject/${booking.token}`, request.url));
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handleReject(request, params.id);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return handleReject(request, params.id);
}

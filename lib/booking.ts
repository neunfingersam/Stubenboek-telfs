import { prisma } from './db';
import { generateToken } from './tokens';

export async function getBookedRanges(roomSlug: string) {
  const room = await prisma.room.findUnique({ where: { slug: roomSlug } });
  if (!room) return [];

  const bookings = await prisma.booking.findMany({
    where: {
      roomId: room.id,
      status: { in: ['PENDING', 'CONFIRMED'] },
      checkOut: { gte: new Date() },
    },
    select: { checkIn: true, checkOut: true },
  });

  return bookings.map((b) => ({
    checkIn: b.checkIn.toISOString(),
    checkOut: b.checkOut.toISOString(),
  }));
}

export async function createBooking(data: {
  roomSlug: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  message?: string;
}) {
  const room = await prisma.room.findUnique({ where: { slug: data.roomSlug } });
  if (!room) throw new Error('Room not found');

  // Check for conflicts with CONFIRMED bookings only
  const conflict = await prisma.booking.findFirst({
    where: {
      roomId: room.id,
      status: 'CONFIRMED',
      AND: [
        { checkIn: { lt: data.checkOut } },
        { checkOut: { gt: data.checkIn } },
      ],
    },
  });
  if (conflict) throw new Error('Room not available for selected dates');

  const token = generateToken();

  return prisma.booking.create({
    data: {
      roomId: room.id,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests ?? 1,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      message: data.message,
      status: 'PENDING',
      token,
    },
    include: { room: true },
  });
}

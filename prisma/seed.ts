import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  const rooms = [
    { name: 'Einzelzimmer', slug: 'einzelzimmer', maxGuests: 1, pricePerNight: 45 },
    { name: 'Doppelzimmer', slug: 'doppelzimmer', maxGuests: 2, pricePerNight: 65 },
    { name: 'Mehrbettzimmer', slug: 'mehrbettzimmer', maxGuests: 4, pricePerNight: 35 },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: {},
      create: room,
    });
  }
  console.log('Seeded rooms');
}

main().finally(() => prisma.$disconnect());

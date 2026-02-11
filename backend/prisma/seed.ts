import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Status } from '@prisma/client';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in the environment.');
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  const batya = await prisma.user.upsert({
    where: { email: 'batya@example.com' },
    update: {},
    create: {
      email: 'batya@example.com',
      name: 'Batya',
    },
  });

  const ori = await prisma.user.upsert({
    where: { email: 'ori@example.com' },
    update: {},
    create: {
      email: 'ori@example.com',
      name: 'Ori',
    },
  });

  const featureA = await prisma.featureRequest.upsert({
    where: { id: 'feature-a' },
    update: {},
    create: {
      id: 'feature-a',
      title: 'Dark mode for dashboard',
      description: 'Add a dark theme toggle for the main dashboard.',
      userId: batya.id,
      status: Status.IN_PROGRESS,
    },
  });

  const featureB = await prisma.featureRequest.upsert({
    where: { id: 'feature-b' },
    update: {},
    create: {
      id: 'feature-b',
      title: 'Slack notifications',
      description: 'Send updates to a Slack channel when status changes.',
      userId: ori.id,
      status: Status.COMPLETED,
      completedAt: new Date(),
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        content: 'Great idea, would be very helpful.',
        userId: ori.id,
        featureRequestId: featureA.id,
      },
      {
        content: 'We need webhooks too!',
        userId: batya.id,
        featureRequestId: featureB.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.vote.upsert({
    where: {
      userId_featureRequestId: {
        userId: batya.id,
        featureRequestId: featureA.id,
      },
    },
    update: {},
    create: {
      userId: batya.id,
      featureRequestId: featureA.id,
    },
  });

  await prisma.vote.upsert({
    where: {
      userId_featureRequestId: {
        userId: ori.id,
        featureRequestId: featureA.id,
      },
    },
    update: {},
    create: {
      userId: ori.id,
      featureRequestId: featureA.id,
    },
  });
  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

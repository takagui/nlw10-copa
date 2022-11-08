import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Dow',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/takagui.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-12-05T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountyCode: 'BR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-12-07T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountyCode: 'AR',

      guesses: {
        create: {
          firstTemPoints: 2,
          secondTemPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();

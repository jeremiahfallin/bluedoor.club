/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { brawlhalla, chess, rocketLeague } from './schedules';

const prisma = new PrismaClient();

async function main() {
  const brawlhallaTeamsSet = new Set();
  const chessTeamsSet = new Set();
  const rocketLeagueTeamsSet = new Set();
  brawlhalla.forEach((match) => {
    brawlhallaTeamsSet.add(match.blue);
    brawlhallaTeamsSet.add(match.red);
  });
  chess.forEach((match) => {
    chessTeamsSet.add(match.blue);
    chessTeamsSet.add(match.red);
  });
  rocketLeague.forEach((match) => {
    rocketLeagueTeamsSet.add(match.blue);
    rocketLeagueTeamsSet.add(match.red);
  });
  const brawlhallaTeams = [...brawlhallaTeamsSet] as string[];
  const chessTeams = [...chessTeamsSet] as string[];
  const rocketLeagueTeams = [...rocketLeagueTeamsSet] as string[];
  await prisma.league.upsert({
    where: {
      slug: 'brawlhalla-spring-2023',
    },
    create: {
      name: 'Brawlhalla',
      slug: 'brawlhalla-spring-2023',
      game: {
        connectOrCreate: {
          where: {
            name: 'Brawlhalla',
          },
          create: {
            name: 'Brawlhalla',
            slug: 'brawlhalla',
          },
        },
      },
      teams: {
        connectOrCreate: brawlhallaTeams.map((team) => ({
          where: {
            slug: team.toLowerCase().replace(/ /g, '-'),
          },
          create: {
            name: team,
            slug: team.toLowerCase().replace(/ /g, '-'),
          },
        })),
      },
      matches: {
        create: brawlhalla.map((match) => ({
          blueTeam: {
            connect: {
              slug: match.blue.toLowerCase().replace(/ /g, '-'),
            },
          },
          redTeam: {
            connect: {
              slug: match.red.toLowerCase().replace(/ /g, '-'),
            },
          },
          date: match.time,
        })),
      },
    },
    update: {},
  });
  await prisma.league.upsert({
    where: {
      slug: 'chess-spring-2023',
    },
    create: {
      name: 'Chess',
      slug: 'chess-spring-2023',
      game: {
        connectOrCreate: {
          where: {
            name: 'Chess',
          },
          create: {
            name: 'Chess',
            slug: 'chess',
          },
        },
      },
      teams: {
        connectOrCreate: chessTeams.map((team) => ({
          where: {
            slug: team.toLowerCase().replace(/ /g, '-'),
          },
          create: {
            name: team,
            slug: team.toLowerCase().replace(/ /g, '-'),
          },
        })),
      },
      matches: {
        create: chess.map((match) => ({
          blueTeam: {
            connect: {
              slug: match.blue.toLowerCase().replace(/ /g, '-'),
            },
          },
          redTeam: {
            connect: {
              slug: match.red.toLowerCase().replace(/ /g, '-'),
            },
          },
          date: match.time,
        })),
      },
    },
    update: {},
  });
  await prisma.league.upsert({
    where: {
      slug: 'rocket-league-spring-2023',
    },
    create: {
      name: 'Rocket League',
      slug: 'rocket-league-spring-2023',
      game: {
        connectOrCreate: {
          where: {
            name: 'Rocket League',
          },
          create: {
            name: 'Rocket League',
            slug: 'rocket-league',
          },
        },
      },
      teams: {
        connectOrCreate: rocketLeagueTeams.map((team) => ({
          where: {
            slug: team.toLowerCase().replace(/ /g, '-'),
          },
          create: {
            name: team,
            slug: team.toLowerCase().replace(/ /g, '-'),
          },
        })),
      },
      matches: {
        create: rocketLeague.map((match) => ({
          blueTeam: {
            connect: {
              slug: match.blue.toLowerCase().replace(/ /g, '-'),
            },
          },
          redTeam: {
            connect: {
              slug: match.red.toLowerCase().replace(/ /g, '-'),
            },
          },
          date: match.time,
        })),
      },
    },
    update: {},
  });
  await prisma.game.upsert({
    where: {
      slug: 'ssbu',
    },
    create: {
      name: 'Super Smash Bros. Ultimate',
      slug: 'ssbu',
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { brawlhalla, chess, rocketLeague } from './schedules';

const prisma = new PrismaClient();

async function main() {
  // const brawlhallaTeamsSet = new Set();
  // const chessTeamsSet = new Set();
  // const rocketLeagueTeamsSet = new Set();
  // brawlhalla.forEach((match) => {
  //   brawlhallaTeamsSet.add(match.blue);
  //   brawlhallaTeamsSet.add(match.red);
  // });
  // chess.forEach((match) => {
  //   chessTeamsSet.add(match.blue);
  //   chessTeamsSet.add(match.red);
  // });
  // rocketLeague.forEach((match) => {
  //   rocketLeagueTeamsSet.add(match.blue);
  //   rocketLeagueTeamsSet.add(match.red);
  // });
  // const brawlhallaTeams = [...brawlhallaTeamsSet] as string[];
  // const chessTeams = [...chessTeamsSet] as string[];
  // const rocketLeagueTeams = [...rocketLeagueTeamsSet] as string[];
  // const brawlhallaSpring = await prisma.league.create({
  //   data: {
  //     name: 'Brawlhalla',
  //     slug: 'brawlhalla-spring-2023',
  //     game: {
  //       connectOrCreate: {
  //         where: {
  //           name: 'Brawlhalla',
  //         },
  //         create: {
  //           name: 'Brawlhalla',
  //           slug: 'brawlhalla',
  //         },
  //       },
  //     },
  //     teams: {
  //       create: brawlhallaTeams.map((team) => ({
  //         name: team,
  //         slug: team.toLowerCase().replace(/ /g, '-'),
  //       })),
  //     },
  //   },
  //   include: {
  //     teams: true,
  //   },
  // });
  // const chessSpring = await prisma.league.create({
  //   data: {
  //     name: 'Chess',
  //     slug: 'chess-spring-2023',
  //     game: {
  //       connectOrCreate: {
  //         where: {
  //           name: 'Chess',
  //         },
  //         create: {
  //           name: 'Chess',
  //           slug: 'chess',
  //         },
  //       },
  //     },
  //     teams: {
  //       create: chessTeams.map((team) => ({
  //         name: team,
  //         slug: team.toLowerCase().replace(/ /g, '-'),
  //       })),
  //     },
  //   },
  // });
  // const rocketLeagueSpring = await prisma.league.create({
  //   data: {
  //     name: 'Rocket League',
  //     slug: 'rocket-league-spring-2023',
  //     game: {
  //       connectOrCreate: {
  //         where: {
  //           name: 'Rocket League',
  //         },
  //         create: {
  //           name: 'Rocket League',
  //           slug: 'rocket-league',
  //         },
  //       },
  //     },
  //     teams: {
  //       create: rocketLeagueTeams.map((team) => ({
  //         name: team,
  //         slug: team.toLowerCase().replace(/ /g, '-'),
  //       })),
  //     },
  //   },
  // });
  // await prisma.game.upsert({
  //   where: {
  //     slug: 'ssbu',
  //   },
  //   create: {
  //     name: 'Super Smash Bros. Ultimate',
  //     slug: 'ssbu',
  //   },
  //   update: {},
  // });
  // const brawlhallaMatchData = brawlhalla.map((match) => {
  //   return {
  //     leagueId: brawlhallaSpring.id,
  //     date: match.time,
  //     blueTeam: match.blue,
  //     redTeam: match.red,
  //   };
  // });
  // await prisma.match.createMany({
  // })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

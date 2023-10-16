/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { brawlhalla, chess, rocketLeague } from './schedules';

const prisma = new PrismaClient();

const matches = [
  {
    week: 1,
    teamA: 'Boyd Bears',
    teamB: 'San G Stampede',
    time: '2023-10-19T23:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Oregon Riptides',
    teamB: 'BGC Morgan',
    time: '2023-10-20T22:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Mystyx Sword',
    teamB: 'Port Angeles Ferrets',
    time: '2023-10-16T23:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Frisco Boys & Girls Club',
    teamB: 'San Antonio Sky Crashers',
    time: '2023-10-18T22:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Carlson Kraken',
    teamB: 'Westside Warriors',
    time: '2023-10-19T23:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'BGC Pasadena Cats',
    teamB: 'JamesBGC',
    time: '2023-10-16T23:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Port Angeles Plussers',
    teamB: 'Mystyx Shield',
    time: '2023-10-16T23:30:00.000Z',
  },
  {
    week: 1,
    teamA: 'Plano Boys & Girls Club',
    teamB: 'Uplift Wisdom Boys & Girls Club',
    time: '2023-10-17T22:30:00.000Z',
  },
  {
    week: 1,
    teamA: 'Hammond',
    teamB: 'Sierra Vista Strikers',
    time: '2023-10-18T22:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'West Dallas Boys & Girls Club',
    teamB: 'Watertown Warriors',
    time: '2023-10-18T21:30:00.000Z',
  },
  {
    week: 1,
    teamA: 'JWA Gary Aviators',
    teamB: 'Team KAWS',
    time: '2023-10-18T21:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Sierra Vista Clobber Knockers',
    teamB: 'Emerald Valley',
    time: '2023-10-18T22:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'Rogue Valley Reapers',
    teamB: 'SoHi Kings',
    time: '2023-10-18T23:30:00.000Z',
  },
  {
    week: 1,
    teamA: 'BGC Blaze',
    teamB: 'Rogue Valley Cavemen',
    time: '2023-10-17T23:00:00.000Z',
  },
  {
    week: 1,
    teamA: 'JWA Platinum Squad',
    teamB: 'McConnell Jets',
    time: '2023-10-17T21:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Mystyx Shield',
    teamB: 'Sierra Vista Clobber Knockers',
    time: '2023-10-25T22:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Rogue Valley Cavemen',
    teamB: 'SoHi Kings',
    time: '2023-10-26T23:30:00.000Z',
  },
  {
    week: 2,
    teamA: 'JWA Gary Aviators',
    teamB: 'JWA Platinum Squad',
    time: '2023-10-23T19:30:00.000Z',
  },
  {
    week: 2,
    teamA: 'Carlson Kraken',
    teamB: 'San G Stampede',
    time: '2023-10-26T23:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'BGC Morgan',
    teamB: 'Hammond',
    time: '2023-10-27T21:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'West Dallas Boys & Girls Club',
    teamB: 'Uplift Wisdom Boys & Girls Club',
    time: '2023-10-25T21:30:00.000Z',
  },
  {
    week: 2,
    teamA: 'Port Angeles Plussers',
    teamB: 'Westside Warriors',
    time: '2023-10-24T23:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'BGC Blaze',
    teamB: 'San Antonio Sky Crashers',
    time: '2023-10-26T23:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Boyd Bears',
    teamB: 'Port Angeles Ferrets',
    time: '2023-10-23T23:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'BGC Pasadena Cats',
    teamB: 'Watertown Warriors',
    time: '2023-10-23T23:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Oregon Riptides',
    teamB: 'Emerald Valley',
    time: '2023-10-24T23:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Frisco Boys & Girls Club',
    teamB: 'Team KAWS',
    time: '2023-10-25T22:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Rogue Valley Reapers',
    teamB: 'JamesBGC',
    time: '2023-10-25T23:15:00.000Z',
  },
  {
    week: 2,
    teamA: 'McConnell Jets',
    teamB: 'Sierra Vista Strikers',
    time: '2023-10-25T22:00:00.000Z',
  },
  {
    week: 2,
    teamA: 'Plano Boys & Girls Club',
    teamB: 'Mystyx Sword',
    time: '2023-10-24T22:30:00.000Z',
  },
  {
    week: 3,
    teamA: 'Rogue Valley Reapers',
    teamB: 'Sierra Vista Clobber Knockers',
    time: '2023-11-01T23:15:00.000Z',
  },
  {
    week: 3,
    teamA: 'Boyd Bears',
    teamB: 'Westside Warriors',
    time: '2023-11-02T23:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'Hammond',
    teamB: 'West Dallas Boys & Girls Club',
    time: '2023-10-31T21:30:00.000Z',
  },
  {
    week: 3,
    teamA: 'JWA Platinum Squad',
    teamB: 'San Antonio Sky Crashers',
    time: '2023-10-31T21:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'BGC Blaze',
    teamB: 'Emerald Valley',
    time: '2023-10-31T23:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'Frisco Boys & Girls Club',
    teamB: 'Sierra Vista Strikers',
    time: '2023-11-01T22:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'Mystyx Sword',
    teamB: 'JamesBGC',
    time: '2023-10-30T23:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'Oregon Riptides',
    teamB: 'Rogue Valley Cavemen',
    time: '2023-10-31T23:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'San G Stampede',
    teamB: 'SoHi Kings',
    time: '2023-11-02T23:30:00.000Z',
  },
  {
    week: 3,
    teamA: 'Plano Boys & Girls Club',
    teamB: 'Port Angeles Plussers',
    time: '2023-10-31T22:30:00.000Z',
  },
  {
    week: 3,
    teamA: 'BGC Morgan',
    teamB: 'McConnell Jets',
    time: '2023-11-03T21:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'Carlson Kraken',
    teamB: 'Port Angeles Ferrets',
    time: '2023-10-30T23:00:00.000Z',
  },
  {
    week: 3,
    teamA: 'BGC Pasadena Cats',
    teamB: 'Mystyx Shield',
    time: '2023-10-30T23:30:00.000Z',
  },
  {
    week: 3,
    teamA: 'Uplift Wisdom Boys & Girls Club',
    teamB: 'Watertown Warriors',
    time: '2023-11-01T21:30:00.000Z',
  },
  {
    week: 3,
    teamA: 'JWA Gary Aviators',
    teamB: 'Team KAWS',
    time: '2023-11-01T21:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'BGC Morgan',
    teamB: 'McConnell Jets',
    time: '2023-11-10T21:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'BGC Blaze',
    teamB: 'Emerald Valley',
    time: '2023-11-07T23:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Boyd Bears',
    teamB: 'Mystyx Shield',
    time: '2023-11-06T23:30:00.000Z',
  },
  {
    week: 4,
    teamA: 'Carlson Kraken',
    teamB: 'San G Stampede',
    time: '2023-11-09T23:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Rogue Valley Reapers',
    teamB: 'Sierra Vista Clobber Knockers',
    time: '2023-11-08T23:15:00.000Z',
  },
  {
    week: 4,
    teamA: 'Plano Boys & Girls Club',
    teamB: 'San Antonio Sky Crashers',
    time: '2023-11-07T22:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Port Angeles Ferrets',
    teamB: 'Watertown Warriors',
    time: '2023-11-06T23:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Frisco Boys & Girls Club',
    teamB: 'Sierra Vista Strikers',
    time: '2023-11-08T22:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Rogue Valley Cavemen',
    teamB: 'Westside Warriors',
    time: '2023-11-07T23:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Oregon Riptides',
    teamB: 'Mystyx Sword',
    time: '2023-11-07T23:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'Port Angeles Plussers',
    teamB: 'SoHi Kings',
    time: '2023-11-06T23:30:00.000Z',
  },
  {
    week: 4,
    teamA: 'BGC Pasadena Cats',
    teamB: 'JamesBGC',
    time: '2023-11-06T23:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'JWA Gary Aviators',
    teamB: 'Hammond',
    time: '2023-11-06T19:30:00.000Z',
  },
  {
    week: 4,
    teamA: 'JWA Platinum Squad',
    teamB: 'Team KAWS',
    time: '2023-11-08T21:00:00.000Z',
  },
  {
    week: 4,
    teamA: 'West Dallas Boys & Girls Club',
    teamB: 'Uplift Wisdom Boys & Girls Club',
    time: '2023-11-08T21:30:00.000Z',
  },
  {
    week: 5,
    teamA: 'BGC Blaze',
    teamB: 'Carlson Kraken',
    time: '2023-11-17T00:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'Rogue Valley Cavemen',
    teamB: 'Emerald Valley',
    time: '2023-11-15T00:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'Plano Boys & Girls Club',
    teamB: 'Uplift Wisdom Boys & Girls Club',
    time: '2023-11-14T23:30:00.000Z',
  },
  {
    week: 5,
    teamA: 'Oregon Riptides',
    teamB: 'Watertown Warriors',
    time: '2023-11-17T23:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'BGC Morgan',
    teamB: 'Hammond',
    time: '2023-11-17T22:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'Boyd Bears',
    teamB: 'San G Stampede',
    time: '2023-11-17T00:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'Mystyx Shield',
    teamB: 'JamesBGC',
    time: '2023-11-14T00:30:00.000Z',
  },
  {
    week: 5,
    teamA: 'JWA Gary Aviators',
    teamB: 'JWA Platinum Squad',
    time: '2023-11-13T20:30:00.000Z',
  },
  {
    week: 5,
    teamA: 'Rogue Valley Reapers',
    teamB: 'BGC Pasadena Cats',
    time: '2023-11-16T00:15:00.000Z',
  },
  {
    week: 5,
    teamA: 'Frisco Boys & Girls Club',
    teamB: 'McConnell Jets',
    time: '2023-11-15T23:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'Sierra Vista Strikers',
    teamB: 'Sierra Vista Clobber Knockers',
    time: '2023-11-15T23:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'West Dallas Boys & Girls Club',
    teamB: 'Team KAWS',
    time: '2023-11-15T22:30:00.000Z',
  },
  {
    week: 5,
    teamA: 'Westside Warriors',
    teamB: 'Port Angeles Ferrets',
    time: '2023-11-15T00:00:00.000Z',
  },
  {
    week: 5,
    teamA: 'Port Angeles Plussers',
    teamB: 'San Antonio Sky Crashers',
    time: '2023-11-14T23:30:00.000Z',
  },
  {
    week: 5,
    teamA: 'Mystyx Sword',
    teamB: 'SoHi Kings',
    time: '2023-11-14T00:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'Boyd Bears',
    teamB: 'SoHi Kings',
    time: '2023-11-21T00:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'JWA Platinum Squad',
    teamB: 'Hammond',
    time: '2023-11-20T20:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'BGC Morgan',
    teamB: 'Watertown Warriors',
    time: '2023-11-24T22:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'Oregon Riptides',
    teamB: 'JamesBGC',
    time: '2023-11-22T00:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'Rogue Valley Reapers',
    teamB: 'Westside Warriors',
    time: '2023-11-25T00:15:00.000Z',
  },
  {
    week: 6,
    teamA: 'JWA Gary Aviators',
    teamB: 'McConnell Jets',
    time: '2023-11-21T22:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'BGC Pasadena Cats',
    teamB: 'Port Angeles Ferrets',
    time: '2023-11-21T00:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'Plano Boys & Girls Club',
    teamB: 'Port Angeles Plussers',
    time: '2023-11-21T23:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'Sierra Vista Strikers',
    teamB: 'Team KAWS',
    time: '2023-11-22T23:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'BGC Blaze',
    teamB: 'San G Stampede',
    time: '2023-11-24T00:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'Frisco Boys & Girls Club',
    teamB: 'Sierra Vista Clobber Knockers',
    time: '2023-11-22T23:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'Carlson Kraken',
    teamB: 'Uplift Wisdom Boys & Girls Club',
    time: '2023-11-23T23:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'Mystyx Shield',
    teamB: 'Emerald Valley',
    time: '2023-11-22T00:00:00.000Z',
  },
  {
    week: 6,
    teamA: 'West Dallas Boys & Girls Club',
    teamB: 'San Antonio Sky Crashers',
    time: '2023-11-21T22:30:00.000Z',
  },
  {
    week: 6,
    teamA: 'Mystyx Sword',
    teamB: 'Rogue Valley Cavemen',
    time: '2023-11-22T00:00:00.000Z',
  },
];

async function main() {
  // for (const match of matches) {
  //   const teams = await prisma.team.findMany();
  //   const blueTeam = teams.find((team) => team.name === match.teamA);
  //   const redTeam = teams.find((team) => team.name === match.teamB);
  //   if (!blueTeam || !redTeam) {
  //     console.log(match);
  //     throw new Error('Team not found');
  //   }
  //   await prisma.match.create({
  //     data: {
  //       date: new Date(match.time),
  //       leagueId: '0e94d6b1-1435-4f76-be18-3cc1acd63c9d',
  //       blueTeamId: blueTeam.id,
  //       redTeamId: redTeam.id,
  //     },
  //   });
  // }
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

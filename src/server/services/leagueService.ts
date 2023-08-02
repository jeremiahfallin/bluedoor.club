import { PrismaClient, League } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllLeagues(): Promise<League[]> {
  return await prisma.league.findMany({
    include: {
      game: true,
    },
  });
}

export async function getUpcomingLeagues(): Promise<League[]> {
  return await prisma.league.findMany({
    where: {
      seasonStart: {
        gt: new Date(),
      },
    },
    include: {
      game: true,
    },
  });
}

export async function getLeagueById(id: string): Promise<League | null> {
  return await prisma.league.findUnique({
    where: { id },
    include: {
      game: true,
    },
  });
}

export async function getLeagueBySlug(slug: string): Promise<League | null> {
  return await prisma.league.findUnique({
    where: { slug },
    include: {
      game: true,
      matches: {
        include: {
          blueTeam: true,
          redTeam: true,
        },
        orderBy: {
          date: Prisma.SortOrder.asc,
        },
      },
    },
  });
}

export async function getTeamsByLeagueSlug(
  leagueSlug: string,
): Promise<LeagueWithTeams | null> {
  return await prisma.league.findUnique({
    where: { slug: leagueSlug },
    include: {
      teams: true,
    },
  });
}

export async function getLeagueByGameSlug(
  gameSlug: string,
): Promise<LeagueWithTeams[] | null> {
  return await prisma.league.findMany({
    where: { game: { slug: gameSlug } },
    include: {
      teams: true,
    },
  });
}

export async function createLeague(input: {
  name: string;
  gameId: string;
  seasonStart: Date;
  seasonEnd: Date;
}): Promise<League> {
  console.log(input);
  return await prisma.league.create({
    data: {
      name: input.name,
      slug: input.name.toLowerCase().replace(/ /g, '-'),
      seasonStart: input.seasonStart,
      seasonEnd: input.seasonEnd,
      game: {
        connect: {
          id: input.gameId,
        },
      },
    },
  });
}

export async function updateLeague(input: {
  id: string;
  name: string;
  seasonStart: string;
  seasonEnd: string;
}): Promise<League | null> {
  const { id, name, seasonStart, seasonEnd } = input;
  return await prisma.league.update({
    where: { id },
    data: {
      name,
      seasonStart: new Date(seasonStart),
      seasonEnd: new Date(seasonEnd),
    },
  });
}

export async function deleteLeague(id: string): Promise<void> {
  await prisma.league.delete({ where: { id } });
}

export async function joinLeague(input: {
  leagueId: string;
  teamName: string;
  clubId: string;
}): Promise<void> {
  await prisma.league.update({
    where: { id: input.leagueId },
    data: {
      teams: {
        create: {
          name: input.teamName,
          slug: input.teamName.toLowerCase().replace(/ /g, '-'),
          club: {
            connect: {
              id: input.clubId,
            },
          },
        },
      },
    },
  });
}

const leagueWithTeams = Prisma.validator<Prisma.LeagueArgs>()({
  include: { teams: true },
});
export type LeagueWithTeams = Prisma.LeagueGetPayload<typeof leagueWithTeams>;

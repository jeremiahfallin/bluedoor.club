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
): Promise<League | null> {
  return await prisma.league.findUnique({
    where: { slug: leagueSlug },
    include: {
      teams: true,
    },
  });
}

export async function createLeague(input: {
  name: string;
  gameId: string;
}): Promise<League> {
  return await prisma.league.create({
    data: {
      name: input.name,
      slug: input.name.toLowerCase().replace(/ /g, '-'),
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
}): Promise<League | null> {
  const { id, name } = input;
  return await prisma.league.update({ where: { id }, data: { name } });
}

export async function deleteLeague(id: string): Promise<void> {
  await prisma.league.delete({ where: { id } });
}

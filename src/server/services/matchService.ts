// src/server/services/matchService.ts
import { PrismaClient, Match, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMatches(): Promise<Match[]> {
  const matches = await prisma.match.findMany({
    include: {
      blueTeam: true,
      redTeam: true,
    },
  });

  return matches;
}

export async function getMatchById(id: string): Promise<Match | null> {
  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      blueTeam: true,
      redTeam: true,
    },
  });

  return match;
}

export async function getMatchesByClubId(clubId: string): Promise<Match[]> {
  const matches = await prisma.match.findMany({
    where: {
      OR: [
        {
          blueTeam: {
            clubId: clubId,
          },
        },
        {
          redTeam: {
            clubId: clubId,
          },
        },
      ],
    },
    include: {
      blueTeam: true,
      redTeam: true,
    },
  });

  return matches;
}

export async function createMatch(input: {
  leagueId: string;
  blueTeamId: string;
  redTeamId: string;
  blueScore?: number;
  redScore?: number;
  date: string;
}): Promise<Match> {
  const { leagueId, blueTeamId, redTeamId, blueScore, redScore, date } = input;
  let data = {};
  if (typeof blueScore === 'number') {
    data = { ...data, blueScore };
  }
  if (typeof redScore === 'number') {
    data = { ...data, redScore };
  }

  const match = await prisma.match.create({
    data: {
      ...data,
      league: { connect: { id: leagueId } },
      blueTeam: { connect: { id: blueTeamId } },
      redTeam: { connect: { id: redTeamId } },
      date,
    },
    include: {
      blueTeam: true,
      redTeam: true,
    },
  });

  return match;
}

export async function updateMatch(input: {
  id: string;
  blueScore?: number;
  redScore?: number;
  date?: Date;
}): Promise<Match> {
  const { id, blueScore, redScore, date } = input;
  const match = await prisma.match.update({
    where: { id },
    data: {
      blueScore,
      redScore,
      date,
    },
    include: {
      blueTeam: true,
      redTeam: true,
    },
  });

  return match;
}

export async function deleteMatch(id: string): Promise<void> {
  await prisma.match.delete({ where: { id } });
}

const matchWithTeams = Prisma.validator<Prisma.MatchArgs>()({
  include: { blueTeam: true, redTeam: true },
});
export type MatchWithTeams = Prisma.MatchGetPayload<typeof matchWithTeams>;

// src/server/services/matchService.ts
import { PrismaClient, Match } from '@prisma/client';

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

export async function createMatch(input: {
  leagueId: string;
  blueTeamId: string;
  redTeamId: string;
  blueScore?: number;
  redScore?: number;
  date: string;
}): Promise<Match> {
  const { leagueId, blueTeamId, redTeamId, blueScore, redScore, date } = input;
  const match = await prisma.match.create({
    data: {
      league: { connect: { id: leagueId } },
      blueTeam: { connect: { id: blueTeamId } },
      redTeam: { connect: { id: redTeamId } },
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

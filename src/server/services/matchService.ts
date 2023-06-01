// src/server/services/matchService.ts
import { PrismaClient, Match } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMatches(): Promise<Match[]> {
  const matches = await prisma.match.findMany({
    include: {
      blueTeam: {
        include: {
          users: true,
        },
      },
      redTeam: {
        include: {
          users: true,
        },
      },
    },
  });

  return matches;
}

export async function getMatchById(id: string): Promise<Match | null> {
  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      blueTeam: {
        include: {
          users: true,
        },
      },
      redTeam: {
        include: {
          users: true,
        },
      },
    },
  });

  return match;
}

// Add more service functions if needed, such as creating, updating, or deleting matches

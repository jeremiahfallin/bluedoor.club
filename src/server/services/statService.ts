// src/server/services/statService.ts
import { PrismaClient, Stat } from '@prisma/client';

const prisma = new PrismaClient();

export async function createStat(input: {
  matchId: string;
  playerId: string;
  teamId: string;
  character: string;
  stock: number;
  win: boolean;
}): Promise<Stat> {
  const { matchId, playerId, teamId, character, stock, win } = input;
  const match = await prisma.stat.create({
    data: {
      matchId,
      playerId,
      teamId,
      character,
      stock,
      win,
    },
  });

  return match;
}

export async function deleteStat(id: string): Promise<void> {
  await prisma.stat.delete({ where: { id } });
}

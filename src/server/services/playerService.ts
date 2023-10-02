// src/server/routers/playerRouter.ts
import { PrismaClient, Player } from '@prisma/client';

const prisma = new PrismaClient();

export async function upsertPlayer(input: {
  name: string;
  handle?: string;
  teamId: string;
}): Promise<Player> {
  const { name, handle, teamId } = input;
  const player = await prisma.player.upsert({
    where: { teamId_name: { teamId, name } },
    update: { handle, teamId },
    create: { name, handle, teamId },
  });

  return player;
}

import { PrismaClient, Game, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllGames(): Promise<Game[]> {
  return await prisma.game.findMany();
}

export async function getGameById(id: string): Promise<Game | null> {
  return await prisma.game.findUnique({ where: { id } });
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  return await prisma.game.findUnique({
    where: { slug },
    include: { leagues: true },
  });
}

export async function createGame(input: {
  name: string;
  slug: string;
}): Promise<Game> {
  return await prisma.game.create({ data: input });
}

export async function updateGame(input: {
  id: string;
  name: string;
}): Promise<Game | null> {
  const { id, name } = input;
  return await prisma.game.update({ where: { id }, data: { name } });
}

export async function deleteGame(id: string): Promise<void> {
  await prisma.game.delete({ where: { id } });
}

const gameWithLeagues = Prisma.validator<Prisma.GameArgs>()({
  include: { leagues: true },
});
export type GameWithLeagues = Prisma.GameGetPayload<typeof gameWithLeagues>;

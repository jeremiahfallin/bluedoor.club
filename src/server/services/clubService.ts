import { Club, PrismaClient, Team } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllClubs(): Promise<Club[]> {
  const clubs = await prisma.club.findMany({
    include: { teams: true },
  });

  return clubs;
}

export async function getClubById(id: string): Promise<Club | null> {
  const club = await prisma.club.findUnique({
    where: { id },
    include: { teams: true },
  });

  return club;
}

export async function getTeamByClubAndTeamId(
  clubId: string,
  teamId: string,
): Promise<Team | null> {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: { club: true },
  });

  if (!team || team.clubId !== clubId) {
    return null;
  }

  return team;
}

export async function createClub(name: string, slug: string): Promise<Club> {
  const club = await prisma.club.create({
    data: { name, slug },
  });

  return club;
}

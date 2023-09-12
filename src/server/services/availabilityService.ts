import { Availability, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateAvailability(
  id: string,
  times: any[],
): Promise<Availability> {
  await prisma.availableTimes.deleteMany({ where: { availabilityId: id } });
  const availability = await prisma.availability.update({
    where: { id },
    data: {
      times: {
        createMany: {
          data: times,
        },
      },
    },
  });
  return availability;
}

export async function getAvailability(
  userId: string,
  leagueId: string,
): Promise<Availability | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { club: { include: { teams: true } } },
  });
  if (!user) {
    throw new Error('User not found');
  }
  const myTeams = user?.club?.teams.filter(
    (team) => team.leagueId === leagueId,
  );
  if (myTeams?.length === 0) {
    throw new Error('Team not found');
  }
  const availability = Promise.all(
    myTeams?.map((myTeam) =>
      prisma.availability.upsert({
        where: { teamId_leagueId: { teamId: myTeam.id, leagueId } },
        create: { teamId: myTeam.id, leagueId },
        update: {},
        include: { team: true, times: true },
      }),
    ),
  );
  return availability;
}

export async function getAvailabilityByTeamIdAndLeagueId(
  teamId: string,
  leagueId: string,
): Promise<Availability | null> {
  const availability = await prisma.availability.upsert({
    where: { teamId_leagueId: { teamId: teamId, leagueId } },
    create: { teamId: teamId, leagueId },
    update: {},
    include: { times: true },
  });
  return availability;
}

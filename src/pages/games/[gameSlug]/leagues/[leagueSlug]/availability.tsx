import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Scheduler from '~/components/Scheduler';

import { trpc } from '~/utils/trpc';
import createTitle from '~/utils/createTitle';

function Wrapper({ league, userId }: { league: any; userId: string }) {
  const availabilityQuery = trpc.availability.get.useQuery({
    leagueId: league?.id,
    userId: userId,
  }) as any;
  const availability = availabilityQuery.data;
  const [teamIndex, setTeamIndex] = useState(0);

  if (!availability) {
    return null;
  }

  const teams = availability.map((a: any) => a.team);
  return (
    <Scheduler
      availabilityRefetch={availabilityQuery.refetch}
      availability={availability}
      name={league.name}
      seasonStart={league.seasonStart}
      seasonEnd={league.seasonEnd}
      teams={teams}
      teamIndex={teamIndex}
      setTeamIndex={setTeamIndex}
    />
  );
}

export default function AvailabilityPage() {
  const { data: session } = useSession() as any;
  const router = useRouter();
  const { leagueSlug } = router.query as {
    leagueSlug: string;
  };

  const { data: league } = trpc.league.getBySlug.useQuery(leagueSlug);

  if (!league || !session?.user?.id) {
    return null;
  }
  return (
    <>
      <Wrapper league={league} userId={session?.user?.id} />
    </>
  );
}

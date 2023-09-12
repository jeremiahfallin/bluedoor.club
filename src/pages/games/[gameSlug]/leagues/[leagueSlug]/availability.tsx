import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Scheduler from '~/components/Scheduler';

import { trpc } from '~/utils/trpc';
import createTitle from '~/utils/createTitle';

function Wrapper({ league, userId }: { league: any; userId: string }) {
  const { data: availability } = trpc.availability.get.useQuery({
    leagueId: league?.id,
    userId: userId,
  }) as any;
  const [teamIndex, setTeamIndex] = useState(0);

  const availabilityId = availability ? availability[teamIndex].id : null;
  const initialEvents = availability
    ? availability[teamIndex].times.map((time: any) => ({
        id: time.id,
        title: createTitle({
          start: new Date(time?.startTime),
          end: new Date(time?.endTime),
        }),
        start: time.startTime,
        end: time.endTime,
      }))
    : [];
  const teams = league.teams;
  if (!availabilityId) {
    return null;
  }
  return (
    <Scheduler
      availabilityId={availabilityId}
      initialEvents={initialEvents}
      name={league.name}
      seasonStart={league.seasonStart}
      seasonEnd={league.seasonEnd}
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

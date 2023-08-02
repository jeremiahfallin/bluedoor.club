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

  const availabilityId = availability ? availability.id : null;
  const initialEvents = availability
    ? availability.times.map((time: any) => ({
        id: time.id,
        title: createTitle({
          start: new Date(time?.startTime),
          end: new Date(time?.endTime),
        }),
        start: time.startTime,
        end: time.endTime,
      }))
    : [];
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

  if (!league) {
    return null;
  }
  return (
    <>
      <Wrapper league={league} userId={session?.user?.id} />
    </>
  );
}

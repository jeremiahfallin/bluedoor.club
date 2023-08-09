// pages/games/[gameSlug]/leagues/[leagueSlug].tsx
import { useRouter } from 'next/router';
import Schedule from '~/components/Schedule';

export default function IndexPage() {
  const router = useRouter();
  const { leagueSlug } = router.query as { leagueSlug: string };

  if (!leagueSlug) {
    router.push('/404');
    return null;
  }

  return <Schedule game={leagueSlug} />;
}

import { useRouter } from 'next/router';

import Schedule from '~/components/Schedule';

const games = ['brawlhalla', 'chess', 'rocket-league'];

export default function IndexPage() {
  const router = useRouter();
  const { game } = router.query as { game: string };

  if (!games.includes(game)) {
    router.push('/404');
    return null;
  }

  return <Schedule game={game} />;
}

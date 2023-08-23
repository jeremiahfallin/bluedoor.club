// pages/games/[gameSlug]/leagues/[leagueSlug].tsx
import NextError from 'next/error';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Schedule from '~/components/Schedule';
import { trpc } from '~/utils/trpc';
import { League } from '@prisma/client';

interface LeagueWithMatches extends League {
  matches: {
    id: number;
    date: Date;
    blueTeam: {
      name: string;
    };
    blueScore: number;
    redTeam: {
      name: string;
    };
    redScore: number;
  }[];
}

export default function IndexPage() {
  const router = useRouter();
  const { leagueSlug } = router.query as { leagueSlug: string };
  const leagueQuery = trpc.league.getBySlug.useQuery(leagueSlug);
  const data = leagueQuery.data as LeagueWithMatches;

  if (leagueQuery.error) {
    return (
      <NextError
        title={leagueQuery.error.message}
        statusCode={leagueQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (leagueQuery.status !== 'success') {
    return <>Loading...</>;
  }

  if (!leagueSlug) {
    router.push('/404');
    return null;
  }

  return (
    <Box>
      <Flex justify={'space-between'} p={4}>
        <Box>
          <Heading>{data.name}</Heading>
          <Heading size={'sm'}>
            {data.seasonStart.toDateString()} to {data.seasonEnd.toDateString()}
          </Heading>
        </Box>
        <Button
          onClick={() => {
            router.push(`/games/${leagueSlug}/leagues/${leagueSlug}/create`);
          }}
        >
          Join League
        </Button>
      </Flex>
      <Schedule data={data} game={leagueSlug} />
    </Box>
  );
}

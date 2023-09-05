import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Link,
  Flex,
  Center,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import { appRouter, createContext } from './api/trpc/[trpc]';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

interface Game {
  id: string;
  name: string;
  imageUrl: string;
}

interface League {
  id: string;
  name: string;
  gameId: string;
}

interface IndexProps {
  games: Game[];
  leagues: League[];
}

const LeagueCard = ({ league }: { league: any }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <Link
        href={`/games/${league?.game?.slug}/leagues/${league.slug}`}
        color={'blue.500'}
      >
        <Center>
          <Heading size="md">{league.name}</Heading>
        </Center>
      </Link>
      <Flex justifyContent={'space-between'}>
        <Box>Game:</Box>
        <Box>{league?.game?.name}</Box>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Box>Starts:</Box>
        <Box>{league?.seasonStart.toDateString()}</Box>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Box>Ends:</Box>
        <Box>{league?.seasonEnd.toDateString()}</Box>
      </Flex>
    </Box>
  );
};

const IndexPage: React.FC<IndexProps> = () => {
  const gamesQuery = trpc.game.list.useQuery();
  const leaguesQuery = trpc.league.current.useQuery();
  const upcomingLeaguesQuery = trpc.league.upcoming.useQuery();
  const previousLeaguesQuery = trpc.league.previous.useQuery();

  if (
    gamesQuery.isLoading ||
    leaguesQuery.isLoading ||
    upcomingLeaguesQuery.isLoading ||
    previousLeaguesQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }

  const upcoming = upcomingLeaguesQuery.data;
  const previous = previousLeaguesQuery.data;

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={8} w="100%">
        <VStack spacing={4}>
          <Heading>Welcome to the Bluedoor Club</Heading>
        </VStack>

        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Current Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
            {leaguesQuery?.data?.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Upcoming Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
            {upcoming?.map((league: any) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Previous Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
            {previous?.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Container>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.game.list.prefetch();
  await ssg.league.current.prefetch();
  await ssg.league.previous.prefetch();
  await ssg.league.upcoming.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 300,
  };
};

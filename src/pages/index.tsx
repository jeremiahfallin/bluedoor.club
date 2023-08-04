import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Link,
  Flex,
  Center,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';

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
  console.log(league);
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
  const leaguesQuery = trpc.league.list.useQuery();
  const upcomingLeaguesQuery = trpc.league.upcoming.useQuery();

  if (
    gamesQuery.isLoading ||
    leaguesQuery.isLoading ||
    upcomingLeaguesQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }

  const upcoming = upcomingLeaguesQuery.data;

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={8}>
        <VStack spacing={4}>
          <Heading>Welcome to the Bluedoor Club</Heading>
        </VStack>

        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Current Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {leaguesQuery?.data?.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Upcoming Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {upcoming?.map((league: any) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Container>
  );
};

export default IndexPage;

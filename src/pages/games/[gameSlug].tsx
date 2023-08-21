import {
  Container,
  VStack,
  Heading,
  Box,
  Text,
  Flex,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { GameWithLeagues } from '~/server/services/gameService';

const LeagueCard = ({ league }: { league: any }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <Link
        href={`/games/${league?.game?.slug}/leagues/${league.slug}`}
        color={'blue.500'}
      >
        <Center py={2}>
          <Heading size="md">{league.name}</Heading>
        </Center>
      </Link>
      <Flex justifyContent={'space-between'}>
        <Box>Game:</Box>
        <Box textAlign="right">{league?.game?.name}</Box>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Box>Starts:</Box>
        <Box textAlign="right">{league?.seasonStart.toDateString()}</Box>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Box>Ends:</Box>
        <Box textAlign="right">{league?.seasonEnd.toDateString()}</Box>
      </Flex>
    </Box>
  );
};

const GamePage = () => {
  const router = useRouter();
  const { gameSlug } = router.query as { gameSlug: string };
  const gameQuery = trpc.game.getBySlug.useQuery(gameSlug);

  if (!gameSlug) return null;

  const game = gameQuery.data as GameWithLeagues;

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={8}>
        {gameQuery.isLoading && <Text>Loading game...</Text>}
        {gameQuery.error && (
          <Text>Error loading game: {gameQuery.error.message}</Text>
        )}
        {gameQuery.data && (
          <>
            <Heading as="h1" size="2xl">
              {game.name} Leagues
            </Heading>
            <VStack align="start" spacing={4} w="full">
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {game.leagues ? (
                  <VStack spacing={4} w="100%">
                    {game.leagues.map((league) => {
                      const leagueWithGame = {
                        ...league,
                        game: game,
                      };
                      return (
                        <LeagueCard key={league.id} league={leagueWithGame} />
                      );
                    })}
                  </VStack>
                ) : (
                  <Text>No leagues found for this game.</Text>
                )}
              </SimpleGrid>
            </VStack>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default GamePage;

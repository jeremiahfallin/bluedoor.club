import { VStack, Heading, Box, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const GamePage = () => {
  const router = useRouter();
  const { gameSlug } = router.query as { gameSlug: string };
  const gameQuery = trpc.game.getBySlug.useQuery(gameSlug);

  if (!gameSlug) return null;

  return (
    <VStack spacing={4}>
      {gameQuery.isLoading && <Text>Loading game...</Text>}
      {gameQuery.error && (
        <Text>Error loading game: {gameQuery.error.message}</Text>
      )}
      {gameQuery.data && (
        <>
          <Heading as="h1" size="2xl">
            {gameQuery.data.name} Leagues
          </Heading>
          {gameQuery.data.imageUrl && (
            <Image src={gameQuery.data.imageUrl} alt={gameQuery.data.name} />
          )}
          {gameQuery.data.description && (
            <Text>{gameQuery.data.description}</Text>
          )}
          {gameQuery.data.leagues ? (
            <VStack spacing={4} w="100%">
              {gameQuery.data.leagues.map((league) => (
                <Box
                  key={league.id}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  boxShadow="lg"
                  cursor="pointer"
                  w="100%"
                  _hover={{ bg: 'gray.100' }}
                  onClick={() =>
                    router.push(`/games/${gameSlug}/leagues/${league.slug}`)
                  }
                >
                  <Heading as="h2" size="lg" mb={2}>
                    {league.name}
                  </Heading>
                  {/* {game.imageUrl && <Image src={game.imageUrl} alt={game.name} />} */}
                  {/* {game.description && <Text>{game.description}</Text>} */}
                </Box>
              ))}
            </VStack>
          ) : (
            <Text>No leagues found for this game.</Text>
          )}
        </>
      )}
    </VStack>
  );
};

export default GamePage;

import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { trpc } from '~/utils/trpc';

const GamesPage = () => {
  const gamesQuery = trpc.game.list.useQuery();

  return (
    <VStack spacing={4} padding={4}>
      <Heading as="h1" size="2xl">
        Current Games
      </Heading>
      {gamesQuery.isLoading && <Text>Loading games...</Text>}
      {gamesQuery.error && (
        <Text>Error loading games: {gamesQuery.error.message}</Text>
      )}
      {gamesQuery.data && (
        <VStack>
          {gamesQuery.data.map((game) => (
            <Box
              key={game.id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              cursor="pointer"
              w="100%"
              _hover={{ bg: 'gray.100' }}
            >
              <Heading as="h2" size="lg" mb={2}>
                <Link href={`/games/${game.slug}`}>{game.name}</Link>
              </Heading>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default GamesPage;

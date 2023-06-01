import { VStack, Heading, Box, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const GamesPage = () => {
  const router = useRouter();
  const gamesQuery = trpc.game.list.useQuery();

  const handleGameClick = (gameSlug: string) => {
    router.push(`/games/${gameSlug}`);
  };

  return (
    <VStack spacing={4}>
      <Heading as="h1" size="2xl">
        Available Games
      </Heading>
      {gamesQuery.isLoading && <Text>Loading games...</Text>}
      {gamesQuery.error && (
        <Text>Error loading games: {gamesQuery.error.message}</Text>
      )}
      {gamesQuery.data && (
        <VStack spacing={4} w="100%">
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
              onClick={() => handleGameClick(game.slug)}
            >
              <Heading as="h2" size="lg" mb={2}>
                {game.name}
              </Heading>
              {/* {game.imageUrl && <Image src={game.imageUrl} alt={game.name} />} */}
              {/* {game.description && <Text>{game.description}</Text>} */}
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default GamesPage;

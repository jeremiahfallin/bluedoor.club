import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
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

const IndexPage: React.FC<IndexProps> = () => {
  const gamesQuery = trpc.game.list.useQuery();
  const leaguesQuery = trpc.league.list.useQuery();

  if (gamesQuery.isLoading || leaguesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={8}>
        <VStack spacing={4}>
          <Heading>Welcome to our Esports Leagues Platform</Heading>
        </VStack>

        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Current Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {leaguesQuery?.data?.map((league) => (
              <Box key={league.id} borderWidth={1} borderRadius="md" p={4}>
                <Heading size="md">{league.name}</Heading>
                <Text>Game ID: {league.gameId}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Container>
  );
};

export default IndexPage;

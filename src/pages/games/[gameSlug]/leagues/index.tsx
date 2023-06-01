// pages/leagues/index.tsx
import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const LeaguesPage = () => {
  const router = useRouter();
  const leaguesQuery = trpc.league.list.useQuery();

  const handleLeagueClick = (leagueSlug: string) => {
    router.push(`/leagues/${leagueSlug}`);
  };

  return (
    <VStack spacing={4}>
      <Heading as="h1" size="2xl">
        Current Leagues
      </Heading>
      {leaguesQuery.isLoading && <Text>Loading leagues...</Text>}
      {leaguesQuery.error && (
        <Text>Error loading leagues: {leaguesQuery.error.message}</Text>
      )}
      {leaguesQuery.data && (
        <VStack spacing={4} w="100%">
          {leaguesQuery.data.map((league: any) => (
            <Box
              key={league.id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              cursor="pointer"
              w="100%"
              _hover={{ bg: 'gray.100' }}
              onClick={() => handleLeagueClick(league.slug)}
            >
              <Heading as="h2" size="lg" mb={2}>
                {league.name}
              </Heading>
              <Text>Game: {league.game.name}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default LeaguesPage;

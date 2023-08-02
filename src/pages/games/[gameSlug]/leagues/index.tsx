// pages/leagues/index.tsx
import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const LeaguesPage = () => {
  const router = useRouter();
  const { gameSlug } = router.query as { gameSlug: string };
  const leaguesQuery = trpc.league.getByGameSlug.useQuery(gameSlug);
  console.log(leaguesQuery.data);

  return (
    <VStack spacing={4} p={4}>
      <Heading as="h1" size="2xl">
        Current Leagues
      </Heading>
      {leaguesQuery.isLoading && <Text>Loading leagues...</Text>}
      {leaguesQuery.error && (
        <Text>Error loading leagues: {leaguesQuery.error.message}</Text>
      )}
      {leaguesQuery.data && (
        <VStack spacing={4}>
          {leaguesQuery.data.map((league: any) => (
            <Link
              key={league.id}
              href={`/games/${gameSlug}/leagues/${league.slug}`}
              w="100%"
            >
              <Box
                p={4}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                _hover={{ bg: 'gray.900' }}
              >
                <Heading as="h2" size="lg" mb={2}>
                  {league.name}
                </Heading>
                <Text>Game: {league.name}</Text>
              </Box>
            </Link>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default LeaguesPage;

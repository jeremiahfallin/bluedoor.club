// pages/leagues/[leagueId]/teams.tsx
import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { LeagueWithTeams } from '~/server/services/leagueService';

const LeagueTeamsPage = () => {
  const router = useRouter();
  const { leagueSlug } = router.query as { leagueSlug: string };

  const teamsQuery = trpc.league.getTeamsByLeagueSlug.useQuery(leagueSlug);

  if (!leagueSlug) return null;

  const league = teamsQuery.data as LeagueWithTeams;

  return (
    <VStack spacing={4}>
      <Heading as="h1" size="2xl">
        Teams in the League
      </Heading>
      {teamsQuery.isLoading && <Text>Loading teams...</Text>}
      {teamsQuery.error && (
        <Text>Error loading teams: {teamsQuery.error.message}</Text>
      )}
      {teamsQuery.data && (
        <VStack spacing={4} w="100%">
          {league.teams.map((team) => (
            <Box
              key={team.id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              w="100%"
            >
              <Heading as="h2" size="lg" mb={2}>
                {team.name}
              </Heading>
              {/* Add other team details, such as roster or team statistics */}
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default LeagueTeamsPage;

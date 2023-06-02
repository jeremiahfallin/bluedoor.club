import { VStack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MatchWithTeams } from '~/server/services/matchService';
import { trpc } from '~/utils/trpc';

const MatchPage = () => {
  const router = useRouter();
  const { matchId } = router.query as { matchId: string };

  const matchQuery = trpc.match.getById.useQuery(matchId);

  if (!matchId) return null;

  const match = matchQuery.data as MatchWithTeams;

  return (
    <VStack spacing={4}>
      {matchQuery.isLoading && <Text>Loading match...</Text>}
      {matchQuery.error && (
        <Text>Error loading match: {matchQuery.error.message}</Text>
      )}
      {matchQuery.data && (
        <>
          <Heading as="h1" size="2xl">
            Match: {match.blueTeam.name} vs {match.redTeam.name}
          </Heading>
          <Text>Date: {match.date.toISOString()}</Text>
          {/* Add other match details, such as the final score, match highlights, or team statistics */}
        </>
      )}
    </VStack>
  );
};

export default MatchPage;

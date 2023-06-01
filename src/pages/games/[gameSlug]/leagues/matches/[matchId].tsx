import { VStack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const MatchPage = () => {
  const router = useRouter();
  const { matchId } = router.query as { matchId: string };

  const matchQuery = trpc.match.getById.useQuery(matchId);

  if (!matchId) return null;

  return (
    <VStack spacing={4}>
      {matchQuery.isLoading && <Text>Loading match...</Text>}
      {matchQuery.error && (
        <Text>Error loading match: {matchQuery.error.message}</Text>
      )}
      {matchQuery.data && (
        <>
          <Heading as="h1" size="2xl">
            Match: {matchQuery.data.blueTeam.name} vs{' '}
            {matchQuery.data.redTeam.name}
          </Heading>
          <Text>Date: {matchQuery.data.date}</Text>
          {/* Add other match details, such as the final score, match highlights, or team statistics */}
        </>
      )}
    </VStack>
  );
};

export default MatchPage;

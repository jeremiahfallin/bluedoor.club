// pages/admin/matches/MatchesManagement.tsx
import { VStack, Heading, Text } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import MatchListItem from './MatchListItem'; // Import MatchListItem component

const MatchesManagement = () => {
  const matchesQuery = trpc.match.list.useQuery();
  const availabilities = trpc.availability.getAll.useQuery({
    leagueId: '0e94d6b1-1435-4f76-be18-3cc1acd63c9d',
  });

  console.log(availabilities.data);

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h2" size="xl">
        Matches Management
      </Heading>

      {/* Matches list */}
      {matchesQuery.isLoading && <Text>Loading matches...</Text>}
      {matchesQuery.error && (
        <Text>Error loading matches: {matchesQuery.error.message}</Text>
      )}
      {matchesQuery.data && (
        <VStack spacing={4} w="100%">
          {matchesQuery.data.map((match) => (
            <MatchListItem
              key={match.id}
              match={match}
              onMatchUpdate={matchesQuery.refetch}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default MatchesManagement;

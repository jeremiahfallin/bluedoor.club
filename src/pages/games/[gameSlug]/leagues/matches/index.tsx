import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { MatchWithTeams } from '~/server/services/matchService';

import { trpc } from '~/utils/trpc';

const MatchesPage = () => {
  const matchesQuery = trpc.match.list.useQuery();

  const matches = matchesQuery.data as MatchWithTeams[];

  return (
    <VStack spacing={4}>
      <Heading as="h1" size="2xl">
        Matches
      </Heading>
      {matchesQuery.isLoading && <Text>Loading matches...</Text>}
      {matchesQuery.error && (
        <Text>Error loading matches: {matchesQuery.error.message}</Text>
      )}
      {matchesQuery.data && (
        <VStack spacing={4} w="100%">
          {matches.map((match) => (
            <Box
              key={match.id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              w="100%"
            >
              <Heading as="h2" size="lg" mb={2}>
                {match.blueTeam.name} vs {match.redTeam.name}
              </Heading>
              {/* <Text>Date: {match.date}</Text> */}
              {/* Add other match details, such as the final score, match highlights, or team statistics */}
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default MatchesPage;

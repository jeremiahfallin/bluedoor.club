// pages/admin/matches/AvailabilityManagement.tsx
import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';

const AvailabilityManagement = () => {
  const availabilityQuery = trpc.availability.getAll.useQuery({
    leagueId: '0e94d6b1-1435-4f76-be18-3cc1acd63c9d',
  });

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h2" size="xl">
        Matches Management
      </Heading>

      {/* Matches list */}
      {availabilityQuery.isLoading && <Text>Loading availabilities...</Text>}
      {availabilityQuery.error && (
        <Text>
          Error loading availabilities: {availabilityQuery.error.message}
        </Text>
      )}
      {availabilityQuery.data && (
        <VStack spacing={4} w="100%">
          {availabilityQuery.data.map((availability) => (
            <Box key={availability.id}>
              <Heading as="h3" size="lg">
                {availability.team.name}
              </Heading>
              {availability.times.map((time: any) => {
                return (
                  <Box key={time.id}>
                    {new Date(time.startTime).toLocaleString()}
                  </Box>
                );
              })}
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default AvailabilityManagement;

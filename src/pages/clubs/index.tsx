import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';

const ClubsPage = () => {
  const clubsQuery = trpc.club.list.useQuery();

  return (
    <VStack spacing={4}>
      <Heading as="h1" size="2xl">
        Clubs
      </Heading>
      {clubsQuery.isLoading && <Text>Loading clubs...</Text>}
      {clubsQuery.error && (
        <Text>Error loading clubs: {clubsQuery.error.message}</Text>
      )}
      {clubsQuery.data && (
        <VStack spacing={4} w="100%">
          {clubsQuery.data.map((club) => (
            <Box
              key={club.id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              w="100%"
            >
              <Heading as="h2" size="lg" mb={2}>
                {club.name}
              </Heading>
              {/* Add other club details, such as location, contact information, or club history */}
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default ClubsPage;

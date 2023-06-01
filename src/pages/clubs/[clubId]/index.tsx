import {
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const ClubPage = () => {
  const router = useRouter();
  const { clubId } = router.query as { clubId: string };

  const clubQuery = trpc.club.getById.useQuery(clubId);

  if (!clubId) return null;

  return (
    <VStack spacing={4}>
      {clubQuery.isLoading && <Text>Loading club...</Text>}
      {clubQuery.error && (
        <Text>Error loading club: {clubQuery.error.message}</Text>
      )}
      {clubQuery.data && (
        <>
          <Heading as="h1" size="2xl">
            Club: {clubQuery.data.name}
          </Heading>
          <Text>Teams:</Text>
          <UnorderedList>
            {clubQuery.data.teams.map((team: any) => (
              <ListItem key={team.id}>{team.name}</ListItem>
            ))}
          </UnorderedList>
          {/* Add other club details, such as contact information, location, or club history */}
        </>
      )}
    </VStack>
  );
};

export default ClubPage;

// pages/admin/clubs/ClubsManagement.tsx
import { useState } from 'react';
import { VStack, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import ClubListItem from './ClubListItem';
import ClubModal from './ClubModal';

const ClubsManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newClubName, setNewClubName] = useState('');
  const [newClubSlug, setNewClubSlug] = useState('');
  const clubsQuery = trpc.club.list.useQuery();

  const createClubMutation = trpc.club.create.useMutation();

  const handleCreateClub = () => {
    createClubMutation.mutate({ name: newClubName, slug: newClubSlug });
  };

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h2" size="xl">
        Clubs Management
      </Heading>

      <Button onClick={onOpen}>Add Club</Button>

      <ClubModal
        isOpen={isOpen}
        onClose={onClose}
        clubName={newClubName}
        setClubName={setNewClubName}
        clubSlug={newClubSlug}
        setClubSlug={setNewClubSlug}
        action={handleCreateClub}
        actionLabel="Create"
        header="Create Club"
      />

      {clubsQuery.isLoading && <p>Loading clubs...</p>}
      {clubsQuery.error && (
        <p>Error loading clubs: {clubsQuery.error.message}</p>
      )}
      {clubsQuery.data && (
        <VStack spacing={4} w="100%">
          {clubsQuery.data.map((club: any) => (
            <ClubListItem
              key={club.id}
              club={club}
              onClubUpdate={clubsQuery.refetch}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default ClubsManagement;

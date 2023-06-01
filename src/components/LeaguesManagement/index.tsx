// pages/admin/leagues/LeaguesManagement.tsx
import { useState } from 'react';
import { VStack, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import LeagueListItem from './LeagueListItem'; // Import LeagueListItem component
import ClubModal from '~/components/ClubsManagement/ClubModal'; // Import ClubModal component

const LeaguesManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLeagueName, setNewLeagueName] = useState('');
  const leaguesQuery = trpc.league.list.useQuery();

  const createLeagueMutation = trpc.league.create.useMutation({
    onSuccess: () => {
      leaguesQuery.refetch();
      onClose();
    },
  });

  const handleCreateLeague = () => {
    createLeagueMutation.mutate({ name: newLeagueName, gameId: '1' });
  };

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h2" size="xl">
        Leagues Management
      </Heading>

      <Button onClick={onOpen}>Add League</Button>

      {/* League creation modal */}
      <ClubModal
        isOpen={isOpen}
        onClose={onClose}
        clubName={newLeagueName}
        setClubName={setNewLeagueName}
        action={handleCreateLeague}
        actionLabel="Create"
        header="Create League"
      />

      {/* League list */}
      {leaguesQuery.isLoading && <p>Loading leagues...</p>}
      {leaguesQuery.error && (
        <p>Error loading leagues: {leaguesQuery.error.message}</p>
      )}
      {leaguesQuery.data && (
        <VStack spacing={4} w="100%">
          {leaguesQuery.data.map((league) => (
            <LeagueListItem
              key={league.id}
              league={league}
              onLeagueUpdate={leaguesQuery.refetch}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default LeaguesManagement;

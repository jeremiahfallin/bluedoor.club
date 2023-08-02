// pages/admin/leagues/LeaguesManagement.tsx
import { useState } from 'react';
import { VStack, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import LeagueListItem from './LeagueListItem'; // Import LeagueListItem component
import LeagueModal from './LeagueModal'; // Import ClubModal component

const LeaguesManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLeagueName, setNewLeagueName] = useState('');
  const [seasonStart, setSeasonStart] = useState(new Date());
  const [seasonEnd, setSeasonEnd] = useState(new Date());
  const [gameId, setGameId] = useState('');
  const leaguesQuery = trpc.league.list.useQuery();
  const gamesQuery = trpc.game.list.useQuery();
  const games = gamesQuery.data || [];

  const createLeagueMutation = trpc.league.create.useMutation({
    onSuccess: () => {
      leaguesQuery.refetch();
      onClose();
    },
  });

  const handleCreateLeague = () => {
    createLeagueMutation.mutate({
      name: newLeagueName,
      gameId: gameId,
      seasonStart: seasonStart,
      seasonEnd: seasonEnd,
    });
  };

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h2" size="xl">
        Leagues Management
      </Heading>

      <Button onClick={onOpen}>Add League</Button>

      {/* League creation modal */}
      <LeagueModal
        isOpen={isOpen}
        onClose={onClose}
        leagueName={newLeagueName}
        setLeagueName={setNewLeagueName}
        action={handleCreateLeague}
        actionLabel="Create"
        header="Create League"
        games={games}
        setGameId={setGameId}
        seasonStart={seasonStart}
        setSeasonStart={setSeasonStart}
        seasonEnd={seasonEnd}
        setSeasonEnd={setSeasonEnd}
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

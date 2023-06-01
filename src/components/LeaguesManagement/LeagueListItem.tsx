// pages/admin/leagues/LeagueListItem.tsx
import { useState } from 'react';
import { Box, HStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { trpc } from '~/utils/trpc';
import LeagueModal from './LeagueModal';

interface LeagueListItemProps {
  league: {
    id: string;
    name: string;
  };
  onLeagueUpdate: () => void;
}

const LeagueListItem: React.FC<LeagueListItemProps> = ({
  league,
  onLeagueUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedLeagueName, setUpdatedLeagueName] = useState(league.name);
  const updateLeagueMutation = trpc.league.update.useMutation({
    onSuccess: onLeagueUpdate,
  });

  const deleteLeagueMutation = trpc.league.delete.useMutation({
    onSuccess: onLeagueUpdate,
  });

  const handleUpdateLeague = () => {
    updateLeagueMutation.mutate({ id: league.id, name: updatedLeagueName });
  };

  const handleDeleteLeague = () => {
    deleteLeagueMutation.mutate(league.id);
  };

  return (
    <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
      <HStack justifyContent="space-between">
        <Text>{league.name}</Text>
        <HStack>
          {/* Edit League Button */}
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit League"
            onClick={onOpen}
          />

          {/* Edit League Modal */}
          <LeagueModal
            isOpen={isOpen}
            onClose={onClose}
            leagueName={updatedLeagueName}
            setLeagueName={setUpdatedLeagueName}
            action={handleUpdateLeague}
            actionLabel="Edit"
            header="Edit League"
          />

          {/* Delete League Button */}
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete League"
            onClick={handleDeleteLeague}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default LeagueListItem;

// pages/admin/matches/MatchListItem.tsx
import { useState } from 'react';
import { Box, HStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { trpc } from '~/utils/trpc';
import MatchModal from './MatchModal'; // Import MatchModal component

interface MatchListItemProps {
  match: {
    id: string;
    blueTeamId: string;
    redTeamId: string;
    date: Date;
    blueScore: number | null | undefined;
    redScore: number | null | undefined;
  };
  onMatchUpdate: () => void;
}

const MatchListItem: React.FC<MatchListItemProps> = ({
  match,
  onMatchUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedMatch, setUpdatedMatch] = useState(match);
  const updateMatchMutation = trpc.match.update.useMutation({
    onSuccess: () => {
      onMatchUpdate();
      onClose();
    },
  });

  const deleteMatchMutation = trpc.match.delete.useMutation({
    onSuccess: () => {
      onMatchUpdate();
    },
  });

  const handleUpdateMatch = () => {
    updateMatchMutation.mutate(updatedMatch);
  };

  const handleDeleteMatch = () => {
    deleteMatchMutation.mutate(match.id);
  };

  return (
    <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
      <HStack justifyContent="space-between">
        <Text>
          {match.blueTeamId} vs {match.redTeamId} ({match.date.toISOString()})
        </Text>
        <HStack>
          {/* Edit Match Button */}
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Match"
            onClick={onOpen}
          />

          {/* Edit Match Modal */}
          <MatchModal
            isOpen={isOpen}
            onClose={onClose}
            match={updatedMatch}
            setMatch={setUpdatedMatch}
            action={handleUpdateMatch}
            actionLabel="Edit"
            header="Edit Match"
          />

          {/* Delete Match Button */}
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Match"
            onClick={handleDeleteMatch}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default MatchListItem;

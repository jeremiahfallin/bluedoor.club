// pages/admin/leagues/LeagueListItem.tsx
import React, { useRef } from 'react';
import { Box, HStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { trpc } from '~/utils/trpc';
import LeagueEdit from './LeagueEdit';
import DeleteLeagueAlert from './DeleteLeagueAlert';

interface LeagueListItemProps {
  league: {
    id: string;
    name: string;
    seasonStart: Date;
    seasonEnd: Date;
  };
  onLeagueUpdate: () => void;
}

const LeagueListItem: React.FC<LeagueListItemProps> = ({
  league,
  onLeagueUpdate,
}) => {
  const cancelRef = useRef();
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const deleteLeagueMutation = trpc.league.delete.useMutation({
    onSuccess: onLeagueUpdate,
  });

  const handleDeleteLeague = () => {
    deleteLeagueMutation.mutate(league.id);
  };

  return (
    <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
      <HStack justifyContent="space-between">
        <Text>{league.name}</Text>
        <HStack>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <EditIcon />}
            aria-label="Edit League"
            onClick={onToggle}
          />

          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete League"
            onClick={onDeleteOpen}
          />
          <DeleteLeagueAlert
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            handleDeleteLeague={handleDeleteLeague}
            cancelRef={cancelRef}
          />
        </HStack>
      </HStack>
      <LeagueEdit
        league={league}
        isOpen={isOpen}
        onToggle={onToggle}
        onLeagueUpdate={onLeagueUpdate}
      />
    </Box>
  );
};

export default LeagueListItem;

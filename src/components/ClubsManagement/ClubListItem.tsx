// pages/admin/clubs/ClubListItem.tsx
import { useState } from 'react';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Club } from '@prisma/client';
import ClubModal from '~/components/ClubsManagement/ClubModal';
import { trpc } from '~/utils/trpc';

interface ClubListItemProps {
  club: Club;
  onClubUpdate: () => void;
}

const ClubListItem: React.FC<ClubListItemProps> = ({ club, onClubUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedClubName, setUpdatedClubName] = useState(club.name);
  const updateClubMutation = trpc.useMutation('club.update');
  const deleteClubMutation = trpc.useMutation('club.delete');

  const handleUpdateClub = async () => {
    await updateClubMutation.mutateAsync({
      id: club.id,
      updates: { name: updatedClubName },
    });
    onClubUpdate();
    onClose();
  };

  const handleDeleteClub = async () => {
    await deleteClubMutation.mutateAsync(club.id);
    onClubUpdate();
  };

  return (
    <Box>
      <HStack justifyContent="space-between" w="100%">
        <Text>{club.name}</Text>
        <HStack>
          <Button onClick={onOpen}>Edit</Button>
          <Button colorScheme="red" onClick={handleDeleteClub}>
            Delete
          </Button>
        </HStack>
      </HStack>

      <ClubModal
        isOpen={isOpen}
        onClose={onClose}
        clubName={updatedClubName}
        setClubName={setUpdatedClubName}
        action={handleUpdateClub}
        actionLabel="Edit"
        header="Edit Club"
      />
    </Box>
  );
};

export default ClubListItem;

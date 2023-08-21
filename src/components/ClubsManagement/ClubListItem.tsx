// pages/admin/clubs/ClubListItem.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { Club } from '@prisma/client';
import ClubModal from '~/components/ClubsManagement/ClubModal';
import { trpc } from '~/utils/trpc';

interface ClubListItemProps {
  club: Club;
  onClubUpdate: () => void;
}

const ClubListItem: React.FC<ClubListItemProps> = ({ club, onClubUpdate }) => {
  const { onCopy, value, setValue } = useClipboard('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedClubName, setUpdatedClubName] = useState(club.name);
  const [updatedClubSlug, setUpdatedClubSlug] = useState(club.slug);
  const createInviteMutation = trpc.invite.create.useMutation();
  const updateClubMutation = trpc.club.update.useMutation();
  const deleteClubMutation = trpc.club.delete.useMutation();

  const handleUpdateClub = async () => {
    await updateClubMutation.mutateAsync({
      id: club.id,
      name: updatedClubName,
      slug: updatedClubSlug,
    });
    onClubUpdate();
    onClose();
  };

  const handleInvite = async () => {
    const invite = await createInviteMutation.mutateAsync({ clubId: club.id });
    setValue(`${window.location.origin}/invite/${invite.id}`);
  };

  const handleDeleteClub = async () => {
    await deleteClubMutation.mutateAsync(club.id);
    onClubUpdate();
  };

  useEffect(() => {
    if (value) {
      onCopy();
    }
  }, [value]);

  return (
    <Box>
      <HStack justifyContent="space-between" w="100%">
        <Text>{club.name}</Text>
        <HStack>
          <Button
            onClick={() => {
              handleInvite();
            }}
            isLoading={createInviteMutation.isLoading}
          >
            Invite
          </Button>
          <Button onClick={onOpen}>Edit</Button>
          <Button
            colorScheme="red"
            onClick={handleDeleteClub}
            isLoading={deleteClubMutation.isLoading}
          >
            Delete
          </Button>
        </HStack>
      </HStack>

      <ClubModal
        isOpen={isOpen}
        onClose={onClose}
        clubName={updatedClubName}
        setClubName={setUpdatedClubName}
        clubSlug={updatedClubSlug}
        setClubSlug={setUpdatedClubSlug}
        action={handleUpdateClub}
        actionLabel="Edit"
        header="Edit Club"
      />
    </Box>
  );
};

export default ClubListItem;

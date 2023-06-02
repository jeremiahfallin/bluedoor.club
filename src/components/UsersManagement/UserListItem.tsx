// pages/admin/users/UserListItem.tsx
import { useState } from 'react';
import { Box, HStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { trpc } from '~/utils/trpc';
import UserModal from './UserModal'; // Import UserModal component

interface UserListItemProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  onUserUpdate: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onUserUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedUserRole, setUpdatedUserRole] = useState(user.role);
  const updateUserMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      onUserUpdate();
      onClose();
    },
  });

  const deleteUserMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      onUserUpdate();
    },
  });

  const handleUpdateUser = () => {
    if (updatedUserRole === 'ADMIN' || updatedUserRole === 'USER') {
      updateUserMutation.mutate({ id: user.id, role: updatedUserRole });
    }
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(user.id);
  };

  return (
    <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
      <HStack justifyContent="space-between">
        <Text>
          {user.name} ({user.email})
        </Text>
        <HStack>
          {/* Edit User Button */}
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit User"
            onClick={onOpen}
          />

          {/* Edit User Modal */}
          <UserModal
            isOpen={isOpen}
            onClose={onClose}
            userRole={updatedUserRole}
            setUserRole={setUpdatedUserRole}
            action={handleUpdateUser}
            actionLabel="Edit"
            header="Edit User"
          />

          {/* Delete User Button */}
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete User"
            onClick={handleDeleteUser}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default UserListItem;

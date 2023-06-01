// pages/admin/users/UsersManagement.tsx
import { VStack, Heading, Text } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import UserListItem from './UserListItem'; // Import UserListItem component

const UsersManagement = () => {
  const usersQuery = trpc.user.list.useQuery();

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h2" size="xl">
        Users Management
      </Heading>

      {/* Users list */}
      {usersQuery.isLoading && <Text>Loading users...</Text>}
      {usersQuery.error && (
        <Text>Error loading users: {usersQuery.error.message}</Text>
      )}
      {usersQuery.data && (
        <VStack spacing={4} w="100%">
          {usersQuery.data.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onUserUpdate={usersQuery.refetch}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default UsersManagement;

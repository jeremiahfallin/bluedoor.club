import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

export default function InvitePage() {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data: invite } = trpc.invite.get.useQuery({ id: id as string });
  const joinClubMutation = trpc.club.join.useMutation();

  const handleJoinClub = async () => {
    const sessionId = session?.user?.id;
    if (id && invite?.clubId && sessionId) {
      await joinClubMutation.mutateAsync({
        inviteId: id as string,
        clubId: invite.clubId as string,
        userId: session.user.id as string,
      });
      await router.push('/profile');
    }
  };

  if (!session) {
    return (
      <Box p={8}>
        <VStack spacing={4}>
          <Heading>Welcome to the Invite Page</Heading>
          <Text>Sign in to join {invite?.club.name}.</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Heading>Welcome to the Club Invite Page</Heading>
        <Text>Use your invite to join your Club.</Text>
        <Button onClick={handleJoinClub} isLoading={joinClubMutation.isLoading}>
          Join Club
        </Button>
      </VStack>
    </Box>
  );
}

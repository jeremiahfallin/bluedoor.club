// pages/games/leagues/clubs/[clubId]/[teamId].tsx
import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const ClubTeamPage = () => {
  const router = useRouter();
  const { clubId, teamId } = router.query;

  // const teamQuery = useQuery(
  //   ['club', clubId, 'team', teamId],
  //   async () => {
  //     if (!clubId || !teamId) return;
  //     const team = await trpc.query('club.getTeamById', {
  //       clubId: Number(clubId),
  //       teamId: Number(teamId),
  //     });
  //     return team;
  //   },
  //   {
  //     enabled: !!clubId && !!teamId,
  //   },
  // );

  if (!clubId || !teamId) return null;
  return null;

  // return (
  //   <VStack spacing={4}>
  //     {teamQuery.isLoading && <Text>Loading team...</Text>}
  //     {teamQuery.error && (
  //       <Text>Error loading team: {teamQuery.error.message}</Text>
  //     )}
  //     {teamQuery.data && (
  //       <>
  //         <Heading as="h1" size="2xl">
  //           Team: {teamQuery.data.name}
  //         </Heading>
  //         <Text>Club: {teamQuery.data.club.name}</Text>
  //       </>
  //     )}
  //   </VStack>
  // );
};

export default ClubTeamPage;

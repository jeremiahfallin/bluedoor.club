// pages/games/[gameSlug]/leagues/[leagueSlug].tsx
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';

import NextError from 'next/error';
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Schedule from '~/components/Schedule';
import LeagueParticipants from '~/components/LeagueParticipants';
import { trpc } from '~/utils/trpc';
import { appRouter, createContext } from '~/pages/api/trpc/[trpc]';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { League } from '@prisma/client';
import { JoinLeagueModal } from '~/pages/profile';
import { useSession } from 'next-auth/react';
import CharacterStats from '~/components/CharacterStats';
import PlayerStats from '~/components/PlayerStats';

interface LeagueWithMatches extends League {
  matches: {
    id: number;
    date: Date;
    blueTeam: {
      name: string;
    };
    blueScore: number;
    redTeam: {
      name: string;
    };
    redScore: number;
  }[];
}

export default function IndexPage() {
  const [teamName, setTeamName] = useState('');
  const toast = useToast();
  const router = useRouter();
  const { data: session }: any = useSession();
  const profileQuery = trpc.user.profile.useQuery(session?.user?.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { leagueSlug } = router.query as { leagueSlug: string };
  const leagueQuery = trpc.league.getBySlug.useQuery(leagueSlug);
  const joinLeagueMutation = trpc.league.join.useMutation({
    onSuccess: () => {
      onClose();
      setTeamName('');
      leagueQuery.refetch();
      toast({
        title: 'Joined league! Make sure to set your availability.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title:
          'Unable to add team to league. Please make sure your team name is unique.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const data = leagueQuery.data as LeagueWithMatches;

  if (leagueQuery.error) {
    return (
      <NextError
        title={leagueQuery.error.message}
        statusCode={leagueQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (leagueQuery.status !== 'success') {
    return <>Loading...</>;
  }

  if (!leagueSlug) {
    router.push('/404');
    return null;
  }

  return (
    <Box>
      <Flex justify={'space-between'} p={4}>
        <Box>
          <Heading>{data.name}</Heading>
          <Heading size={'sm'}>
            {data.seasonStart.toDateString()} to {data.seasonEnd.toDateString()}
          </Heading>
        </Box>
        {profileQuery.isLoading ? (
          <Skeleton />
        ) : (
          profileQuery &&
          profileQuery.data &&
          profileQuery.data.clubId &&
          data.seasonStart > new Date() && (
            <>
              <JoinLeagueModal
                isOpen={isOpen}
                onClose={onClose}
                leagueId={data.id}
                leagueName={data.name}
                clubId={profileQuery.data.clubId}
                teamName={teamName}
                setTeamName={setTeamName}
                joinLeagueMutation={joinLeagueMutation}
              />
              <Button onClick={onOpen} colorScheme="blue">
                Join League
              </Button>
            </>
          )
        )}
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Schedule</Tab>
          <Tab>Teams</Tab>
          <Tab>Team Stats</Tab>
          <Tab>Character Stats</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Schedule
              data={leagueQuery.data as LeagueWithMatches}
              clubId={profileQuery?.data?.clubId}
              refetch={leagueQuery.refetch}
            />
          </TabPanel>
          <TabPanel>
            <LeagueParticipants data={data} />
          </TabPanel>
          <TabPanel>
            <PlayerStats data={data} />
          </TabPanel>
          <TabPanel>
            <CharacterStats data={data} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>,
) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.league.getBySlug.prefetch(id);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

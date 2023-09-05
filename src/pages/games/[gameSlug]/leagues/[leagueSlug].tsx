// pages/games/[gameSlug]/leagues/[leagueSlug].tsx
import { useState } from 'react';
import NextError from 'next/error';
import {
  Box,
  Button,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Schedule from '~/components/Schedule';
import LeagueParticipants from '~/components/LeagueParticipants';
import { trpc } from '~/utils/trpc';
import { League } from '@prisma/client';
import { JoinLeagueModal } from '~/pages/profile';
import { useSession } from 'next-auth/react';

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
        {profileQuery && profileQuery.data && profileQuery.data.clubId && (
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
            <Button onClick={onOpen}>Join League</Button>
          </>
        )}
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Teams</Tab>
          <Tab>Schedule</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LeagueParticipants leagueId={data.id} />
          </TabPanel>
          <TabPanel>
            <Schedule data={data} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

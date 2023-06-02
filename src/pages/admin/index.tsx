// pages/admin/index.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import ClubsManagement from '~/components/ClubsManagement';
import LeaguesManagement from '~/components/LeaguesManagement';
import UsersManagement from '~/components/UsersManagement';
import MatchesManagement from '~/components/MatchesManagement';

const AdminPanel = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = status === 'authenticated' && session?.user?.role === 'ADMIN';

  useEffect(() => {
    if (status !== 'loading' && !isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, router, status]);

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="2xl">
        Admin Panel
      </Heading>

      <Box w="100%">
        <Tabs isLazy>
          <TabList>
            <Tab>Clubs</Tab>
            <Tab>Leagues</Tab>
            <Tab>Users</Tab>
            <Tab>Matches</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ClubsManagement />
            </TabPanel>
            <TabPanel>
              <LeaguesManagement />
            </TabPanel>
            <TabPanel>
              <UsersManagement />
            </TabPanel>
            <TabPanel>
              <MatchesManagement />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
};

export default AdminPanel;
import { useSession } from 'next-auth/react';
import {
  Box,
  Button,
  Flex,
  Text,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import { useState } from 'react';
import { Link } from '@chakra-ui/next-js';

const Sidebar = ({ leagues, teams }: { leagues: any; teams: any }) => {
  return (
    <Box w="240px" bg={'gray.900'} borderRadius={'xl'} p={2}>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" fontWeight="bold" flex="1" textAlign={'left'}>
                Leagues
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {leagues?.map((league: any) => (
              <Text key={league.id} ml={3}>
                <Link
                  href={`/games/${league?.game?.slug}/leagues/${league.slug}`}
                >
                  {league.name}
                </Link>
              </Text>
            ))}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" fontWeight="bold" flex="1" textAlign={'left'}>
                Teams:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {teams?.map((team: any) => (
              <Box key={team.id} ml={3}>
                <Text>{team.name}</Text>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

const JoinLeagueModal = ({
  isOpen,
  onClose,
  clubId,
  leagueId,
  leagueName,
  teamName,
  setTeamName,
  joinLeagueMutation,
}: {
  isOpen: boolean;
  onClose: () => void;
  clubId: string | undefined;
  leagueId: string;
  leagueName: string;
  teamName: string;
  setTeamName: (value: string) => void;
  joinLeagueMutation: any;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'gray.900'} borderRadius={'xl'}>
        <ModalHeader>Join {leagueName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button
              colorScheme="blue"
              onClick={() =>
                clubId &&
                joinLeagueMutation.mutate({
                  leagueId,
                  teamName,
                  clubId,
                })
              }
            >
              Join
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const UserProfile = () => {
  const [teamName, setTeamName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session }: { data: any } = useSession();
  const profileQuery = trpc.user.profile.useQuery(session?.user?.id);
  const { data, isLoading, error } = profileQuery;
  const upcomingLeaguesQuery = trpc.league.upcoming.useQuery();
  const joinLeagueMutation = trpc.league.join.useMutation({
    onSuccess: () => {
      onClose();
      setTeamName('');
      upcomingLeaguesQuery.refetch();
      profileQuery.refetch();
    },
  });

  if (isLoading || upcomingLeaguesQuery.isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  const upcomingLeagues = upcomingLeaguesQuery.data || [];
  const joinedLeagues = data?.club?.leagues.map((league) => league.id) || [];

  return (
    <Flex h="100%" p={2} gap={4}>
      <Sidebar leagues={data?.club?.leagues} teams={data?.club?.teams} />
      <Tabs
        bg={'gray.900'}
        borderRadius={'xl'}
        variant="soft-rounded"
        colorScheme="blue"
        p={2}
        w="100%"
      >
        <TabList>
          <Tab fontSize="sm">Upcoming Matches</Tab>
          <Tab fontSize="sm">Upcoming Leagues</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>
              Your upcoming matches will show here when we implement that
              feature!
            </Text>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {upcomingLeagues.map((league: any) => (
                <VStack key={league.id} align="stretch">
                  <HStack align="stretch" justify="space-between">
                    <VStack spacing={2} align="stretch">
                      <Heading as="h3" size="md">
                        {league.name}
                      </Heading>
                      <Text>
                        {new Date(league.seasonStart).toDateString()} -{' '}
                        {new Date(league.seasonEnd).toDateString()}
                      </Text>
                    </VStack>
                    {!joinedLeagues.includes(league.id) ? (
                      <>
                        <JoinLeagueModal
                          isOpen={isOpen}
                          onClose={onClose}
                          leagueId={league.id}
                          leagueName={league.name}
                          clubId={data?.club.id}
                          teamName={teamName}
                          setTeamName={setTeamName}
                          joinLeagueMutation={joinLeagueMutation}
                        />
                        <Button
                          colorScheme="blue"
                          size="sm"
                          variant="outline"
                          onClick={onOpen}
                          isLoading={joinLeagueMutation.isLoading}
                        >
                          Join League
                        </Button>
                      </>
                    ) : (
                      <Button
                        as="a"
                        colorScheme="blue"
                        size="sm"
                        variant="outline"
                        cursor="pointer"
                        href={`/games/${league.game.slug}/leagues/${league.slug}/availability`}
                      >
                        Set Availability
                      </Button>
                    )}
                  </HStack>
                  <Divider />
                </VStack>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export { JoinLeagueModal };
export default UserProfile;

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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import { useState } from 'react';
import { Link } from '@chakra-ui/next-js';

const characters = [
  'Banjo & Kazooie',
  'Bayonetta',
  'Bowser',
  'Bowser Jr.',
  'Byleth',
  'Captain Falcon',
  'Chrom',
  'Cloud',
  'Corrin',
  'Daisy',
  'Dark Pit',
  'Dark Samus',
  'Diddy Kong',
  'Donkey Kong',
  'Dr. Mario',
  'Duck Hunt',
  'Falco',
  'Fox',
  'Ganondorf',
  'Greninja',
  'Hero',
  'Ice Climbers',
  'Ike',
  'Incineroar',
  'Inkling',
  'Isabelle',
  'Jigglypuff',
  'Joker',
  'Kazuya',
  'Ken',
  'King Dedede',
  'King K. Rool',
  'Kirby',
  'Link',
  'Little Mac',
  'Lucario',
  'Lucas',
  'Lucina',
  'Luigi',
  'Mario',
  'Marth',
  'Mega Man',
  'Meta Knight',
  'Mewtwo',
  'Mii Brawler',
  'Mii Gunner',
  'Mii Swordfighter',
  'Min Min',
  'Mr. Game & Watch',
  'Ness',
  'Olimar',
  'Pac-Man',
  'Palutena',
  'Peach',
  'Pichu',
  'Pikachu',
  'Piranha Plant',
  'Pit',
  'Pokémon Trainer',
  'Pyra/Mythra',
  'Richter',
  'Ridley',
  'R.O.B.',
  'Robin',
  'Rosalina & Luma',
  'Roy',
  'Ryu',
  'Samus',
  'Sephiroth',
  'Sheik',
  'Shulk',
  'Simon',
  'Snake',
  'Sonic',
  'Sora',
  'Steve',
  'Terry',
  'Toon Link',
  'Villager',
  'Wario',
  'Wii Fit Trainer',
  'Wolf',
  'Yoshi',
  'Young Link',
  'Zelda',
  'Zero Suit Samus',
];

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

const SubmitScoreModal = ({
  isOpen,
  onClose,
  matchId,
  teamSide,
  teamId,
}: {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  teamSide: string;
  teamId: string;
}) => {
  const toast = useToast();
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playerThree, setPlayerThree] = useState('');
  const [playerOneStocks, setPlayerOneStocks] = useState(0);
  const [playerTwoStocks, setPlayerTwoStocks] = useState(0);
  const [playerThreeStocks, setPlayerThreeStocks] = useState(0);
  const [playerOneCharacter, setPlayerOneCharacter] = useState('');
  const [playerTwoCharacter, setPlayerTwoCharacter] = useState('');
  const [playerThreeCharacter, setPlayerThreeCharacter] = useState('');
  const [playerOneWin, setPlayerOneWin] = useState(true);
  const [playerTwoWin, setPlayerTwoWin] = useState(true);
  const [playerThreeWin, setPlayerThreeWin] = useState(true);
  const [playerOneHandle, setPlayerOneHandle] = useState('');
  const [playerTwoHandle, setPlayerTwoHandle] = useState('');
  const [playerThreeHandle, setPlayerThreeHandle] = useState('');

  const createStatMutation = trpc.stat.create.useMutation();
  const updateMatchMutation = trpc.match.update.useMutation();
  const upsertPlayerMutation = trpc.player.upsert.useMutation({
    onSuccess: (data) => {
      if (data.name === playerOne) {
        createStatMutation.mutate({
          playerId: data.id,
          matchId,
          teamId,
          character: playerOneCharacter,
          stock: playerOneStocks,
          win: playerOneWin,
        });
      } else if (data.name === playerTwo) {
        createStatMutation.mutate({
          playerId: data.id,
          matchId,
          teamId,
          character: playerTwoCharacter,
          stock: playerTwoStocks,
          win: playerTwoWin,
        });
      } else if (data.name === playerThree) {
        createStatMutation.mutate({
          playerId: data.id,
          matchId,
          teamId,
          character: playerThreeCharacter,
          stock: playerThreeStocks,
          win: playerThreeWin,
        });
      }
      toast({
        title: 'Score Submitted',
        description: 'Your score has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
  });

  const handleSubmit = () => {
    const playerOneScore = playerOneWin ? 1 : 0;
    const playerTwoScore = playerTwoWin ? 1 : 0;
    const playerThreeScore = playerThreeWin ? 1 : 0;

    updateMatchMutation.mutate({
      id: matchId,
      [`${teamSide}Score`]: playerOneScore + playerTwoScore + playerThreeScore,
    });
    upsertPlayerMutation.mutate({
      name: playerOne,
      teamId,
      handle: playerOneHandle,
    });
    upsertPlayerMutation.mutate({
      name: playerTwo,
      teamId,
      handle: playerTwoHandle,
    });
    upsertPlayerMutation.mutate({
      name: playerThree,
      teamId,
      handle: playerThreeHandle,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={'gray.900'} borderRadius={'xl'}>
        <ModalHeader>Submit Score</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} direction="column">
            <Heading size="md">Player 1</Heading>
            <Text>Name</Text>
            <Input
              placeholder="Name"
              onChange={(e) => setPlayerOne(e.target.value)}
            />
            <Text>Handle</Text>
            <Input
              placeholder="Handle"
              onChange={(e) => setPlayerOneHandle(e.target.value)}
            />
            <Text>Stocks</Text>
            <NumberInput
              min={0}
              max={3}
              onChange={(valueString) =>
                setPlayerOneStocks(parseInt(valueString))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text>Character</Text>
            <Select
              placeholder="Character"
              onChange={(e) => setPlayerOneCharacter(e.target.value)}
            >
              {characters.map((character) => (
                <option key={character}>{character}</option>
              ))}
            </Select>
            <Text>Win</Text>
            <Select
              onChange={(e) =>
                setPlayerOneWin(e.target.value === 'Yes' ? true : false)
              }
            >
              <option>Yes</option>
              <option>No</option>
            </Select>

            <Heading size="md">Player 2</Heading>
            <Text>Name</Text>
            <Input
              placeholder="Name"
              onChange={(e) => setPlayerTwo(e.target.value)}
            />
            <Text>Handle</Text>
            <Input
              placeholder="Handle"
              onChange={(e) => setPlayerTwoHandle(e.target.value)}
            />
            <Text>Stocks</Text>
            <NumberInput
              min={0}
              max={3}
              onChange={(valueString) =>
                setPlayerTwoStocks(parseInt(valueString))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text>Character</Text>
            <Select
              placeholder="Character"
              onChange={(e) => setPlayerTwoCharacter(e.target.value)}
            >
              {characters.map((character) => (
                <option key={character}>{character}</option>
              ))}
            </Select>
            <Text>Win</Text>
            <Select
              onChange={(e) =>
                setPlayerTwoWin(e.target.value === 'Yes' ? true : false)
              }
            >
              <option>Yes</option>
              <option>No</option>
            </Select>

            <Heading size="md">Player 3</Heading>
            <Text>Name</Text>
            <Input
              placeholder="Name"
              onChange={(e) => setPlayerThree(e.target.value)}
            />
            <Text>Handle</Text>
            <Input
              placeholder="Handle"
              onChange={(e) => setPlayerThreeHandle(e.target.value)}
            />
            <Text>Stocks</Text>
            <NumberInput
              min={0}
              max={3}
              onChange={(valueString) =>
                setPlayerThreeStocks(parseInt(valueString))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text>Character</Text>
            <Select
              placeholder="Character"
              onChange={(e) => setPlayerThreeCharacter(e.target.value)}
            >
              {characters.map((character) => (
                <option key={character}>{character}</option>
              ))}
            </Select>
            <Text>Win</Text>
            <Select
              onChange={(e) =>
                setPlayerThreeWin(e.target.value === 'Yes' ? true : false)
              }
            >
              <option>Yes</option>
              <option>No</option>
            </Select>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
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

const UpcomingMatches = ({ clubId }: { clubId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const matchQuery = trpc.match.getByClubId.useQuery(clubId);
  const { data, isLoading, error } = matchQuery;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <VStack spacing={4} align="stretch">
      {data?.map((match: any) => {
        const teamSide = match.blueTeam.clubId === clubId ? 'blue' : 'red';
        return (
          <VStack key={match.id} align="stretch">
            <HStack align="stretch" justify="space-between">
              <VStack spacing={2} align="stretch">
                <Text>
                  {match.blueTeam.name} vs {match.redTeam.name}
                </Text>
                <Text>{new Date(match.date).toDateString()}</Text>
              </VStack>
              <SubmitScoreModal
                isOpen={isOpen}
                onClose={onClose}
                matchId={match.id}
                teamSide={teamSide}
                teamId={match[`${teamSide}Team`].id}
              />
              <Button
                colorScheme="blue"
                size="sm"
                variant="outline"
                onClick={() => onOpen()}
              >
                Submit Score
              </Button>
            </HStack>
            <Divider />
          </VStack>
        );
      })}
    </VStack>
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
            {data?.club?.id && <UpcomingMatches clubId={data?.club?.id} />}
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

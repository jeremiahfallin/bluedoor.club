import { Suspense, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { characters } from '~/utils/constants';
import { trpc } from '~/utils/trpc';

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

interface Match {
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
}

const weekNumber = (date: Date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

function TimeDisplay({ date }: { date: Date }) {
  const [time, setTime] = useState(date.toUTCString());

  useEffect(() => {
    setTime(() => {
      return date.toLocaleString();
    });
  }, [time, date]);

  return <>{time}</>;
}

function TableRow({ match, clubId }: any) {
  const toast = useToast();
  const [blueScore, setBlueScore] = useState(match.blueScore);
  const [redScore, setRedScore] = useState(match.redScore);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditingBlue, setIsEditingBlue] = useState(false);
  const [isEditingRed, setIsEditingRed] = useState(false);
  const blueTeamStats = match.stat.filter(
    (stat: any) => stat.teamId === match.blueTeam.id,
  );
  const redTeamStats = match.stat.filter(
    (stat: any) => stat.teamId === match.redTeam.id,
  );
  const [blueDetails, setBlueDetails] = useState<any>({
    player1: {
      name: blueTeamStats[0]?.player.name || '',
      handle: blueTeamStats[0]?.player.handle || '',
      character: blueTeamStats[0]?.character || '',
      matchWins: blueTeamStats[0]?.stock || 0,
      playerId: blueTeamStats[0]?.player.id || '',
      statId: blueTeamStats[0]?.id || '',
    },
    player2: {
      name: blueTeamStats[1]?.player.name || '',
      handle: blueTeamStats[1]?.player.handle || '',
      character: blueTeamStats[1]?.character || '',
      matchWins: blueTeamStats[1]?.stock || 0,
      playerId: blueTeamStats[1]?.player.id || '',
      statId: blueTeamStats[1]?.id || '',
    },
    player3: {
      name: blueTeamStats[2]?.player.name || '',
      handle: blueTeamStats[2]?.player.handle || '',
      character: blueTeamStats[2]?.character || '',
      matchWins: blueTeamStats[2]?.stock || 0,
      playerId: blueTeamStats[2]?.player.id || '',
      statId: blueTeamStats[2]?.id || '',
    },
  });
  const [redDetails, setRedDetails] = useState<any>({
    player1: {
      name: redTeamStats[0]?.player.name || '',
      handle: redTeamStats[0]?.player.handle || '',
      character: redTeamStats[0]?.character || '',
      matchWins: redTeamStats[0]?.stock || 0,
      playerId: redTeamStats[0]?.player.id || '',
      statId: redTeamStats[0]?.id || '',
    },
    player2: {
      name: redTeamStats[1]?.player.name || '',
      handle: redTeamStats[1]?.player.handle || '',
      character: redTeamStats[1]?.character || '',
      matchWins: redTeamStats[1]?.stock || 0,
      playerId: redTeamStats[1]?.player.id || '',
      statId: redTeamStats[1]?.id || '',
    },
    player3: {
      name: redTeamStats[2]?.player.name || '',
      handle: redTeamStats[2]?.player.handle || '',
      character: redTeamStats[2]?.character || '',
      matchWins: redTeamStats[2]?.stock || 0,
      playerId: redTeamStats[2]?.player.id || '',
      statId: redTeamStats[2]?.id || '',
    },
  });

  const canEditBlue = match.blueTeam.clubId === clubId;
  const canEditRed = match.redTeam.clubId === clubId;

  const createStatMutation = trpc.stat.create.useMutation();
  const updateStatMutation = trpc.stat.update.useMutation();
  const updateMatchMutation = trpc.match.update.useMutation();
  const upsertPlayerMutation = trpc.player.upsert.useMutation({
    onSuccess: (data: any) => {
      const playerKey = Object.keys(blueDetails).find(
        (key) => blueDetails[key].name === data.name,
      );
      if (!playerKey) return;
      createStatMutation.mutate({
        character: blueDetails[playerKey].character,
        matchId: match.id,
        playerId: data.id,
        stock: blueDetails[playerKey].matchWins,
        teamId: match.blueTeam.id,
        win: blueDetails[playerKey].matchWins >= 2,
      });
      toast({
        title: 'Score Submitted',
        description: 'Your score has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleClick = () => {
    if (canEditBlue && !isEditingBlue) {
      setIsEditingBlue(true);
      return;
    }
    if (canEditRed && !isEditingRed) {
      setIsEditingRed(true);
      return;
    }
    if ((canEditBlue || canEditRed) && (isEditingBlue || isEditingRed)) {
      const data = {} as any;
      if (canEditBlue && blueScore) {
        data['blueScore'] = parseInt(blueScore);
      }
      if (canEditRed && redScore) {
        data['redScore'] = parseInt(redScore);
      }
      updateMatchMutation.mutate({
        id: match.id,
        ...data,
      });
    }
    if (isEditingBlue) {
      upsertPlayerMutation.mutate({
        name: blueDetails.player1.name,
        teamId: match.blueTeam.id,
        handle: blueDetails.player1.handle,
      });
      upsertPlayerMutation.mutate({
        name: blueDetails.player2.name,
        teamId: match.blueTeam.id,
        handle: blueDetails.player2.handle,
      });
      upsertPlayerMutation.mutate({
        name: blueDetails.player3.name,
        teamId: match.blueTeam.id,
        handle: blueDetails.player3.handle,
      });
      setIsEditingBlue(false);
    }
    if (isEditingRed) {
      upsertPlayerMutation.mutate({
        name: redDetails.player1.name,
        teamId: match.redTeam.id,
        handle: redDetails.player1.handle,
      });
      upsertPlayerMutation.mutate({
        name: redDetails.player2.name,
        teamId: match.redTeam.id,
        handle: redDetails.player2.handle,
      });
      upsertPlayerMutation.mutate({
        name: redDetails.player3.name,
        teamId: match.redTeam.id,
        handle: redDetails.player3.handle,
      });
      setIsEditingRed(false);
    }
  };

  return (
    <>
      <Tr background={`${colors[weekNumber(match.date) % colors.length]}.700`}>
        <Td>
          <TimeDisplay date={match.date} />
        </Td>
        <Td>{match.blueTeam.name}</Td>
        <Td>{match.blueScore}</Td>
        <Td>{match.redTeam.name}</Td>
        <Td>{match.redScore}</Td>
        <Td>
          <Button
            variant={'solid'}
            colorScheme="green"
            onClick={() => setIsDetailsOpen((prev) => !prev)}
          >
            Details
          </Button>
        </Td>
      </Tr>
      {isDetailsOpen && (
        <Tr>
          <Td p={0} colSpan={6}>
            <Table>
              <Thead background="green.700">
                <Tr>
                  <Td px={4}>Score</Td>
                  <Td px={4}>Player 1</Td>
                  <Td px={4}>Handle</Td>
                  <Td px={4}>Character</Td>
                  <Td px={4}>Match Wins</Td>
                  <Td px={4}>Player 2</Td>
                  <Td px={4}>Handle</Td>
                  <Td px={4}>Character</Td>
                  <Td px={4}>Match Wins</Td>
                  <Td px={4}>Player 3</Td>
                  <Td px={4}>Handle</Td>
                  <Td px={4}>Character</Td>
                  <Td px={4}>Match Wins</Td>
                  <Td px={4}>Edit</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Tr background={'blue.700'}>
                  {isEditingBlue ? (
                    <Td>
                      <Input
                        onChange={(e) => setBlueScore(e.target.value)}
                        value={blueScore}
                      />
                    </Td>
                  ) : (
                    <Td>{blueScore}</Td>
                  )}
                  {Object.keys(blueDetails).map((key, idx) => {
                    if (isEditingBlue) {
                      return (
                        <>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setBlueDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].name = e.target.value;
                                  return newP;
                                })
                              }
                              value={blueDetails[key].name}
                            />
                          </Td>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setBlueDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].handle = e.target.value;
                                  return newP;
                                })
                              }
                              value={blueDetails[key].handle}
                            />
                          </Td>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setBlueDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].character = e.target.value;
                                  return newP;
                                })
                              }
                              value={blueDetails[key].character}
                            />
                          </Td>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setBlueDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].matchWins = e.target.value;
                                  return newP;
                                })
                              }
                              value={blueDetails[key].matchWins}
                            />
                          </Td>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Td>{blueDetails[key].name}</Td>
                          <Td>{blueDetails[key].handle}</Td>
                          <Td>{blueDetails[key].character}</Td>
                          <Td>{blueDetails[key].matchWins}</Td>
                        </>
                      );
                    }
                  })}
                  <Td>
                    {canEditBlue && (
                      <Button onClick={handleClick}>
                        {isEditingBlue ? 'Save' : 'Edit'}
                      </Button>
                    )}
                  </Td>
                </Tr>

                <Tr background={'red.700'}>
                  {isEditingRed ? (
                    <Td>
                      <Input
                        onChange={(e) => setRedScore(e.target.value)}
                        value={redScore}
                      />
                    </Td>
                  ) : (
                    <Td>{redScore}</Td>
                  )}
                  {Object.keys(redDetails).map((key, idx) => {
                    if (isEditingRed) {
                      return (
                        <>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setRedDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].name = e.target.value;
                                  return newP;
                                })
                              }
                              value={redDetails[key].name}
                            />
                          </Td>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setRedDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].handle = e.target.value;
                                  return newP;
                                })
                              }
                              value={redDetails[key].handle}
                            />
                          </Td>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setRedDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].character = e.target.value;
                                  return newP;
                                })
                              }
                              value={redDetails[key].character}
                            />
                          </Td>
                          <Td>
                            <Input
                              onChange={(e) =>
                                setRedDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].matchWins = e.target.value;
                                  return newP;
                                })
                              }
                              value={redDetails[key].matchWins}
                            />
                          </Td>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Td>{redDetails[key].name}</Td>
                          <Td>{redDetails[key].handle}</Td>
                          <Td>{redDetails[key].character}</Td>
                          <Td>{redDetails[key].matchWins}</Td>
                        </>
                      );
                    }
                  })}
                  <Td>
                    {canEditRed && (
                      <Button onClick={handleClick}>
                        {isEditingRed ? 'Save' : 'Edit'}
                      </Button>
                    )}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Td>
        </Tr>
      )}
    </>
  );
}

export default function Schedule({ data, clubId }: { data: any; clubId: any }) {
  if (data.matches.length === 0) {
    return <Text>No matches scheduled yet. Check back later!</Text>;
  }
  return (
    <Suspense fallback={null}>
      <Box as="main">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Time</Th>
                <Th>Home Team</Th>
                <Th>Home Score</Th>
                <Th>Away Team</Th>
                <Th>Away Score</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.matches.map((match: Match) => {
                // color background based on week number
                return (
                  <TableRow key={match.id} match={match} clubId={clubId} />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Suspense>
  );
}

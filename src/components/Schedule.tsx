import { Suspense, useState, useEffect, Fragment } from 'react';
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

function TableRow({ match, clubId, refetch }: any) {
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
  const upsertPlayerMutation = trpc.player.upsert.useMutation();

  const handleClick = async (color: string, isEditing: boolean) => {
    if (canEditBlue && !isEditing && color === 'blue') {
      setIsEditingBlue(true);
      return;
    }
    if (canEditRed && !isEditing && color === 'red') {
      setIsEditingRed(true);
      return;
    }
    if ((canEditBlue || canEditRed) && isEditing) {
      const data = {} as any;
      if (canEditBlue && blueScore && color === 'blue') {
        data['blueScore'] = parseInt(blueScore);
      }
      if (canEditRed && redScore && color === 'blue') {
        data['redScore'] = parseInt(redScore);
      }
      updateMatchMutation.mutate({
        id: match.id,
        ...data,
      });
    }
    if (isEditing && color === 'blue') {
      const b1 = await upsertPlayerMutation.mutateAsync({
        name: blueDetails.player1.name,
        teamId: match.blueTeam.id,
        [blueDetails.player1.handle !== '' ? 'handle' : '']:
          blueDetails.player1.handle,
      });
      const b1p = b1.id;
      const b2 = await upsertPlayerMutation.mutateAsync({
        name: blueDetails.player2.name,
        teamId: match.blueTeam.id,
        [blueDetails.player2.handle !== '' ? 'handle' : '']:
          blueDetails.player2.handle,
      });
      const b2p = b2.id;
      const b3 = await upsertPlayerMutation.mutateAsync({
        name: blueDetails.player3.name,
        teamId: match.blueTeam.id,
        [blueDetails.player3.handle !== '' ? 'handle' : '']:
          blueDetails.player3.handle,
      });
      const b3p = b3.id;
      if (blueDetails.player1.statId !== '' && b1p) {
        updateStatMutation.mutate({
          id: blueDetails.player1.statId,
          character: blueDetails.player1.character,
          matchId: match.id,
          playerId: b1p,
          stock: parseInt(blueDetails.player1.matchWins),
          teamId: match.blueTeam.id,
          win: blueDetails.player1.matchWins >= 2,
        });
      } else if (b1p) {
        createStatMutation.mutate({
          character: blueDetails.player1.character,
          matchId: match.id,
          playerId: b1p,
          stock: parseInt(blueDetails.player1.matchWins),
          teamId: match.blueTeam.id,
          win: blueDetails.player1.matchWins >= 2,
        });
      }
      if (blueDetails.player2.statId !== '' && b2p) {
        updateStatMutation.mutate({
          id: blueDetails.player2.statId,
          character: blueDetails.player2.character,
          matchId: match.id,
          playerId: b2p,
          stock: parseInt(blueDetails.player2.matchWins),
          teamId: match.blueTeam.id,
          win: blueDetails.player2.matchWins >= 2,
        });
      } else if (b2p) {
        createStatMutation.mutate({
          character: blueDetails.player2.character,
          matchId: match.id,
          playerId: b2p,
          stock: parseInt(blueDetails.player2.matchWins),
          teamId: match.blueTeam.id,
          win: blueDetails.player2.matchWins >= 2,
        });
      }
      if (blueDetails.player3.statId !== '' && b3p) {
        updateStatMutation.mutate({
          id: blueDetails.player3.statId,
          character: blueDetails.player3.character,
          matchId: match.id,
          playerId: b3p,
          stock: parseInt(blueDetails.player3.matchWins),
          teamId: match.blueTeam.id,
          win: blueDetails.player3.matchWins >= 2,
        });
      } else if (b3p) {
        createStatMutation.mutate({
          character: blueDetails.player3.character,
          matchId: match.id,
          playerId: b3p,
          stock: parseInt(blueDetails.player3.matchWins),
          teamId: match.blueTeam.id,
          win: blueDetails.player3.matchWins >= 2,
        });
      }
      toast({
        title: 'Score Submitted',
        description: 'Your score has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    if (isEditing && color === 'red') {
      const r1 = await upsertPlayerMutation.mutateAsync({
        name: redDetails.player1.name,
        teamId: match.redTeam.id,
        handle: redDetails.player1.handle,
        [redDetails.player1.handle !== '' ? 'handle' : '']:
          redDetails.player1.handle,
      });
      const r1p = r1.id;
      const r2 = await upsertPlayerMutation.mutateAsync({
        name: redDetails.player2.name,
        teamId: match.redTeam.id,
        [redDetails.player2.handle !== '' ? 'handle' : '']:
          redDetails.player2.handle,
      });
      const r2p = r2.id;
      const r3 = await upsertPlayerMutation.mutateAsync({
        name: redDetails.player3.name,
        teamId: match.redTeam.id,
        [redDetails.player3.handle !== '' ? 'handle' : '']:
          redDetails.player3.handle,
      });
      const r3p = r3.id;
      if (redDetails.player1.statId !== '' && r1p) {
        updateStatMutation.mutate({
          id: redDetails.player1.statId,
          character: redDetails.player1.character,
          matchId: match.id,
          playerId: r1p,
          stock: parseInt(redDetails.player1.matchWins),
          teamId: match.redTeam.id,
          win: redDetails.player1.matchWins >= 2,
        });
      } else if (r1p) {
        createStatMutation.mutate({
          character: redDetails.player1.character,
          matchId: match.id,
          playerId: r1p,
          stock: parseInt(redDetails.player1.matchWins),
          teamId: match.redTeam.id,
          win: redDetails.player1.matchWins >= 2,
        });
      }
      if (redDetails.player2.statId !== '' && r2p) {
        updateStatMutation.mutate({
          id: redDetails.player2.statId,
          character: redDetails.player2.character,
          matchId: match.id,
          playerId: r2p,
          stock: parseInt(redDetails.player2.matchWins),
          teamId: match.redTeam.id,
          win: redDetails.player2.matchWins >= 2,
        });
      } else if (r2p) {
        createStatMutation.mutate({
          character: redDetails.player2.character,
          matchId: match.id,
          playerId: r2p,
          stock: parseInt(redDetails.player2.matchWins),
          teamId: match.redTeam.id,
          win: redDetails.player2.matchWins >= 2,
        });
      }
      if (redDetails.player3.statId !== '' && r3p) {
        updateStatMutation.mutate({
          id: redDetails.player3.statId,
          character: redDetails.player3.character,
          matchId: match.id,
          playerId: r3p,
          stock: parseInt(redDetails.player3.matchWins),
          teamId: match.redTeam.id,
          win: redDetails.player3.matchWins >= 2,
        });
      } else if (r3p) {
        createStatMutation.mutate({
          character: redDetails.player3.character,
          matchId: match.id,
          playerId: r3p,
          stock: parseInt(redDetails.player3.matchWins),
          teamId: match.redTeam.id,
          win: redDetails.player3.matchWins >= 2,
        });
      }
      toast({
        title: 'Score Submitted',
        description: 'Your score has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    if (canEditBlue && isEditing && color === 'blue') {
      setIsEditingBlue(false);
      return;
    }
    if (canEditRed && isEditing && color === 'red') {
      setIsEditingRed(false);
      return;
    }
    refetch();
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
                  <Td px={4}>Player</Td>
                  <Td px={4}>Handle</Td>
                  <Td px={4}>Character</Td>
                  <Td px={4}>Match Wins</Td>
                  <Td px={4}>Edit</Td>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(blueDetails).map((key, idx) => {
                  if (isEditingBlue) {
                    return (
                      <Fragment key={key}>
                        <Tr background={'blue.700'}>
                          <Td>
                            {idx === 0 && (
                              <Input
                                onChange={(e) => setBlueScore(e.target.value)}
                                value={blueScore}
                              />
                            )}
                          </Td>
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
                            <Select
                              placeholder="Character"
                              value={blueDetails[key].character}
                              onChange={(e) =>
                                setBlueDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].character = e.target.value;
                                  return newP;
                                })
                              }
                            >
                              {characters.map((character) => (
                                <option key={character}>{character}</option>
                              ))}
                            </Select>
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
                          <Td p={1}>
                            {canEditBlue && idx === 0 && (
                              <Button
                                onClick={() =>
                                  handleClick('blue', isEditingBlue)
                                }
                              >
                                {isEditingBlue ? 'Save' : 'Edit'}
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      </Fragment>
                    );
                  } else {
                    return (
                      <Fragment key={key}>
                        <Tr background={'blue.700'}>
                          <Td>{idx === 0 ? blueScore : null}</Td>
                          <Td>{blueDetails[key].name}</Td>
                          <Td>{blueDetails[key].handle}</Td>
                          <Td>{blueDetails[key].character}</Td>
                          <Td>{blueDetails[key].matchWins}</Td>
                          <Td p={1}>
                            {canEditBlue && idx === 0 && (
                              <Button
                                onClick={() =>
                                  handleClick('blue', isEditingBlue)
                                }
                              >
                                {isEditingBlue ? 'Save' : 'Edit'}
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      </Fragment>
                    );
                  }
                })}

                {Object.keys(redDetails).map((key, idx) => {
                  if (isEditingRed) {
                    return (
                      <Fragment key={key}>
                        <Tr background={'red.700'}>
                          <Td>
                            {idx === 0 && (
                              <Input
                                onChange={(e) => setRedScore(e.target.value)}
                                value={redScore}
                              />
                            )}
                          </Td>
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
                            <Select
                              placeholder="Character"
                              value={redDetails[key].character}
                              onChange={(e) =>
                                setRedDetails((p: any) => {
                                  const newP = { ...p };
                                  newP[key].character = e.target.value;
                                  return newP;
                                })
                              }
                            >
                              {characters.map((character) => (
                                <option key={character}>{character}</option>
                              ))}
                            </Select>
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
                          <Td p={1}>
                            {canEditRed && idx === 0 && (
                              <Button
                                onClick={() => handleClick('red', isEditingRed)}
                              >
                                {isEditingRed ? 'Save' : 'Edit'}
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      </Fragment>
                    );
                  } else {
                    return (
                      <Fragment key={key}>
                        <Tr background={'red.700'}>
                          <Td>{idx === 0 ? redScore : null}</Td>
                          <Td>{redDetails[key].name}</Td>
                          <Td>{redDetails[key].handle}</Td>
                          <Td>{redDetails[key].character}</Td>
                          <Td>{redDetails[key].matchWins}</Td>
                          <Td p={1}>
                            {canEditRed && idx === 0 && (
                              <Button
                                onClick={() => handleClick('red', isEditingRed)}
                              >
                                {isEditingRed ? 'Save' : 'Edit'}
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      </Fragment>
                    );
                  }
                })}
              </Tbody>
            </Table>
          </Td>
        </Tr>
      )}
    </>
  );
}

export default function Schedule({
  data,
  clubId,
  refetch,
}: {
  data: any;
  clubId: any;
  refetch: any;
}) {
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
                  <TableRow
                    key={match.id}
                    match={match}
                    clubId={clubId}
                    refetch={refetch}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Suspense>
  );
}

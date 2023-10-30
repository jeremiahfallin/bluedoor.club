import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function PlayerStats({ data }: any) {
  const teamPoints = data.matches.reduce((acc: any, match: any) => {
    if (match.blueScore !== null || match.redScore !== null) {
      if (!acc[match.blueTeam.name]) {
        acc[match.blueTeam.name] = {};
        acc[match.blueTeam.name].points = match.bluePoints || 0;
        acc[match.blueTeam.name].matches = 1;
      } else {
        acc[match.blueTeam.name].points += match.blueScore;
        acc[match.blueTeam.name].matches += 1;
      }

      if (!acc[match.redTeam.name]) {
        acc[match.redTeam.name] = {};
        acc[match.redTeam.name].points = match.redPoints || 0;
        acc[match.redTeam.name].matches = 1;
      } else {
        acc[match.redTeam.name].points += match.redScore;
        acc[match.redTeam.name].matches += 1;
      }
    }
    return acc;
  }, {});
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Th>Team</Th>
          <Th>Matches</Th>
          <Th>Total Points</Th>
          <Th>Points Per Match</Th>
        </Thead>
        <Tbody>
          {Object.entries(teamPoints)
            .sort((a, b): any => a[0] > b[0])
            .map((team: any, idx: number) => {
              return (
                <Tr key={idx}>
                  <Td>{team[0]}</Td>
                  <Td>{team[1].matches}</Td>
                  <Td>{team[1].points}</Td>
                  <Td>{(team[1].points / team[1].matches).toFixed(2)}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

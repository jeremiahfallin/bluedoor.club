import {
  Box,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function LeagueParticipants({ data }: { data: any }) {
  console.log(data);
  return (
    <Box as="main">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Team</Th>
              <Th>Club</Th>
              <Th>Losses</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.teams.map((team: any) => {
              return (
                <Tr key={team.id}>
                  <Td>{team.name}</Td>
                  <Td>{team.club.name}</Td>
                  <Td>
                    <Link
                      color="blue.300"
                      href={`/games/${data.game.slug}/leagues/${data.slug}/availability`}
                    >
                      Set Availability
                    </Link>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

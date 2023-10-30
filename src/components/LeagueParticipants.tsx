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
import useProfileQuery from '~/hooks/useProfileQuery';

export default function LeagueParticipants({ data }: { data: any }) {
  const { data: profile } = useProfileQuery();
  return (
    <Box as="main">
      <TableContainer>
        <Table>
          {/* <Thead>
            <Tr>
              <Th>Team</Th>
              <Th>Club</Th>
              <Th>Availability</Th>
            </Tr>
          </Thead> */}
          <Tbody>
            {data.teams.map((team: any) => {
              const isClubOwner = profile?.clubId == team.clubId;
              return (
                <Tr key={team.id}>
                  <Td>{team.name}</Td>
                  <Td>{team.club && team.club?.name}</Td>
                  <Td>
                    {isClubOwner && (
                      <Link
                        color="blue.300"
                        href={`/games/${data.game.slug}/leagues/${data.slug}/availability`}
                      >
                        Set Availability
                      </Link>
                    )}
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

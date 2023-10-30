import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

export default function CharacterStats({ data }: any) {
  const stats = data.matches.flatMap((match: any) => {
    return match.stat;
  });
  const characterTotals = stats.reduce((acc: any, stat: any) => {
    const character = stat.character;
    if (!acc[character]) {
      acc[character] = 0;
    }
    acc[character] += 1;
    return acc;
  }, {});
  delete characterTotals[''];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Th>Character</Th>
          <Th>Matches Played</Th>
        </Thead>
        <Tbody>
          {Object.entries(characterTotals)
            .sort((a, b): any => a[0] > b[0])
            .map((team: any, idx: number) => {
              return (
                <Tr key={idx}>
                  <Td>{team[0]}</Td>
                  <Td>
                    <pre>{team[1]}</pre>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

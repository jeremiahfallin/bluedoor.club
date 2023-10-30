import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';

export default function CharacterStats({ data }: any) {
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

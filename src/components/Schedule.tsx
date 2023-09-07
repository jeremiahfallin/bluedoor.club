import { Suspense, useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

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

export default function Schedule({ data }: { data: any }) {
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
              </Tr>
            </Thead>
            <Tbody>
              {data.matches.map((match: Match) => {
                // color background based on week number
                return (
                  <Tr
                    key={match.id}
                    background={`${
                      colors[weekNumber(match.date) % colors.length]
                    }.700`}
                  >
                    <Td>
                      <TimeDisplay date={match.date} />
                    </Td>
                    <Td>{match.blueTeam.name}</Td>
                    <Td>{match.blueScore}</Td>
                    <Td>{match.redTeam.name}</Td>
                    <Td>{match.redScore}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Suspense>
  );
}

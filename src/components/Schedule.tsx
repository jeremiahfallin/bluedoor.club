import { Suspense, useState, useEffect } from 'react';
import NextError from 'next/error';
import {
  Box,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import { LeaguesWithMatches } from '~/server/routers/league';

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

const rulesets: { [char: string]: string } = {
  brawlhalla: 'https://docs.google.com/document/d/15-GDjGaiyWGPaBBGZMqPRrQSFmf7P-ww/edit',
  chess: 'https://docs.google.com/document/d/1ouT_7Fe7QV3hOwQNH8XcPmZ2pI_UngGc/edit',
  "rocket-league": 'https://docs.google.com/document/d/1K_VVnifGRR9m47-vY5ILNDdcgc_KETvK/edit',
};

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

export default function Schedule({ game }: { game: string }) {
  const leagueQuery = trpc.league.list.useQuery({ game });

  if (leagueQuery.error) {
    return (
      <NextError
        title={leagueQuery.error.message}
        statusCode={leagueQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (leagueQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const data = leagueQuery.data.leagues[0] as any as LeaguesWithMatches;

  return (
    <Suspense fallback={null}>
      <Box as="main">
        <TableContainer>
          <Table>
            <TableCaption>Season schedule,{" "}
              <Link href={rulesets[game]}>
                ruleset
              </Link>
            </TableCaption>
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
              {data.matches.map((league: any) => {
                // color background based on week number
                return (
                  <Tr
                    key={league.id}
                    background={`${
                      colors[weekNumber(league.date) % colors.length]
                    }.700`}
                  >
                    <Td>
                      <TimeDisplay date={league.date} />
                    </Td>
                    <Td>{league.blueTeam.name}</Td>
                    <Td>{league.blueScore}</Td>
                    <Td>{league.redTeam.name}</Td>
                    <Td>{league.redScore}</Td>
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

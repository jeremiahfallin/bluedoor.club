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
import { League } from '@prisma/client';

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

interface LeagueWithMatches extends League {
  matches: {
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
  }[];
}

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

const rulesets: { [char: string]: string } = {
  brawlhalla:
    'https://docs.google.com/document/d/15-GDjGaiyWGPaBBGZMqPRrQSFmf7P-ww/edit',
  chess:
    'https://docs.google.com/document/d/1ouT_7Fe7QV3hOwQNH8XcPmZ2pI_UngGc/edit',
  'rocket-league':
    'https://docs.google.com/document/d/1K_VVnifGRR9m47-vY5ILNDdcgc_KETvK/edit',
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
  const leagueQuery = trpc.league.getBySlug.useQuery(game);

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

  const data = leagueQuery.data as LeagueWithMatches;

  return (
    <Suspense fallback={null}>
      <Box as="main">
        <TableContainer>
          <Table>
            <TableCaption>
              Season schedule, <Link href={rulesets[game]}>ruleset</Link>
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

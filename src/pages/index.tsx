import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { trpc } from '~/utils/trpc';

interface Game {
  id: string;
  name: string;
  imageUrl: string;
}

interface League {
  id: string;
  name: string;
  gameId: string;
}

interface IndexProps {
  games: Game[];
  leagues: League[];
}

const IndexPage: React.FC<IndexProps> = () => {
  const gamesQuery = trpc.game.list.useQuery();
  const leaguesQuery = trpc.league.list.useQuery();

  if (gamesQuery.isLoading || leaguesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={8}>
        <VStack spacing={4}>
          <Heading>Welcome to the eSports Leagues Platform</Heading>
          <Text>
            Join and compete in your favorite games&apos; leagues today!
          </Text>
          <Button colorScheme="blue">Explore Games</Button>
        </VStack>

        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Featured Games</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {gamesQuery?.data?.map((game) => (
              <Box key={game.id} borderWidth={1} borderRadius="md" p={4}>
                <Heading size="md">{game.name}</Heading>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

        <VStack align="start" spacing={4} w="full">
          <Heading size="lg">Featured Leagues</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {leaguesQuery?.data?.map((league) => (
              <Box key={league.id} borderWidth={1} borderRadius="md" p={4}>
                <Heading size="md">{league.name}</Heading>
                <Text>Game ID: {league.gameId}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Container>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };

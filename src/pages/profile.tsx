import { useSession } from 'next-auth/react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';

const Sidebar = ({
  leagues,
  teams,
  players,
}: {
  leagues: any;
  teams: any;
  players: any;
}) => {
  return (
    <Box w="200px" bg={'gray.900'} borderRadius={'xl'}>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" fontWeight="bold" flex="1" textAlign={'left'}>
                Leagues
              </Box>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {leagues?.map((league: any) => (
              <Text key={league.id} ml={3}>
                {league.name}
              </Text>
            ))}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" fontWeight="bold" flex="1" textAlign={'left'}>
                Teams:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {teams?.map((team: any) => (
              <Box key={team.id} ml={3}>
                <Text>{team.name}</Text>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

const UserProfile = () => {
  const { data: session }: { data: any } = useSession();
  const { isLoading, error, data } = trpc.user.profile.useQuery(
    session?.user?.id,
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;
  console.log(data);

  return (
    <Flex h="100%" p={2} gap={4}>
      <Sidebar
        leagues={data?.club.leagues}
        teams={data?.club.teams}
        players={[]}
      />
      <VStack align="start">
        <Text fontSize="xl" fontWeight="bold">
          {data?.club.name}
        </Text>
        <Heading as="h3" fontSize="md" fontWeight="bold">
          Upcoming Matches
        </Heading>
        <Heading as="h3" fontSize="md" fontWeight="bold">
          Recent Matches
        </Heading>
      </VStack>
    </Flex>
  );
};

export default UserProfile;

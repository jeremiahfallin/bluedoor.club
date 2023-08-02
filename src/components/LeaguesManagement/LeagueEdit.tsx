import {
  Box,
  Collapse,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { trpc } from '~/utils/trpc';

export default function LeagueEdit({
  isOpen,
  league,
  onToggle,
  onLeagueUpdate,
}: {
  isOpen: boolean;
  league: {
    id: string;
    name: string;
    seasonStart: Date;
    seasonEnd: Date;
  };
  onToggle: () => void;
  onLeagueUpdate: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: league.name,
      seasonStart: league.seasonStart.toISOString().split('T')[0],
      seasonEnd: league.seasonEnd.toISOString().split('T')[0],
    },
  });
  const updateLeagueMutation = trpc.league.update.useMutation({
    onSuccess: onLeagueUpdate,
  });
  const handleUpdateLeague = (data: any) => {
    updateLeagueMutation.mutate({ id: league.id, ...data });
    onToggle();
  };

  return (
    <Collapse in={isOpen} animateOpacity unmountOnExit>
      <form onSubmit={handleSubmit(handleUpdateLeague)}>
        <FormControl>
          <Flex direction="column" gap={4} w="100%">
            <Box>
              <FormLabel>League Name</FormLabel>
              <Input {...register('name', { required: true })} />
              {errors.name && (
                <FormErrorMessage>League Name is required</FormErrorMessage>
              )}
            </Box>
            <Box>
              <FormLabel>Season Start</FormLabel>
              <Input
                type="date"
                {...register('seasonStart', { required: true })}
              />
              {errors.seasonStart && (
                <FormErrorMessage>Season Start is required</FormErrorMessage>
              )}
            </Box>
            <Box>
              <FormLabel>Season End</FormLabel>
              <Input
                type="date"
                {...register('seasonEnd', { required: true })}
              />
              {errors.seasonEnd && (
                <FormErrorMessage>Season End is required</FormErrorMessage>
              )}
            </Box>
            <Flex gap={2}>
              <Button colorScheme="blue" type="submit">
                Update
              </Button>
              <Button variant="ghost" onClick={onToggle}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </FormControl>
      </form>
    </Collapse>
  );
}

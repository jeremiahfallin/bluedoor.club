// components/LeagueModal.tsx
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';

interface LeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  leagueName: string;
  setLeagueName: (name: string) => void;
  action: () => void;
  actionLabel: string;
  header: string;
  games?: {
    id: string;
    name: string;
  }[];
  setGameId: (game: string) => void;
  seasonStart: Date;
  setSeasonStart: (date: Date) => void;
  seasonEnd: Date;
  setSeasonEnd: (date: Date) => void;
}

const LeagueModal: React.FC<LeagueModalProps> = ({
  isOpen,
  onClose,
  leagueName,
  setLeagueName,
  action,
  actionLabel,
  header,
  games,
  setGameId,
  seasonStart,
  setSeasonStart,
  seasonEnd,
  setSeasonEnd,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex direction="column" gap={2}>
              <FormLabel m={0}>League Name</FormLabel>
              <Input
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
              <FormLabel m={0}>Game</FormLabel>
              <Select
                placeholder="Select game"
                onChange={(e) => setGameId(e.target.value)}
              >
                {games?.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </Select>
            </Flex>
            <FormLabel htmlFor="startDate">Start Date</FormLabel>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={seasonStart.toISOString().split('T')[0]}
              onChange={(e) => setSeasonStart(new Date(e.target.value))}
            />
            <FormLabel htmlFor="endDate">End Date</FormLabel>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={seasonEnd.toISOString().split('T')[0]}
              onChange={(e) => setSeasonEnd(new Date(e.target.value))}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={action}>
            {actionLabel}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeagueModal;

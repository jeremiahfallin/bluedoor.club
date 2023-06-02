// components/MatchModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: {
    id: string;
    blueTeamId: string;
    redTeamId: string;
    date: Date;
    blueScore: number;
    redScore: number;
  };
  setMatch: (match: MatchModalProps['match']) => void;
  action: () => void;
  actionLabel: string;
  header: string;
}

const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  onClose,
  match,
  setMatch,
  action,
  actionLabel,
  header,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatch({
      ...match,
      [event.target.name]: event.target.value,
    });
  };

  const handleAction = () => {
    action();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="homeTeam">Home Team</FormLabel>
            <Input
              id="homeTeam"
              name="homeTeam"
              value={match.blueTeamId}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="awayTeam">Away Team</FormLabel>
            <Input
              id="awayTeam"
              name="awayTeam"
              value={match.redTeamId}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              id="date"
              name="date"
              type="date"
              value={match.date.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="score">Blue Score</FormLabel>
            <Input
              id="score"
              name="score"
              value={match.blueScore}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="score">Red Score</FormLabel>
            <Input
              id="score"
              name="score"
              value={match.redScore}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAction}>
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

export default MatchModal;

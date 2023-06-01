// components/LeagueModal.tsx
import {
  Button,
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
} from '@chakra-ui/react';

interface LeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  leagueName: string;
  setLeagueName: (name: string) => void;
  action: () => void;
  actionLabel: string;
  header: string;
}

const LeagueModal: React.FC<LeagueModalProps> = ({
  isOpen,
  onClose,
  leagueName,
  setLeagueName,
  action,
  actionLabel,
  header,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>League Name</FormLabel>
            <Input
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
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

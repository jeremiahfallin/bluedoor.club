// components/ClubModal.tsx
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

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubName: string;
  setClubName: (name: string) => void;
  clubSlug: string;
  setClubSlug: (slug: string) => void;
  action: () => void;
  actionLabel: string;
  header: string;
}

const ClubModal: React.FC<ClubModalProps> = ({
  isOpen,
  onClose,
  clubName,
  setClubName,
  clubSlug,
  setClubSlug,
  action,
  actionLabel,
  header,
}) => {
  function getAcronym(name: string) {
    const ignoreWords = ['the', 'of', '&'];
    return name
      .toLowerCase()
      .split(' ')
      .filter((word: string) => !ignoreWords.includes(word))
      .map((word: string) => word[0])
      .join('');
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Club Name</FormLabel>
            <Input
              value={clubName}
              onChange={(e) => {
                setClubName(e.target.value);
                setClubSlug(getAcronym(e.target.value));
              }}
            />
            <FormLabel>Club Slug</FormLabel>
            <Input
              value={clubSlug}
              onChange={(e) => setClubSlug(e.target.value)}
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

export default ClubModal;

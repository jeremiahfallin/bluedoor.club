// components/UserModal.tsx
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
  Select,
  Button,
} from '@chakra-ui/react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  setUserRole: (role: string) => void;
  action: () => void;
  actionLabel: string;
  header: string;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  userRole,
  setUserRole,
  action,
  actionLabel,
  header,
}) => {
  const handleUserRoleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserRole(event.target.value);
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
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select id="role" value={userRole} onChange={handleUserRoleChange}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </Select>
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

export default UserModal;

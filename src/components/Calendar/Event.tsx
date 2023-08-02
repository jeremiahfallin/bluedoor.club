import { Flex, Text } from '@chakra-ui/react';

export default function Event({ title }: { title: string }) {
  return (
    <Flex
      bg="gray.900"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={'gray'} fontWeight="bold" fontSize={'s'} textAlign="center">
        {title}
      </Text>
    </Flex>
  );
}

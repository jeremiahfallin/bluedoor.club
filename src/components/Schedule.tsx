import { Box } from '@chakra-ui/react';

export default function Schedule({ data }: { data: any }) {
  return (
    <Box as="main">
      <Box as="h1">Schedule</Box>
      <Box>
        {data.map((post) => (
          <Box key={post.id}>{post.title}</Box>
        ))}
      </Box>
    </Box>
  );
}

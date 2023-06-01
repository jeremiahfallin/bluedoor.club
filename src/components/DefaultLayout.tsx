import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>BlueDoor Esports</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="100%">
        <NavBar />
        <Box h="max-content">{children}</Box>
      </Box>
    </>
  );
};

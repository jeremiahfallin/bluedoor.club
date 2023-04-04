import Head from 'next/head';
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import NavBar from './NavBar';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Box as="main">{children}</Box>
    </>
  );
};

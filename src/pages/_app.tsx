import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <ChakraProvider theme={theme}>
        <DefaultLayout>{page}</DefaultLayout>
      </ChakraProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export { theme };
export default trpc.withTRPC(MyApp);

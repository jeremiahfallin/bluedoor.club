import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: any;
};

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
      },
      '#__next': {
        height: '100%',
      },
    },
  },
});

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <DefaultLayout>{page}</DefaultLayout>
        </ChakraProvider>
      </SessionProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export { theme };
export default trpc.withTRPC(MyApp);

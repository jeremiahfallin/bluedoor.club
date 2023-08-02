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

const theme = extendTheme({
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
      '.rbc-header': {
        color: 'white',
        padding: '10px',
      },
      '.rbc-background-event': {
        padding: '0px !important',
        borderRadius: '0px !important',
        border: 'none !important',
        backgroundColor: 'transparent !important',
      },
      '.rbc-time-slot': {
        backgroundColor: 'gray.900',
        color: '#74a4c3',
        borderColor: 'teal.100 !important',
      },
      '.rbc-event-label': {
        display: 'none !important',
      },
      '.rbc-events-container': {
        width: '100% !important',
      },
      '.rbc-timeslot-group': {
        minHeight: '120px !important',
      },
      '.rbc-label': {
        color: 'whiteAlpha.900',
      },
      '.rbc-active': {
        backgroundColor: 'gray.900',
      },
      '.rbc-today': {
        backgroundColor: 'gray.600',
      },
      '.rbc-toolbar button': {
        backgroundColor: 'blue.300',
      },

      hr: {
        margin: `1px 10px 1px 0px`,
        borderTop: `1px solid #eee`,
      },

      '.year-property-panel td': {
        paddingBottom: '1rem',
      },

      '.e-schedule .e-schedule-toolbar .e-icon-schedule-print::before': {
        content: "'e973'",
      },

      '.e-schedule .e-schedule-toolbar .e-icon-schedule-pdf::before': {
        content: "'e7c8'",
      },

      '.custom-field-row': {
        marginBottom: '20px',
      },

      '.multi-prop div': {
        paddingLeft: 0,
        paddingTop: 0,
      },
      '.year-view.e-schedule .e-timeline-year-view .e-resource-column-table .year-view.e-schedule .e-timeline-year-view .e-resource-left-td':
        {
          width: '120px',
        },
      '.inline-edit.e-schedule .e-timeline-view .e-resource-left-td .inline-edit.e-schedule .e-timeline-month-view .e-resource-left-td':
        {
          width: `150px`,
        },
      '.time-scale.e-schedule.e-device .e-vertical-view .e-left-indent .time-scale.e-schedule.e-device .e-vertical-view .e-time-cells-wrap':
        {
          width: '50px',
        },
      '.time-scale.e-schedule .e-timeline-view .e-date-header-wrap table col .time-scale.e-schedule .e-timeline-view .e-content-wrap table col':
        {
          width: `75px`,
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

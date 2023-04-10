/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { leagueRouter } from './league';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  league: leagueRouter,
});

export type AppRouter = typeof appRouter;

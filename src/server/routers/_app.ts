/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { clubRouter } from './clubRouter';
import { gameRouter } from './gameRouter';
import { leagueRouter } from './leagueRouter';
import { matchRouter } from './matchRouter';
import { userRouter } from './userRouter';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  club: clubRouter,
  game: gameRouter,
  league: leagueRouter,
  match: matchRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

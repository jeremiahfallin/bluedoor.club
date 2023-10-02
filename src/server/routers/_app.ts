/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { clubRouter } from './clubRouter';
import { gameRouter } from './gameRouter';
import { leagueRouter } from './leagueRouter';
import { matchRouter } from './matchRouter';
import { userRouter } from './userRouter';
import { availabilityRouter } from './availabilityRouter';
import { inviteRouter } from './inviteRouter';
import { playerRouter } from './playerRouter';
import { statRouter } from './statRouter';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  availability: availabilityRouter,
  club: clubRouter,
  game: gameRouter,
  invite: inviteRouter,
  league: leagueRouter,
  match: matchRouter,
  player: playerRouter,
  stat: statRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

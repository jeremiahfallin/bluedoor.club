// src/server/routers/matchRouter.ts
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as matchService from '../services/matchService';

export const matchRouter = router({
  list: publicProcedure.query(async () => {
    const matches = await matchService.getMatches();
    return matches;
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const match = await matchService.getMatchById(input);
    return match;
  }),
});

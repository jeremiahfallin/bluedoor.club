// src/server/routers/statRouter.ts
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as statService from '../services/statService';

export const statRouter = router({
  create: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
        playerId: z.string(),
        teamId: z.string(),
        character: z.string(),
        stock: z.number(),
        win: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const stat = await statService.createStat(input);
      return stat;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await statService.deleteStat(input);
    return true;
  }),
});

// src/server/routers/playerRouter.ts
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as playerService from '../services/playerService';

export const playerRouter = router({
  upsert: publicProcedure
    .input(
      z.object({
        name: z.string(),
        handle: z.string().optional(),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const player = await playerService.upsertPlayer(input);
      return player;
    }),
});

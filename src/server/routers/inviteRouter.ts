import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as inviteService from '../services/inviteService';

export const inviteRouter = router({
  create: publicProcedure
    .input(
      z.object({
        clubId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const newInvite = await inviteService.createInvite(input);
      return newInvite;
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const invite = await inviteService.getInvite(input);
      return invite;
    }),
});

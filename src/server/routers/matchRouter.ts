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
  create: publicProcedure
    .input(
      z.object({
        leagueId: z.string(),
        blueTeamId: z.string(),
        redTeamId: z.string(),
        blueScore: z.number().optional(),
        redScore: z.number().optional(),
        date: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const match = await matchService.createMatch(input);
      return match;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        blueTeamScore: z.number().optional(),
        redTeamScore: z.number().optional(),
        date: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedMatch = await matchService.updateMatch(input);
      return updatedMatch;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await matchService.deleteMatch(input);
    return true;
  }),
});

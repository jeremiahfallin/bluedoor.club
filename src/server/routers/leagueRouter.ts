import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as leagueService from '../services/leagueService';

export const leagueRouter = router({
  list: publicProcedure.query(async () => {
    const leagues = await leagueService.getAllLeagues();
    return leagues;
  }),
  upcoming: publicProcedure.query(async () => {
    const leagues = await leagueService.getUpcomingLeagues();
    return leagues;
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const league = await leagueService.getLeagueById(input);
    return league;
  }),
  getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    const league = await leagueService.getLeagueBySlug(input);
    return league;
  }),
  getByGameSlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    const league = await leagueService.getLeagueByGameSlug(input);
    return league;
  }),

  getTeamsByLeagueSlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const teams = await leagueService.getTeamsByLeagueSlug(input);
      return teams;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        gameId: z.string(),
        seasonStart: z.date(),
        seasonEnd: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const newLeague = await leagueService.createLeague(input);
      return newLeague;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        seasonStart: z.string(),
        seasonEnd: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedLeague = await leagueService.updateLeague(input);
      return updatedLeague;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await leagueService.deleteLeague(input);
    return true;
  }),
  join: publicProcedure
    .input(
      z.object({
        leagueId: z.string(),
        teamName: z.string(),
        clubId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await leagueService.joinLeague(input);
      return true;
    }),
});

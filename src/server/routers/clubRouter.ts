import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

import * as clubService from '../services/clubService';

export const clubRouter = router({
  list: publicProcedure.query(async () => {
    const clubs = await clubService.getAllClubs();
    return clubs;
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const club = await clubService.getClubById(input);
    return club;
  }),
  getTeamById: publicProcedure
    .input(
      z.object({
        clubId: z.string(),
        teamId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { clubId, teamId } = input;
      const team = await clubService.getTeamByClubAndTeamId(clubId, teamId);
      return team;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, slug } = input;
      const club = await clubService.createClub(name, slug);
      return club;
    }),
});

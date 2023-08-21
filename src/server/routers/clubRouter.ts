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
  join: publicProcedure
    .input(
      z.object({
        clubId: z.string(),
        inviteId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { clubId, userId } = input;
      const club = await clubService.joinClub(clubId, userId);
      await clubService.markInviteRedeemed(input.inviteId);
      return club;
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
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, name, slug } = input;
      const club = await clubService.updateClub(id, name, slug);
      return club;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await clubService.deleteClub(input);
    return true;
  }),
});

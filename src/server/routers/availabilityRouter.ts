import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

import * as availabilityService from '../services/availabilityService';

export const availabilityRouter = router({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        times: z.array(
          z.object({
            startTime: z.date(),
            endTime: z.date(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, times } = input;
      const availability = await availabilityService.updateAvailability(
        id,
        times,
      );
      return availability;
    }),
  get: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        leagueId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { userId, leagueId } = input;
      if (!leagueId) {
        return null;
      }
      const availability = await availabilityService.getAvailability(
        userId,
        leagueId,
      );
      return availability;
    }),
  getByTeamIdAndLeagueId: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        leagueId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { teamId, leagueId } = input;
      const availability =
        await availabilityService.getAvailabilityByTeamIdAndLeagueId(
          teamId,
          leagueId,
        );
      return availability;
    }),
});

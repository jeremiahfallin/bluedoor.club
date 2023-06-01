import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as userService from '../services/userService';

interface UserWithClubWithLeagues extends userService.UserWithClub {
  club: userService.UserWithClub['club'] & {
    leagues: userService.UserWithClub['club']['teams'][0]['league'][];
  };
}

export const userRouter = router({
  list: publicProcedure.query(async () => {
    const users = await userService.getAllUsers();
    return users;
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await userService.getUserById(input);
    return user;
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(['USER', 'ADMIN']),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedUser = await userService.updateUser(input);
      return updatedUser;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await userService.deleteUser(input);
    return true;
  }),
  profile: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) {
        return null;
      }
      const user = (await userService.getProfileByUserId(
        input,
      )) as UserWithClubWithLeagues;
      if (!user) {
        return null;
      }
      const uniqueLeagues = user?.club.teams
        .map((team) => {
          return team.league;
        })
        .filter(
          (league, index, self) =>
            self.findIndex((l) => l.id === league.id) === index,
        );
      user.club.leagues = uniqueLeagues;

      return user;
    }),
});

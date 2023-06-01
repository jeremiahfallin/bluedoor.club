import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import * as gameService from '../services/gameService';

export const gameRouter = router({
  list: publicProcedure.query(async () => {
    const games = await gameService.getAllGames();
    return games;
  }),
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    const game = await gameService.getGameById(input);
    return game;
  }),
  getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    const game = await gameService.getGameBySlug(input);
    return game;
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        // Add other game properties as needed
      }),
    )
    .mutation(async ({ input }) => {
      const newGame = await gameService.createGame(input);
      return newGame;
    }),
  update: publicProcedure

    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        // Add other game properties as needed
      }),
    )
    .mutation(async ({ input }) => {
      const updatedGame = await gameService.updateGame(input);
      return updatedGame;
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    await gameService.deleteGame(input);
    return true;
  }),
});

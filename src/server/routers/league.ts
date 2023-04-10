/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for League.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultLeagueSelect = Prisma.validator<Prisma.LeagueSelect>()({
  id: true,
  name: true,
  slug: true,
  game: true,
  matches: {
    orderBy: {
      date: 'asc',
    },
    select: {
      id: true,
      date: true,
      blueTeam: true,
      blueScore: true,
      redTeam: true,
      redScore: true,
    },
  },
  teams: true,
  createdAt: true,
  updatedAt: true,
});

export type LeaguesWithMatches = Prisma.LeagueGetPayload<{
  include: { matches: true };
}>;

export const leagueRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        game: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor, game } = input;

      const items = await prisma.league.findMany({
        select: defaultLeagueSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {
          game: {
            slug: {
              equals: game,
            },
          },
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        leagues: items.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const league = await prisma.league.findUnique({
        where: { id },
        select: defaultLeagueSelect,
      });
      if (!league) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No league with id '${id}'`,
        });
      }
      return league;
    }),
  bySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { slug } = input;
      const league = await prisma.league.findUnique({
        where: { slug },
        select: defaultLeagueSelect,
      });
      if (!league) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No league with slug '${slug}'`,
        });
      }
      return league;
    }),
});

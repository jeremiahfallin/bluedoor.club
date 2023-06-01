// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import DiscordProvider from 'next-auth/providers/discord';
import { prisma } from '~/server/prisma';
import { env } from '~/server/env';

export const authOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      profile(profile: any) {
        let image_url: string;

        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator, 10) % 5;
          image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
          image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        return {
          id: profile.id,
          name: profile.username,
          discriminator: profile.discriminator,
          image: image_url,
          email: profile.email,
          emailVerified: profile.verified,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);

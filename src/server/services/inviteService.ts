import { PrismaClient, Invite } from '@prisma/client';

const prisma = new PrismaClient();

export async function createInvite(input: { clubId: string }): Promise<Invite> {
  return await prisma.invite.create({ data: input });
}

export async function getInvite(input: { id: string }): Promise<Invite | null> {
  return await prisma.invite.findUnique({
    where: { id: input.id },
    include: { club: true },
  });
}

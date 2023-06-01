import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id } });
}

export interface UserWithClub extends User {
  club: {
    id: string;
    name: string;
    teams: {
      id: string;
      name: string;
      league: {
        id: string;
        name: string;
      };
    }[];
  };
}

export async function getProfileByUserId(
  id: string,
): Promise<UserWithClub | null> {
  return (await prisma.user.findUnique({
    where: { id },
    include: {
      club: {
        include: {
          teams: {
            include: {
              league: true,
            },
          },
        },
      },
    },
  })) as UserWithClub;
}

export async function updateUser(input: {
  id: string;
  role: 'USER' | 'ADMIN';
}): Promise<User | null> {
  const { id, role } = input;
  return await prisma.user.update({ where: { id }, data: { role } });
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}

export async function validateUserCredentials(
  email: string,
): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null;
  }

  return user;
}

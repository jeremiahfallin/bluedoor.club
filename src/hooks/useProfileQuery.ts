import { trpc } from '~/utils/trpc';
import { useSession } from 'next-auth/react';

import { Session } from 'next-auth';

interface UserSession extends Session {
  user: {
    name: string;
    id: string;
  };
}

export function useProfileQuery() {
  const sessionData = useSession();
  const session = sessionData.data as UserSession | undefined;
  const meQuery = trpc.user.profile.useQuery(session?.user?.id, {
    retry(failureCount) {
      return failureCount > 3;
    },
  });

  return meQuery;
}

export default useProfileQuery;

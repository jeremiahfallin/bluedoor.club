import { trpc } from '~/utils/trpc';
import Schedule from '~/components/Schedule';

export default function IndexPage() {
  const data = trpc.post.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );
  return <Schedule data={data} />;
}

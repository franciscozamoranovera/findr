import { useInfiniteQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchDrReviews } from '../api/supabase/fetchFunctions';
import { DrReviews } from './DrReviews';

const queryClient = new QueryClient();

const DrReviewsInner = ({ doctorId }) => {
    const postReviewQuery = useInfiniteQuery({
        queryKey: ['reviews', 'infinite', doctorId],
        queryFn: ({ pageParam }) => fetchDrReviews(doctorId, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length : undefined,
        staleTime: 1000 * 60,
    });

    return <DrReviews postReviewQuery={postReviewQuery} />;
};

export const DrReviewsLoader = ({ doctorId }) => (
    <QueryClientProvider client={queryClient}>
        <DrReviewsInner doctorId={doctorId} />
    </QueryClientProvider>
);

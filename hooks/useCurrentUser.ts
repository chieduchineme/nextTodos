import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

/**
 * Custom hook for fetching the current user data.
 *
 * This hook utilizes the `useSWR` hook to fetch and cache data from the `/api/current` endpoint.
 * It returns an object containing the current user data, error information, loading state, and a mutate function.
 *
 * @returns {Object} - The object contains:
 * - `data`: The fetched user data, or `undefined` if not yet loaded.
 * - `error`: Any error encountered during the fetch operation, or `null` if no error occurred.
 * - `isLoading`: A boolean indicating whether the request is currently being processed.
 * - `mutate`: A function to revalidate or update the data manually.
 */
const useCurrentUser = () => {
	const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
	return { data, error, isLoading, mutate };
};

export default useCurrentUser;

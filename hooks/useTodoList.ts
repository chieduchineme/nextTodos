// hooks\useTodoList.ts
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

/**
 * Custom hook to fetch and manage todo list data with optional filtering.
 *
 * @param filterType - Optional filter type to apply (e.g., 'completed', 'pending').
 * @param startDate - Optional start date for filtering todos based on their creation or modification date.
 * @param endDate - Optional end date for filtering todos based on their creation or modification date.
 *
 * @returns An object containing:
 *   - data: The fetched todo list data.
 *   - error: Any error that occurred during the fetch.
 *   - mutate: A function to revalidate and mutate the data.
 */
export default function useTodoList(filterType?: string, startDate?: string, endDate?: string) {
  let url = '/api/todos';

  // Construct the URL with query parameters based on the provided filters
  if (filterType) {
    url += `?filterType=${filterType}`;
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
  }

  // Use SWR to fetch data from the constructed URL
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    mutate,
  };
}

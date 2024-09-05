// utils/filterUtils.ts

/**
 * Generates a filtering clause for time-based queries.
 *
 * @param filter - The type of time filter to apply. Possible values are:
 *                  "24hours", "7days", or "custom".
 * @param customDateRange - An optional object containing a custom date range with `start` and `end` properties.
 *                           Required if `filter` is "custom".
 * @returns An object representing the `where` clause for time-based filtering.
 */
// utils/filterTodos.ts
import { todoType } from '@/interfaces/types/todoTypes';

/**
 * Filters the todos based on search term, filter type, and date range.
 * @param todos Array of todos to be filtered.
 * @param searchTerm The search term for filtering by title.
 * @param filterType The filter type (e.g., last 24 hours, 7 days, custom date range).
 * @param startDate Custom start date for filtering.
 * @param endDate Custom end date for filtering.
 * @returns Filtered array of todos.
 */
export function filterTodos(
    todos: todoType[] = [], 
    searchTerm: string = '', 
    filterType: string = '', 
    startDate?: string, 
    endDate?: string
): todoType[] {
    return todos.filter((todo: todoType) => {
        const matchesSearchTerm = todo.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilterType = () => {
            if (filterType === '24hours') {
                const oneDayAgo = new Date();
                oneDayAgo.setDate(oneDayAgo.getDate() - 1);
                return new Date(todo.createdAt) >= oneDayAgo;
            } else if (filterType === '7days') {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return new Date(todo.createdAt) >= sevenDaysAgo;
            } else if (filterType === 'custom') {
                return new Date(todo.createdAt) >= new Date(startDate!) && new Date(todo.createdAt) <= new Date(endDate!);
            } else {
                return true; // Default case: return all todos.
            }
        };

        return matchesSearchTerm && matchesFilterType();
    });
}

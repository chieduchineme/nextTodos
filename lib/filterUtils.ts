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
export function getTimeFilterClause(filter: string, customDateRange?: { start: string; end: string }) {
  const currentDate = new Date();  // Get the current date and time
  let whereClause = {};  // Initialize the whereClause object

  switch (filter) {
    case "24hours":
      // Filter for items created within the last 24 hours
      whereClause = {
        createdAt: {
          gte: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), // Calculate the date 24 hours ago
        },
      };
      break;

    case "7days":
      // Filter for items created within the last 7 days
      whereClause = {
        createdAt: {
          gte: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000), // Calculate the date 7 days ago
        },
      };
      break;

    case "custom":
      // Filter for items created within a custom date range
      if (customDateRange?.start && customDateRange.end) {
        whereClause = {
          createdAt: {
            gte: new Date(customDateRange.start), // Start date of the custom range
            lte: new Date(customDateRange.end),   // End date of the custom range
          },
        };
      }
      break;

    default:
      // No filter applied, return all items
      whereClause = {};
  }

  return whereClause;  // Return the constructed whereClause object
}

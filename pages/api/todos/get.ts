import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

/**
 * API handler for fetching Todos based on filter type or date range.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    const { todoId, filterType, startDate, endDate } = req.query;

    let todos;

    // If a specific todoId is provided, fetch only that todo
    if (todoId) {
      const todo = await prismadb.todo.findUnique({
        where: { id: String(todoId) },
        include: { user: true },
      });

      // If the todo is not found, return a 404 response
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      return res.status(200).json(todo);
    }


    if (filterType === '24hours') {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 1);
      todos = await prismadb.todo.findMany({
        where: {
          createdAt: {
            gte: fromDate,
          },
        },
        include: { user: true },
      });
    } else if (filterType === '7days') {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 7);
      todos = await prismadb.todo.findMany({
        where: {
          createdAt: {
            gte: fromDate,
          },
        },
        include: { user: true },
      });
    } else if (filterType === 'custom' && startDate && endDate) {
      todos = await prismadb.todo.findMany({
        where: {
          createdAt: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        },
        include: { user: true },
      });
    } else {
      todos = await prismadb.todo.findMany({
        include: { user: true },
      });
    }

    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

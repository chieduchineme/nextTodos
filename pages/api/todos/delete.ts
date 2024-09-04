import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

/**
 * API handler for deleting a specific Todo by ID.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { todoId } = req.query;

  try {
    const { currentUser } = await serverAuth(req, res);

    await prismadb.todo.delete({
      where: { id: String(todoId) },
    });

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

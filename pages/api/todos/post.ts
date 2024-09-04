import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

/**
 * API handler for creating a new Todo with an initial version.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    const newTodo = await prismadb.todo.create({
      data: {
        title: '',
        content: '',
        userId: currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        versions: [
          {
            versionNumber: 1,
            title: '',
            content: '',
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    });
    return res.status(201).json({ todoId: newTodo.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

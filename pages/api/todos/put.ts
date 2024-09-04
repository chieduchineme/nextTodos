import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

/**
 * API handler for updating an existing Todo or creating a new version.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { todoId } = req.query;

  try {
    const { currentUser } = await serverAuth(req, res);
    const { title, content } = req.body;

    const existingTodo = await prismadb.todo.findUnique({
      where: { id: String(todoId) },
    }) ;

    if (!existingTodo) {
      const newTodo = await prismadb.todo.create({
        data: {
          title,
          content,
          userId: currentUser.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          versions: [
            {
              versionNumber: 1,
              title,
              content,
              updatedAt: new Date().toISOString(),
            },
          ],
        },
      });
      return res.status(201).json({ todoId: newTodo.id });
    }

    const newVersionNumber = (Array.isArray(existingTodo.versions) ? existingTodo.versions.length : 0) + 1;

    const newVersion = {
      versionNumber: newVersionNumber,
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    const updatedTodo = await prismadb.todo.update({
      where: { id: String(todoId) },
      data: {
        title,
        content,
        // @ts-ignore
        versions: [...existingTodo.versions, newVersion],
        updatedAt: new Date(),
      },
    });

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

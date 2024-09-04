import { NextApiRequest, NextApiResponse } from 'next';
import getHandler from './get';
import postHandler from './post';
import putHandler from './put';
import deleteHandler from './delete';

/**
 * API router for Todos, delegating requests to specific handlers based on HTTP method.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    case 'POST':
      return postHandler(req, res);
    case 'PUT':
      return putHandler(req, res);
    case 'DELETE':
      return deleteHandler(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}